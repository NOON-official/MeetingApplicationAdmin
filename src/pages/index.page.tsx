import Section from '@/components/Section';
import { useGetAdminTeamCountQuery } from '@/features/team/api';
import LayoutWithHeader from '@/layouts/LayoutWithHeader';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import TeamTable from './TeamTable';

const IndexPage = () => {
  const { data: teamData } = useGetAdminTeamCountQuery();

  const twoman = teamData?.[`2vs2`]?.male || 0;
  const twogirl = teamData?.[`2vs2`]?.female || 0;
  const threeman = teamData?.[`3vs3`]?.male || 0;
  const threegirl = teamData?.[`3vs3`]?.female || 0;
  const fourman = teamData?.[`4vs4`]?.male || 0;
  const fourgirl = teamData?.[`4vs4`]?.female || 0;

  return (
    <LayoutWithHeader>
      <Section center my="32px">
        <h2>관리자 페이지</h2>
        <StatTable>
          <tbody>
            <tr>
              <td />
              <td>남</td>
              <td>여</td>
              <td>전체</td>
            </tr>
            <tr>
              <td>2:2</td>
              <td>{twoman}</td>
              <td>{twogirl}</td>
              <td>{twoman + twogirl}</td>
            </tr>
            <tr>
              <td>3:3</td>
              <td>{threeman}</td>
              <td>{threegirl}</td>
              <td>{threeman + threegirl}</td>
            </tr>
            <tr>
              <td>4:4</td>
              <td>{fourman}</td>
              <td>{fourgirl}</td>
              <td>{fourman + fourgirl}</td>
            </tr>
            <tr style={{ color: `#eb8888` }}>
              <td>합계</td>
              <td>{twoman + threeman + fourman}</td>
              <td>{twogirl + threegirl + fourgirl}</td>
              <td />
            </tr>
          </tbody>
        </StatTable>
      </Section>
      {/* <Section>
        <MatchingBox>
          <SubTitle>2 : 2 미팅</SubTitle>
          <TotalBar>
            <NumberText>{twoman}</NumberText>
            <LeftBar>
              <LeftBarProgress progress={twoman / teamsPerRound} />
            </LeftBar>
            <RightBar>
              <RightBarProgress progress={twogirl / teamsPerRound} />
            </RightBar>
            <NumberText>{twogirl}</NumberText>
          </TotalBar>
          <SubTitle>3 : 3 미팅</SubTitle>
          <TotalBar>
            <NumberText>{threeman}</NumberText>
            <LeftBar>
              <LeftBarProgress progress={threeman / teamsPerRound} />
            </LeftBar>
            <RightBar>
              <RightBarProgress progress={threegirl / teamsPerRound} />
            </RightBar>
            <NumberText>{threegirl}</NumberText>
          </TotalBar>
        </MatchingBox>
      </Section> */}
      <Section my="32px">
        <Row gutter={[16, 16]}>
          <Col lg={24}>
            <TableTitle>남자 팀</TableTitle>
            <TeamTable gender="male" />
          </Col>
          <Col lg={24}>
            <TableTitle>여자 팀</TableTitle>
            <TeamTable gender="female" />
          </Col>
        </Row>
      </Section>
    </LayoutWithHeader>
  );
};

const StatTable = styled.table`
  display: inline-block;

  td {
    width: 140px;
    height: 40px;
    border: 1px solid #000000;
    font-weight: bold;
  }
`;

const MatchingBox = styled.div`
  margin-top: 20px;
  font-weight: 400;
  font-size: 20px;
  padding: 10px;
  height: 150px;
  background: #ffffff;
  border-radius: 10px;
  text-align: center;
`;

const SubTitle = styled.p`
  width: 100%;
  font-weight: 400;
  font-size: 18px;
  color: black;
  margin-top: 5px;
`;

const TotalBar = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const LeftBar = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  width: 110px;
  height: 18px;
  background: white;
  border: 1px solid #f1ecec;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const RightBar = styled.div`
  position: relative;
  width: 110px;
  height: 18px;
  background: white;
  border: 1px solid #f1ecec;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const LeftBarProgress = styled.div<{ progress: number }>`
  position: absolute;
  max-width: 110px;
  width: ${({ progress }) => (progress ? progress * 110 : 0)}px;
  height: 18px;
  background: #bfe0ff;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const RightBarProgress = styled.div<{ progress: number }>`
  position: absolute;
  max-width: 110px;
  width: ${({ progress }) => (progress ? progress * 110 : 0)}px;
  height: 18px;
  background: #ffbfbf;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const NumberText = styled.p`
  padding: 0 10px;
  font-weight: 400;
  font-size: 15px;
`;

const TableTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
`;

const InputContainer = styled.div`
  display: inline-flex;
  width: 130px;
  margin: 0 auto;
  margin-right: 15px;
`;

export default IndexPage;
