import Section from '@/components/Section';
import LayoutWithHeader from '@/layouts/LayoutWithHeader';
import styled from 'styled-components';
import MatchDoneTeamTable from './MatchDoneTeamTable';

export default function MatchingDonePage() {
  return (
    <LayoutWithHeader>
      <Section center py="64px">
        <Title>매칭 완료팀</Title>
        <TableContainer>
          <MatchDoneTeamTable />
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
