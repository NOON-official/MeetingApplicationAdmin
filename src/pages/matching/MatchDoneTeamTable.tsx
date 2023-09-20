import { useGetAdminMatchingsSucceededQuery } from '@/features/team/api';
import { Matching } from '@/features/team/types';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import styled from 'styled-components';

export default function MatchDoneTeamTable() {
  const { data: matchingData } = useGetAdminMatchingsSucceededQuery();

  const matchings = useMemo(() => {
    return matchingData
      ? matchingData.matchings.filter((x) => x.matchedAt)
      : [];
  }, [matchingData]);

  const columns: ColumnsType<Matching> = [
    {
      title: `Matching ID`,
      dataIndex: `matchingId`,
      sorter: (a, b) => a.matchingId - b.matchingId,
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
      defaultSortOrder: `descend`,
      width: 120,
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

  return (
    <Container>
      <Table
        rowKey="matchingId"
        dataSource={matchings}
        columns={columns}
        pagination={{
          position: [`bottomCenter`],
          defaultPageSize: 50,
        }}
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
