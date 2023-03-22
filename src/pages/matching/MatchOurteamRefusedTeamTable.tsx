import {
  useDeleteOurteamRefusedTeamIdMutation,
  useGetAdminOurteamRefusedTeamsQuery,
} from "@/features/team/api";
import { OurteamRefusedTeam } from "@/features/team/types";
import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
import styled from "styled-components";

export default function MatchOurteamRefusedTeamTable() {
  const [deleteOurteamRefusedTeamId] = useDeleteOurteamRefusedTeamIdMutation();
  const { data: ourteamRefusedTeamData } =
    useGetAdminOurteamRefusedTeamsQuery();

  const teams = useMemo(() => {
    return [...(ourteamRefusedTeamData ? ourteamRefusedTeamData.teams : [])];
  }, [ourteamRefusedTeamData]);

  const onDeleteTeam = useCallback(
    async (team: OurteamRefusedTeam) => {
      if (
        window.confirm(
          `정말 ${team.teamId}팀의 매칭 거절 이유를 삭제하시겠습니까?`
        )
      ) {
        try {
          await deleteOurteamRefusedTeamId({ teamId: team.teamId }).unwrap();
          window.alert(`매칭 거절 이유가 삭제되었습니다`);
        } catch (e) {
          window.alert(`삭제중 오류가 발생했습니다`);
        }
      }
    },
    [deleteOurteamRefusedTeamId]
  );

  const columns: ColumnsType<OurteamRefusedTeam> = [
    {
      title: `매칭 거절 시간`,
      dataIndex: `refusedAt`,
      render: (value) => dayjs(value).format(`YYYY-MM-DD HH:mm`),
      sorter: (a, b) => {
        if (a.refusedAt < b.refusedAt) return -1;
        if (a.refusedAt > b.refusedAt) return 1;
        return 0;
      },
      defaultSortOrder: `descend`,
      width: 120,
    },
    {
      title: `매칭 거절 이유`,
      dataIndex: `matchingRefuseReason`,
      width: 250,
    },
    {
      title: `Team ID`,
      dataIndex: `teamId`,
      width: 60,
    },
    {
      title: `성별`,
      dataIndex: `gender`,
      width: 40,
    },
    {
      title: `이름`,
      dataIndex: `nickname`,
      width: 100,
    },
    {
      title: `전화번호`,
      dataIndex: `phone`,
      width: 100,
    },
    {
      title: `액션`,
      key: `action`,
      width: 50,
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => onDeleteTeam(record)}>삭제</Button>
        </Space>
      ),
    },
  ];

  return (
    <Container>
      <Table
        rowKey="teamId"
        dataSource={teams}
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
