import { logout } from "@/features/user/asyncActions";
import useAppDispatch from "@/hooks/useAppDispatch";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import styled from "styled-components";
import LogoSVG from "../assets/svgs/Logo.svg";

export default function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isHome = router.pathname === `/`;
  const isMatchingPending = router.pathname === `/matching/pending`;
  const isMatchinDone = router.pathname === `/matching/done`;
  const isUsers = router.pathname === `/users`;

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Container>
      <NavContainer>
        <Logo>
          <Link href="/">
            <LogoSVG />
          </Link>
        </Logo>
        <LoginBox>
          <LoginText onClick={handleLogout}>로그아웃</LoginText>
        </LoginBox>
      </NavContainer>
      <MenuContainer>
        <Menu isActive={isHome}>
          <StyledLink href="/">신청자</StyledLink>
        </Menu>
        <Menu isActive={isMatchingPending}>
          <StyledLink href="/matching/pending">수락/거절 대기자</StyledLink>
        </Menu>
        <Menu isActive={isMatchinDone}>
          <StyledLink href="/matching/done">매칭 완료자</StyledLink>
        </Menu>
        <Menu isActive={isUsers}>
          <StyledLink href="/users">전체 회원</StyledLink>
        </Menu>
      </MenuContainer>
    </Container>
  );
}

const Container = styled.header`
  border-bottom: 1px solid #ffb9b9;
`;

const NavContainer = styled.nav`
  padding: 10px 30px;
  height: 4vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LoginBox = styled.button`
  all: unset;
  padding-right: 5px;
  font-size: 15px;
  :hover {
    cursor: pointer;
  }
`;

const Logo = styled.div`
  padding-left: 5px;
`;

const LoginText = styled.div`
  font-weight: 400;
  font-size: 11px;
  color: #858585;
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid ${(props) => props.theme.lightPink};
  padding: 10px 30px 3px 30px;
`;

const Menu = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  width: 23%;
  height: 30px;
  background-color: ${(props) => `${props.isActive ? `#EB8888` : `#ffffff`}`};
  > a {
    color: ${(props) => `${props.isActive ? `#ffffff` : `#858585`}`};
  }
`;

const StyledLink = styled(Link)`
  font-weight: 400;
  font-size: 13px;
  width: 100%;
  text-decoration: none;
`;
