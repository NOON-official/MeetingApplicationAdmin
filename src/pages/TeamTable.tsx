import {
  useDeleteTeamIdMutation,
  useGetAdminTeamsQuery,
} from '@/features/team/api';
import { Team } from '@/features/team/types';
import getArea from '@/utils/getArea';
import getUniversity from '@/utils/getUniversity';
import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import styled from 'styled-components';

interface AppliedTeamTableProps {
  gender: 'male' | 'female';
}

export default function TeamTable({ gender }: AppliedTeamTableProps) {
  const [deleteTeamId] = useDeleteTeamIdMutation();
  const { data } = useGetAdminTeamsQuery({
    gender,
  });

  const onDeleteTeam = useCallback(
    async (team: Team) => {
      if (window.confirm(`정말 ${team.teamId}팀을 삭제하시겠습니까?`)) {
        try {
          await deleteTeamId({ teamId: team.teamId }).unwrap();
          window.alert(`팀 신청정보가 삭제되었습니다`);
        } catch (e) {
          window.alert(`삭제중 오류가 발생했습니다`);
        }
      }
    },
    [deleteTeamId],
  );

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
      defaultSortOrder: `descend`,
      width: 120,
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
      title: `우리팀 이름`,
      dataIndex: `teamName`,
      width: 70,
    },
    {
      title: `자기소개`,
      dataIndex: `intro`,
      width: 250,
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
      dataIndex: `age`,
      sorter: (a, b) => a.age - b.age,
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
      render: (value) =>
        value.map((id: number) => getArea(id)?.name).join(`, `),
      width: 70,
    },
    {
      title: `대학교`,
      dataIndex: `universities`,
      render: (value) =>
        value.map((id: number) => getUniversity(id)?.name).join(`,\n`),
      width: 150,
    },
    {
      title: `카톡 아이디`,
      dataIndex: `kakaoId`,
      width: 70,
    },
    {
      title: `주량레벨`,
      dataIndex: `drink`,
      width: 70,
    },
    {
      title: `추가 허용`,
      dataIndex: `memberCounts`,
      render: (value) => value.join(`, `),
      width: 70,
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
        dataSource={data?.teams}
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
    white-space: pre-line;
  }
`;
