import {
  useGetAdminMatchingsQuery,
  usePutChatMutation,
  useDeleteMatchingIdMutation,
} from "@/features/team/api";
import { Matching } from "@/features/team/types";
import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
import styled from "styled-components";

export default function MatchDoneTeamTable() {
  const [deleteMatchingId] = useDeleteMatchingIdMutation();
  const [putChat] = usePutChatMutation();
  const { data: matchingData } = useGetAdminMatchingsQuery();

  const matchings = useMemo(() => {
    return matchingData ? matchingData.matchings : [];
  }, [matchingData]);

  const onCreateChat = useCallback(
    async (matching: Matching) => {
      if (
        window.confirm(
          `매칭 ${matching.matchingId}번의 채팅방 생성 여부를 저장하시겠습니까?`
        )
      ) {
        try {
          await putChat({ matchingId: matching.matchingId }).unwrap();
          window.alert(`채팅방 생성 여부가 저장되었습니다`);
        } catch (e) {
          console.error(e);
          window.alert(`저장중 오류가 발생했습니다`);
        }
      }
    },
    [putChat]
  );

  const onDeleteMatching = useCallback(
    async (matching: Matching) => {
      if (
        window.confirm(`정말 ${matching.matchingId}번 매칭을 삭제하시겠습니까?`)
      ) {
        try {
          await deleteMatchingId({ matchingId: matching.matchingId }).unwrap();
          window.alert(`매칭 정보가 삭제되었습니다`);
        } catch (e) {
          console.error(e);
          window.alert(`삭제중 오류가 발생했습니다`);
        }
      }
    },
    [deleteMatchingId]
  );

  const columns: ColumnsType<Matching> = [
    {
      title: `Matching ID`,
      dataIndex: `matchingId`,
      width: 100,
    },
    {
      title: `매칭 시간`,
      dataIndex: `matchedAt`,
      render: (value) => dayjs(value).format(`YYYY-MM-DD HH:mm`),
      sorter: (a, b) => {
        if (a.matchedAt < b.matchedAt) return -1;
        if (a.matchedAt > b.matchedAt) return 1;
        return 0;
      },
      width: 120,
    },
    {
      title: `남자팀 ID`,
      dataIndex: `maleTeamId`,
      width: 100,
    },
    {
      title: `이름`,
      dataIndex: `maleTeamNickname`,
      width: 100,
    },
    {
      title: `전화번호`,
      dataIndex: `maleTeamPhone`,
      width: 100,
    },
    {
      title: `여자팀 ID`,
      dataIndex: `femaleTeamId`,
      width: 100,
    },
    {
      title: `이름`,
      dataIndex: `femaleTeamNickname`,
      width: 100,
    },
    {
      title: `전화번호`,
      dataIndex: `femaleTeamPhone`,
      width: 100,
    },
    {
      title: `액션1`,
      key: `action`,
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Button
            disabled={record?.chatIsCreated}
            onClick={() => onCreateChat(record)}
          >
            채팅방 생성 완료
          </Button>
        </Space>
      ),
    },
    {
      title: `액션2`,
      key: `action`,
      width: 50,
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => onDeleteMatching(record)}>삭제</Button>
        </Space>
      ),
    },
  ];

  return (
    <Container>
      <Table
        rowKey="matchingId"
        dataSource={matchings}
        columns={columns}
        pagination={false}
      />
    </Container>
  );
}

const Container = styled.div`
  .ant-table-thead > tr > th {
    padding: 8px;
  }
  .ant-table-tbody > tr > td {
    padding: 8px;
  }
`;
