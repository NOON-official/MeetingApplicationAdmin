import Section from "@/components/Section";
import { useGetAdminTeamCountQuery } from "@/features/team/api";
import BaseLayout from "@/layouts/BaseLayout";
import { Col, Row } from "antd";
import styled from "styled-components";
import AppliedTeamTable from "./AppliedTeamTable";

const IndexPage = () => {
  const { data: teamData } = useGetAdminTeamCountQuery();

  const teamsPerRound = teamData?.teamsPerRound || 0;
  const twoman = teamData?.[`2vs2`].male || 0;
  const twogirl = teamData?.[`2vs2`].female || 0;
  const threeman = teamData?.[`3vs3`].male || 0;
  const threegirl = teamData?.[`3vs3`].female || 0;

  return (
    <BaseLayout>
      <Section center my="32px">
        <h2>관리자 페이지</h2>
        <StatTable>
          <tbody>
            <tr>
              <td>3:3</td>
              <td>남 : {threeman}</td>
              <td>여 : {threegirl}</td>
              <td>전체 : {threeman + threegirl}</td>
            </tr>
            <tr>
              <td>2:2</td>
              <td>남 : {twoman}</td>
              <td>여 : {twogirl}</td>
              <td>전체 : {twoman + twogirl}</td>
            </tr>
          </tbody>
        </StatTable>
      </Section>
      <Section>
        <MatchingBox>
          <SubTitle>2 : 2 미팅</SubTitle>
          <TotalBar>
            <Number>{twoman}</Number>
            <LeftBar>
              <LeftBarProgress progress={twoman / teamsPerRound} />
            </LeftBar>
            <RightBar>
              <RightBarProgress progress={twogirl / teamsPerRound} />
            </RightBar>
            <Number>{twogirl}</Number>
          </TotalBar>
          <SubTitle>3 : 3 미팅</SubTitle>
          <TotalBar>
            <Number>{threeman}</Number>
            <LeftBar>
              <LeftBarProgress progress={threeman / teamsPerRound} />
            </LeftBar>
            <RightBar>
              <RightBarProgress progress={threegirl / teamsPerRound} />
            </RightBar>
            <Number>{threegirl}</Number>
          </TotalBar>
        </MatchingBox>
      </Section>
      <Section>
        <Row gutter={16}>
          <Col lg={24} xl={12}>
            <Title>2:2 남자</Title>
            <AppliedTeamTable memberCount={2} gender="male" />
          </Col>
          <Col lg={24} xl={12}>
            <Title>2:2 여자</Title>
            <AppliedTeamTable memberCount={2} gender="female" />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={24} xl={12}>
            <Title>3:3 남자</Title>
            <AppliedTeamTable memberCount={3} gender="male" />
          </Col>
          <Col lg={24} xl={12}>
            <Title>3:3 여자</Title>
            <AppliedTeamTable memberCount={3} gender="female" />
          </Col>
        </Row>
      </Section>
    </BaseLayout>
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

const Number = styled.p`
  width: 10px;
  padding: 0 10px;
  font-weight: 400;
  font-size: 15px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`;

export default IndexPage;
