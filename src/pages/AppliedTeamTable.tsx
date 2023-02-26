import { useGetAdminTeamsQuery } from "@/features/team/api";
import { Team } from "@/features/team/types";
import getArea from "@/utils/getArea";
import getUniversity from "@/utils/getUniversity";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import styled from "styled-components";

interface AppliedTeamTableProps {
  memberCount: 2 | 3;
  gender: "male" | "female";
}

const columns: ColumnsType<Team> = [
  {
    title: `시간`,
    dataIndex: `appliedAt`,
    render: (value) => dayjs(value).format(`YYYY-MM-DD HH:mm`),
    sorter: (a, b) => {
      if (a.appliedAt < b.appliedAt) return -1;
      if (a.appliedAt > b.appliedAt) return 1;
      return 0;
    },
    width: 120,
  },
  {
    title: `매칭 카운트`,
    dataIndex: `matchingCount`,
    sorter: (a, b) => a.matchingCount - b.matchingCount,
    width: 50,
  },
  {
    title: `Team ID`,
    dataIndex: `teamId`,
    sorter: (a, b) => a.teamId - b.teamId,
    width: 60,
  },
  {
    title: `이름`,
    dataIndex: `nickname`,
    width: 70,
  },
  {
    title: `자기소개`,
    dataIndex: `intro`,
    width: 150,
    ellipsis: true,
  },
  {
    title: `인원`,
    dataIndex: `memberCount`,
    width: 50,
  },
  {
    title: `폰번호`,
    dataIndex: `phone`,
    width: 140,
  },
  {
    title: `나이`,
    dataIndex: `averageAge`,
    sorter: (a, b) => a.averageAge - b.averageAge,
    width: 50,
  },
  {
    title: `선호나이`,
    dataIndex: `prefAge`,
    render: (value) => `${value[0]}-${value[1]}`,
    width: 70,
  },
  {
    title: `지역`,
    dataIndex: `areas`,
    render: (value) => value.map((id: number) => getArea(id)?.name).join(`, `),
    width: 70,
  },
  {
    title: `대학교`,
    dataIndex: `universities`,
    render: (value) =>
      value.map((id: number) => getUniversity(id)?.name).join(`, `),
    width: 120,
  },
  {
    title: `동대학선호`,
    dataIndex: `prefSameUniversity`,
    render: (value) => (value ? `Y` : `N`),
    width: 70,
  },
  {
    title: `주량레벨`,
    dataIndex: `drink`,
    width: 70,
  },
];

export default function AppliedTeamTable({
  memberCount,
  gender,
}: AppliedTeamTableProps) {
  const { data } = useGetAdminTeamsQuery({
    membercount: memberCount,
    gender,
    status: `APPLIED`,
  });

  return (
    <Container>
      <Table rowKey="teamId" dataSource={data?.teams} columns={columns} />
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
