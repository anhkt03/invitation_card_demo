'use client';

import React, { useState } from 'react';
import {
  Button,
  Card,
  Form,
  InputGroup,
  Label,
  Link,
  Spinner,
  TextField,
} from '@heroui/react';
import { ArrowRightIcon, LockIcon, UserIcon } from 'lucide-react';
import { useAuth } from './hooks/useAuth';

export function Login() {
  const { login, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fbfaff]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[10%] -left-[10%] size-[40%] rounded-full bg-fuchsia-300/50 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] -bottom-[10%] size-[40%] rounded-full bg-indigo-300/50 blur-[120px]"
      />

      <Card className="relative z-10 m-4 w-full max-w-md">
        <Card.Header className="text-center">
          <span className="bg-brand-gradient mx-auto mb-2 grid size-12 place-items-center rounded-2xl text-xl text-white shadow-lg shadow-fuchsia-500/30">💌</span>
          <Card.Title>Chào mừng trở lại</Card.Title>
          <Card.Description>Đăng nhập để vào trang quản trị thiệp mời</Card.Description>
        </Card.Header>

        <Form onSubmit={handleSubmit}>
          <Card.Content className="flex flex-col gap-5">
            <TextField
              name="username"
              value={username}
              onChange={setUsername}
              isRequired
              isDisabled={isLoading}
            >
              <Label>Tên đăng nhập</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <UserIcon />
                </InputGroup.Prefix>
                <InputGroup.Input placeholder="ten.dang.nhap" autoComplete="username" />
              </InputGroup>
            </TextField>

            <TextField
              name="password"
              type="password"
              value={password}
              onChange={setPassword}
              isRequired
              isDisabled={isLoading}
            >
              <Label>Mật khẩu</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <LockIcon />
                </InputGroup.Prefix>
                <InputGroup.Input placeholder="••••••••" autoComplete="current-password" />
              </InputGroup>
            </TextField>
          </Card.Content>

          <Card.Footer className="flex flex-col gap-4">
            <Button type="submit" size="lg" fullWidth isDisabled={isLoading} className="bg-brand-gradient text-white">
              {isLoading ? (
                <>
                  <Spinner />
                  Đang đăng nhập...
                </>
              ) : (
                <>
                  Đăng nhập
                  <ArrowRightIcon />
                </>
              )}
            </Button>

            <Link href="#" className="text-sm">
              Quên mật khẩu?
            </Link>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
}
