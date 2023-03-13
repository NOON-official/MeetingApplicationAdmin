import Section from "@/components/Section";
import {
  useGetAdminTeamCountQuery,
  usePostMatchingsMutation,
  usePostMatchingMutation,
} from "@/features/team/api";
import LayoutWithHeader from "@/layouts/LayoutWithHeader";
import { Button, Col, Row, Input } from "antd";
import { ManOutlined, WomanOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react";
import styled from "styled-components";
import AppliedTeamTable from "./AppliedTeamTable";

const IndexPage = () => {
  const { data: teamData } = useGetAdminTeamCountQuery();
  const [postMatchings] = usePostMatchingsMutation();
  const [postMatching] = usePostMatchingMutation();

  const teamsPerRound = teamData?.teamsPerRound || 0;
  const twoman = teamData?.[`2vs2`].male || 0;
  const twogirl = teamData?.[`2vs2`].female || 0;
  const threeman = teamData?.[`3vs3`].male || 0;
  const threegirl = teamData?.[`3vs3`].female || 0;

  const [selectedMaleTeamId, setSelectedMaleTeamId] = useState<number>();
  const [selectedFemaleTeamId, setSelectedFemaleTeamId] = useState<number>();

  const doMatching = useCallback(async () => {
    if (window.confirm(`정말 매칭을 적용하시겠습니까?`)) {
      try {
        await postMatchings({}).unwrap();
        window.alert(`매칭 완료되었습니다`);
      } catch (e) {
        window.alert(`매칭중 오류가 발생하였습니다`);
      }
    }
  }, [postMatchings]);

  const onChangeSelectedMaleTeamId = useCallback((event: any) => {
    setSelectedMaleTeamId(event.target.value);
  }, []);

  const onChangeSelectedFemaleTeamId = useCallback((event: any) => {
    setSelectedFemaleTeamId(event.target.value);
  }, []);

  const onClickMatchingButton = useCallback(async () => {
    const maleTeamId = Number(selectedMaleTeamId);
    const femaleTeamId = Number(selectedFemaleTeamId);

    if (!maleTeamId || !femaleTeamId) {
      window.alert(`모든 정보를 입력해주세요`);
      return;
    }

    if (
      window.confirm(
        `남자팀 ${maleTeamId}번과 여자팀 ${femaleTeamId}번을 매칭하시겠습니까?`
      )
    ) {
      try {
        await postMatching({
          maleTeamId,
          femaleTeamId,
        }).unwrap();
        window.alert(`매칭이 완료되었습니다`);
      } catch (e: any) {
        if (e.data.message) window.alert(e.data.message);
        else window.alert(`매칭중 오류가 발생하였습니다`);
      }
    }
  }, [postMatching, selectedMaleTeamId, selectedFemaleTeamId]);

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
          </tbody>
        </StatTable>
      </Section>
      <Section>
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
      </Section>
      <Section my="32px">
        <Row gutter={[16, 16]}>
          <Col lg={24}>
            <TableTitle>2:2 남자</TableTitle>
            <AppliedTeamTable memberCount={2} gender="male" />
          </Col>
          <Col lg={24}>
            <TableTitle>2:2 여자</TableTitle>
            <AppliedTeamTable memberCount={2} gender="female" />
          </Col>
        </Row>
      </Section>
      <Section my="32px">
        <Row gutter={[16, 16]}>
          <Col lg={24}>
            <TableTitle>3:3 남자</TableTitle>
            <AppliedTeamTable memberCount={3} gender="male" />
          </Col>
          <Col lg={24}>
            <TableTitle>3:3 여자</TableTitle>
            <AppliedTeamTable memberCount={3} gender="female" />
          </Col>
        </Row>
      </Section>
      <Section center py="32px">
        <Button size="large" type="primary" onClick={doMatching}>
          매칭 적용
        </Button>
      </Section>
      <Section center py="32px">
        <InputContainer>
          <Input
            placeholder="남자팀 ID"
            allowClear
            prefix={<ManOutlined />}
            size="large"
            value={selectedMaleTeamId}
            onChange={onChangeSelectedMaleTeamId}
          />
        </InputContainer>
        <InputContainer>
          <Input
            placeholder="여자팀 ID"
            allowClear
            prefix={<WomanOutlined />}
            size="large"
            value={selectedFemaleTeamId}
            onChange={onChangeSelectedFemaleTeamId}
          />
        </InputContainer>
        <Button size="large" type="primary" onClick={onClickMatchingButton}>
          상호 매칭
        </Button>
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
