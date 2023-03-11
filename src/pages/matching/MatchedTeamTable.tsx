import { useGetAdminTeamsQuery } from "@/features/team/api";
import { Team } from "@/features/team/types";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useMemo } from "react";
import styled from "styled-components";

const columns: ColumnsType<Team> = [
  {
    title: `매칭 시간`,
    dataIndex: `matchedAt`,
    render: (value) => dayjs(value).format(`YYYY-MM-DD HH:mm`),
    sorter: (a, b) => {
      if (a.matchedAt < b.matchedAt) return -1;
      if (a.matchedAt > b.matchedAt) return 1;
      return 0;
    },
    defaultSortOrder: `descend`,
    width: 120,
  },
  {
    title: `Team ID`,
    dataIndex: `teamId`,
    width: 50,
  },
  {
    title: `상대 Team`,
    dataIndex: `partnerTeamId`,
    width: 50,
  },
  {
    title: `이름`,
    dataIndex: `nickname`,
    width: 50,
  },
  {
    title: `폰번호`,
    dataIndex: `phone`,
    width: 50,
  },
];

export default function MatchedTeamTable() {
  const { data: maleTwoTeamData } = useGetAdminTeamsQuery({
    membercount: 2,
    gender: `male`,
    status: `MATCHED`,
  });
  const { data: femaleTwoTeamData } = useGetAdminTeamsQuery({
    membercount: 2,
    gender: `female`,
    status: `MATCHED`,
  });
  const { data: maleThreeTeamData } = useGetAdminTeamsQuery({
    membercount: 3,
    gender: `male`,
    status: `MATCHED`,
  });
  const { data: femaleThreeTeamData } = useGetAdminTeamsQuery({
    membercount: 3,
    gender: `female`,
    status: `MATCHED`,
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
