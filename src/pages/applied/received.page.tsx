import Section from '@/components/Section';
import LayoutWithHeader from '@/layouts/LayoutWithHeader';
import styled from 'styled-components';
import AppliedAndReceivedTeamTable from './AppliedAndReceivedTeamTable';

export default function MatchingPendingPage() {
  return (
    <LayoutWithHeader>
      <Section center py="64px">
        <Title>신청한/신청받은 팀</Title>
        <TableContainer>
          <AppliedAndReceivedTeamTable />
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
