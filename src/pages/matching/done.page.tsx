import Section from "@/components/Section";
import {
  useGetAdminMatchingsQuery,
  useDeleteMatchingIdMutation,
} from "@/features/team/api";
import LayoutWithHeader from "@/layouts/LayoutWithHeader";
import { Button } from "antd";
import { useCallback, useMemo, useEffect } from "react";
import styled from "styled-components";
import MatchDoneTeamTable from "./MatchDoneTeamTable";

export default function MatchingDonePage() {
  const { data: matchingData, refetch } = useGetAdminMatchingsQuery();
  const [deleteMatchingId] = useDeleteMatchingIdMutation();

  const handleRefetchMatchingData = () => {
    refetch();
  };

  useEffect(() => {
    handleRefetchMatchingData();
  }, [matchingData]);

  const chatCreatedMatchingIds = useMemo(() => {
    return matchingData
      ? matchingData.matchings
          .filter((matching) => matching.chatIsCreated)
          .map((matching) => matching.matchingId)
      : [];
  }, [matchingData]);

  // 문제: [채팅방 생성 완료] 버튼 누른 후 [삭제 적용] 버튼 클릭 시 삭제할 매칭 ID가 바로 업데이트 되지 않음 (빈 배열로 나옴)
  // 1. 여기까지는 콘솔에 잘 찍힘
  console.log(chatCreatedMatchingIds);

  const onDeleteMatching = useCallback(async () => {
    // 2. 버튼 클릭시 여기서 [] 반환
    console.log(chatCreatedMatchingIds);
    if (
      window.confirm(
        `정말 ${chatCreatedMatchingIds.join(", ")}번 매칭을 삭제하시겠습니까?`
      )
    ) {
      try {
        chatCreatedMatchingIds.forEach((matchingId) => {
          deleteMatchingId({ matchingId }).unwrap();
        });
        window.alert(`매칭 정보가 삭제되었습니다`);
      } catch (e) {
        console.error(e);
        window.alert(`삭제중 오류가 발생했습니다`);
      }
    }
  }, [deleteMatchingId]);

  return (
    <LayoutWithHeader>
      <Section center py="64px">
        <Title>매칭 완료자</Title>
        <TableContainer>
          <MatchDoneTeamTable />
        </TableContainer>
      </Section>
      <Section center py="32px">
        <Button size="large" type="primary" onClick={onDeleteMatching}>
          삭제 적용
        </Button>
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
