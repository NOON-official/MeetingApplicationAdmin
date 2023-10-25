import { useGetAdminMatchingsAppliedQuery } from '@/features/team/api';
import { AppliedAndRecieved } from '@/features/team/types';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import styled from 'styled-components';

const columns: ColumnsType<AppliedAndRecieved> = [
  {
    title: `신청 시간`,
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
    title: `Matching Id`,
    dataIndex: `matchingId`,
    width: 40,
  },
  {
    title: `Team ID`,
    dataIndex: `teamId`,
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
  {
    title: `Team ID`,
    dataIndex: `partnerTeamId`,
    width: 50,
  },
  {
    title: `이름`,
    dataIndex: `partnerTeamOwnernickname`,
    width: 50,
  },
  {
    title: `폰번호`,
    dataIndex: `partnerTeamOwnerphone`,
    width: 50,
  },
];

export default function AppliedAndReceivedTeamTable() {
  const { data } = useGetAdminMatchingsAppliedQuery();

  const teams = useMemo(() => {
    return data ? data.appliedandreceiveds.filter((x) => x.matchingId) : [];
  }, [data]);

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
