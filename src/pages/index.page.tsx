import Section from '@/components/Section';
import { useGetAdminTeamCountQuery } from '@/features/team/api';
import LayoutWithHeader from '@/layouts/LayoutWithHeader';
import { Button, Col, Row, Input } from 'antd';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import TeamTable from './TeamTable';

const IndexPage = () => {
  const { data: teamData } = useGetAdminTeamCountQuery();

  const twoman = teamData?.[`2vs2`].male || 0;
  const twogirl = teamData?.[`2vs2`].female || 0;
  const threeman = teamData?.[`3vs3`].male || 0;
  const threegirl = teamData?.[`3vs3`].female || 0;
  const fourman = teamData?.[`4vs4`].male || 0;
  const fourgirl = teamData?.[`4vs4`].female || 0;

  return (
    <LayoutWithHeader>
      <Section center my="32px">
        <h2>관리자 페이지</h2>
        <StatTable>
          <tbody>
            <tr>
              <td>2:2</td>
              <td>남 : {twoman}</td>
              <td>여 : {twogirl}</td>
              <td>전체 : {twoman + twogirl}</td>
            </tr>
            <tr>
              <td>3:3</td>
              <td>남 : {threeman}</td>
              <td>여 : {threegirl}</td>
              <td>전체 : {threeman + threegirl}</td>
            </tr>
            <tr>
              <td>4:4</td>
              <td>남 : {fourman}</td>
              <td>여 : {fourgirl}</td>
              <td>전체 : {fourman + fourgirl}</td>
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
