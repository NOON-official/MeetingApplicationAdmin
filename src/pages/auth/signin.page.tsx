import { API_URL } from "@/config/constants";
import BaseLayout from "@/layouts/BaseLayout";
import { Button } from "antd";
import { useCallback } from "react";
import styled from "styled-components";

export default function AuthSigninPage() {
  const handleLogin = useCallback(() => {
    window.open(
      `${API_URL}/auth/signin/kakao?redirectUrl=${encodeURIComponent(
        `${window.location.origin}/auth/callback`
      )}`,
      `_self`
    );
  }, []);

  return (
    <BaseLayout>
      <Container>
        <Button size="large" type="primary" onClick={handleLogin}>
          카카오톡 로그인
        </Button>
      </Container>
    </BaseLayout>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
