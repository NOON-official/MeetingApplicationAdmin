import Section from "@/components/Section";
import LayoutWithHeader from "@/layouts/LayoutWithHeader";
import styled from "styled-components";
import MatchedTeamTable from "./MatchedTeamTable";
import MatchFailedTeamTable from "./MatchFailedTeamTable";
import MatchRefusedTeamTable from "./MatchRefusedTeamTable";

export default function MatchingPendingPage() {
  return (
    <LayoutWithHeader>
      <Section center py="64px">
        <Title>수락/거절 대기자</Title>
        <TableContainer>
          <MatchedTeamTable />
        </TableContainer>
      </Section>
      <Section center py="64px">
        <Title>매칭 실패 회원</Title>
        <TableContainer>
          <MatchFailedTeamTable />
        </TableContainer>
      </Section>
      <Section center py="64px">
        <Title>거절 당한 회원</Title>
        <TableContainer>
          <MatchRefusedTeamTable />
        </TableContainer>
      </Section>
    </LayoutWithHeader>
  );
}

const Title = styled.h2`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
`;

const TableContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
