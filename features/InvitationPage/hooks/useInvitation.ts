"use client";

import { useState, useEffect } from 'react';
import { invitationService } from '../services/invitation.service';
import { InvitationData } from '../types/invitation.type';

export const useInvitation = (slug: string) => {
    const [data, setData] = useState<InvitationData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;
            
            try {
                setLoading(true);
                setError(null);
                const result = await invitationService.getEventBySlug(slug);
                setData(result);
            } catch (err: unknown) {
                setError(err instanceof Error ? err : new Error('Failed to load invitation'));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    return { data, loading, error };
};
