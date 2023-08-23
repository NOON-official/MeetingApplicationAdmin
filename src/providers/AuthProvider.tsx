import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import useAppSelector from '@/hooks/useAppSelector';
import dynamic from 'next/dynamic';

type Props = {
  children?: ReactNode;
};

const authRoutes = [`/auth/signin`, `/auth/callback`];

function StaticAuthProvider({ children }: Props) {
  const { push, pathname } = useRouter();
  const { accessToken } = useAppSelector((state) => state.user);

  useEffect(() => {
    // 로그인되어있지 않으면 리다이렉트
    if (!accessToken && !authRoutes.includes(pathname)) {
      push(`/auth/signin`);
    }
  }, [accessToken, pathname, push]);

  if (!accessToken && !authRoutes.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
}

const AuthProvider = dynamic(() => Promise.resolve(StaticAuthProvider), {
  ssr: false,
});

export default AuthProvider;
