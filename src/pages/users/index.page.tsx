import Section from '@/components/Section';
import {
  useGetAdminUsersQuery,
  useDeleteAdminTingMutation,
  usePostAdminTingMutation,
} from '@/features/user/api';
import { User } from '@/features/user/types';
import LayoutWithHeader from '@/layouts/LayoutWithHeader';
import { ColumnsType } from 'antd/es/table';
import { Button, Input, Space, Table } from 'antd';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { useCallback, useMemo, useState } from 'react';
import { TagOutlined, UserOutlined } from '@ant-design/icons';

const columns: ColumnsType<User> = [
  {
    title: `User ID`,
    dataIndex: `userId`,
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
    title: `가입날짜`,
    dataIndex: `createdAt`,
    render: (value) => dayjs(value).format(`YYYY-MM-DD HH:mm`),
    sorter: (a, b) => {
      if (a.createdAt < b.createdAt) return -1;
      if (a.createdAt > b.createdAt) return 1;
      return 0;
    },
    defaultSortOrder: `descend`,
    width: 120,
  },
  {
    title: `회원코드`,
    dataIndex: `referralId`,
    width: 100,
  },
  {
    title: `팅 개수`,
    dataIndex: `tingCount`,
    sorter: (a, b) => a.tingCount - b.tingCount,
    width: 100,
  },
  {
    title: `추천 회원`,
    dataIndex: `userInvitationCount`,
    width: 100,
  },
];

const UsersPage = () => {
  const { data } = useGetAdminUsersQuery();
  const [keyword, setKeyword] = useState(``);
  const [tingCount, setTingCount] = useState<number>();
  const [tingUserId, setTingUserId] = useState<number>();

  const [postTing] = usePostAdminTingMutation();
  const [deleteTing] = useDeleteAdminTingMutation();

  const users = useMemo(() => {
    if (!data) {
      return [];
    }
    if (!keyword) {
      return data.users;
    }
    return data.users.filter((user) => {
      const searchStr = user.nickname + user.phone + user.referralId;
      return searchStr.search(keyword) > -1;
    });
  }, [data, keyword]);

  const onSearch = useCallback((value: string) => {
    setKeyword(value);
  }, []);

  const onChangeTingUserId = useCallback((event: any) => {
    setTingUserId(Number(event.target.value));
  }, []);

  const onChangeTingCount = useCallback((event: any) => {
    setTingCount(Number(event.target.value));
  }, []);

  const onClickGiveTingButton = useCallback(async () => {
    if (!tingUserId || !tingCount) {
      window.alert(`모든 정보를 입력해주세요`);
      return;
    }

    const user = users.find((u) => u.userId === tingUserId);
    if (!user) {
      window.alert(`존재하지 않는 유저입니다.`);
      return;
    }

    if (
      window.confirm(
        `${tingUserId}번 ${
          users.find((u) => u.userId === tingUserId)?.nickname
        } 유저에게 ${tingCount} 팅을 지급하시겠어요?`,
      )
    ) {
      try {
        await postTing({
          tingUserId,
          tingCount,
        }).unwrap();
        window.alert(`팅이 지급되었습니다`);
      } catch (e: any) {
        if (e.data.message) window.alert(e.data.message);
        else window.alert(`팅 삭제중 오류가 발생하였습니다`);
      }
    }
  }, [postTing, tingCount, tingUserId, users]);

  const onClickDeleteTingButton = async () => {
    if (!tingUserId || !tingCount) {
      window.alert(`모든 정보를 입력해주세요`);
      return;
    }

    const user = users.find((u) => u.userId === tingUserId);
    if (!user) {
      window.alert(`존재하지 않는 유저입니다.`);
      return;
    }

    if (
      window.confirm(
        `정말 ${tingUserId}번 ${
          users.find((u) => u.userId === tingUserId)?.nickname
        } 유저의 ${tingCount} 팅을 삭제하시겠습니까?`,
      )
    ) {
      try {
        await deleteTing({
          tingUserId,
          tingCount,
        }).unwrap();
        window.alert(`${tingCount} 팅이 삭제되었습니다`);
      } catch (e: any) {
        if (e.data.message) window.alert(e.data.message);
        else window.alert(`팅 삭제중 오류가 발생하였습니다`);
      }
    }
  };

  return (
    <LayoutWithHeader>
      <Section center my="64px" display="flex">
        <TingTitle>팅 지급/삭제</TingTitle>
        <Section center my="32px" display="flex">
          <UserIdInputContainer>
            <Input
              placeholder="유저 ID"
              allowClear
              prefix={<UserOutlined />}
              size="large"
              value={tingUserId}
              onChange={onChangeTingUserId}
            />
          </UserIdInputContainer>
          <TicketCountInputContainer>
            <Input
              placeholder="팅 개수"
              allowClear
              prefix={<TagOutlined />}
              size="large"
              value={tingCount}
              onChange={onChangeTingCount}
            />
          </TicketCountInputContainer>
          <Space>
            <Button size="large" type="primary" onClick={onClickGiveTingButton}>
              팅 지급
            </Button>
            <Button
              size="large"
              type="primary"
              onClick={onClickDeleteTingButton}
            >
              팅 삭제
            </Button>
          </Space>
        </Section>
      </Section>

      <Section center my="64px">
        <TingTitle>전체 회원</TingTitle>
        <InputContainer>
          <Input.Search
            placeholder="검색어 입력 (이름, 전화번호, referral ID)"
            allowClear
            enterButton="검색"
            size="large"
            onSearch={onSearch}
          />
        </InputContainer>
      </Section>
      <Section center my="32px">
        <span style={{ lineHeight: `25px` }}>
          * 가입은 했으나 추가 정보 (대학교) 입력이 완료되지 않으면
          <br /> 팅 개수가 -1로 보입니다. (무료 팅 없음)
        </span>
      </Section>
      <Section center my="32px">
        <TableContainer>
          <Table
            rowKey="userId"
            dataSource={users}
            columns={columns}
            pagination={{
              position: [`bottomCenter`],
              defaultPageSize: 50,
            }}
          />
        </TableContainer>
      </Section>
    </LayoutWithHeader>
  );
};

const TingTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
`;

const TableContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const InputContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const UserIdInputContainer = styled.div`
  display: inline-flex;
  width: 115px;
  margin: 0 auto;
  margin-right: 15px;
`;

const TicketCountInputContainer = styled.div`
  display: inline-flex;
  width: 146px;
  margin: 0 auto;
  margin-right: 15px;
`;

export default UsersPage;
