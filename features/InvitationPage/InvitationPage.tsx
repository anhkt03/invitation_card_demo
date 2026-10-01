import { getTemplate } from '@/components/templates';
import { invitationService } from './services/invitation.service';

export default async function InvitationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const eventData = await invitationService.getEventBySlug(slug);
  const entry = getTemplate(eventData.templateCode);
  return (
    <main className="min-h-screen w-full">
      {entry ? (
        <entry.Component data={eventData.data} style={eventData.style} />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
            <h1>Template not found!</h1>
        </div>
      )}
    </main>
  );
}
