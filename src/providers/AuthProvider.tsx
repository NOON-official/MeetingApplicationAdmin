import { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import useAppSelector from "@/hooks/useAppSelector";

type Props = {
  children?: ReactNode;
};

const authRoutes = [`/auth/signin`, `/auth/callback`];

export default function AuthProvider({ children }: Props) {
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
