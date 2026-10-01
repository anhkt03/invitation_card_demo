'use client';

import { Suspense } from 'react';
import { Login } from '@/features/Auth/Login';

export default function LoginPage() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}
