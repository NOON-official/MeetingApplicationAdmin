import {
  useDeleteTeamIdMutation,
  useGetAdminTeamsQuery,
} from "@/features/team/api";
import { Team } from "@/features/team/types";
import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
import styled from "styled-components";

export default function MatchRefusedTeamTable() {
  const [deleteTeamId] = useDeleteTeamIdMutation();
  const { data: maleTwoTeamData } = useGetAdminTeamsQuery({
    membercount: 2,
    gender: `male`,
    status: `PARTNER_TEAM_REFUSED`,
  });
  const { data: femaleTwoTeamData } = useGetAdminTeamsQuery({
    membercount: 2,
    gender: `female`,
    status: `PARTNER_TEAM_REFUSED`,
  });
  const { data: maleThreeTeamData } = useGetAdminTeamsQuery({
    membercount: 3,
    gender: `male`,
    status: `PARTNER_TEAM_REFUSED`,
  });
  const { data: femaleThreeTeamData } = useGetAdminTeamsQuery({
    membercount: 3,
    gender: `female`,
    status: `PARTNER_TEAM_REFUSED`,
  });

  const teams = useMemo(() => {
    return [
      ...(maleTwoTeamData ? maleTwoTeamData.teams : []),
      ...(femaleTwoTeamData ? femaleTwoTeamData.teams : []),
      ...(maleThreeTeamData ? maleThreeTeamData.teams : []),
      ...(femaleThreeTeamData ? femaleThreeTeamData.teams : []),
    ];
  }, [
    femaleThreeTeamData,
    femaleTwoTeamData,
    maleThreeTeamData,
    maleTwoTeamData,
  ]);

  const onDeleteTeam = useCallback(
    async (team: Team) => {
      if (window.confirm(`정말 ${team.teamId}팀을 삭제하시겠습니까?`)) {
        try {
          await deleteTeamId({ teamId: team.teamId }).unwrap();
          window.alert(`팀 신청정보가 삭제되었습니다`);
        } catch (e) {
          console.error(e);
          window.alert(`삭제중 오류가 발생했습니다`);
        }
      }
    },
    [deleteTeamId]
  );

  const columns: ColumnsType<Team> = [
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
      title: `Team ID`,
      dataIndex: `teamId`,
      width: 100,
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
      width: 100,
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
