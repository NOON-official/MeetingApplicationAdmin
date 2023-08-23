import Section from '@/components/Section';
import {
  useGetAdminUsersQuery,
  usePostCouponMutation,
  useDeleteTicketMutation,
} from '@/features/user/api';
import { User } from '@/features/user/types';
import LayoutWithHeader from '@/layouts/LayoutWithHeader';
import { ColumnsType } from 'antd/es/table';
import { Input, Table, Button, Dropdown, Space, DatePicker } from 'antd';
import type { MenuProps, DatePickerProps } from 'antd';
import { DownOutlined, UserOutlined, TagOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { useCallback, useMemo, useState } from 'react';
import { CouponTypes } from '../../config/constants';
import getCouponType from '../../utils/getCouponType';

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
    title: `상태`,
    dataIndex: `matchingStatus`,
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
    title: `이용권 개수`,
    dataIndex: `ticketCount`,
    width: 100,
  },
  {
    title: `50% 쿠폰`,
    dataIndex: `discount50CouponCount`,
    width: 100,
  },
  {
    title: `무료 쿠폰`,
    dataIndex: `freeCouponCount`,
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
  const [issueCouponUserId, setIssueCouponUserId] = useState<number>();
  const [issueCouponTypeId, setIssueCouponTypeId] = useState<number>(1);
  const [issueCouponExpireDate, setIssueCouponExpireDate] = useState(
    dayjs().add(2, `month`) || null,
  );
  const [deleteTicketUserId, setDeleteTicketUserId] = useState<number>();
  const [deleteTicketCount, setDeleteTicketCount] = useState<number>();
  const [postCoupon] = usePostCouponMutation();
  const [deleteTicket] = useDeleteTicketMutation();

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

  const onChangeUserId = useCallback((event: any) => {
    setIssueCouponUserId(event.target.value);
  }, []);

  const onClickCouponTypeMenu: MenuProps['onClick'] = (event) => {
    setIssueCouponTypeId(Number(event.key));
  };

  const items: MenuProps['items'] = CouponTypes.map((c) => {
    return { label: c.name, key: c.id };
  });

  const menuProps = {
    items,
    onClick: onClickCouponTypeMenu,
  };

  const onChangeDate: DatePickerProps['onChange'] = (date) => {
    if (date) setIssueCouponExpireDate(date);
  };

  const onClickIssueCouponButton = useCallback(async () => {
    const userId = Number(issueCouponUserId);
    const couponTypeId = issueCouponTypeId;
    const expiresAt = issueCouponExpireDate?.format(`YYYY-MM-DD`);

    if (!userId || !couponTypeId || !expiresAt) {
      window.alert(`모든 정보를 입력해주세요`);
      return;
    }

    const user = users.find((u) => u.userId === userId);
    if (!user) {
      window.alert(`존재하지 않는 유저입니다.`);
      return;
    }

    if (
      window.confirm(
        `${userId}번 ${
          users.find((u) => u.userId === userId)?.nickname
        } 유저에게 [${
          CouponTypes.find((c) => c.id === couponTypeId)?.name
        }]을 발급하시겠습니까? (만료 일자: ${expiresAt})`,
      )
    ) {
      try {
        await postCoupon({
          userId,
          couponTypeId,
          expiresAt,
        }).unwrap();
        window.alert(`쿠폰이 발급되었습니다`);
      } catch (e) {
        window.alert(`쿠폰 발급중 오류가 발생하였습니다`);
      }
    }
  }, [
    postCoupon,
    issueCouponUserId,
    issueCouponTypeId,
    issueCouponExpireDate,
    users,
  ]);

  const onChangeDeleteTicketUserId = useCallback((event: any) => {
    setDeleteTicketUserId(event.target.value);
  }, []);

  const onChangeDeleteTicketCount = useCallback((event: any) => {
    setDeleteTicketCount(event.target.value);
  }, []);

  const onClickDeleteTicketButton = useCallback(async () => {
    const userId = Number(deleteTicketUserId);
    const ticketCount = Number(deleteTicketCount);

    if (!userId || !ticketCount) {
      window.alert(`모든 정보를 입력해주세요`);
      return;
    }

    const user = users.find((u) => u.userId === userId);
    if (!user) {
      window.alert(`존재하지 않는 유저입니다.`);
      return;
    }

    if (
      window.confirm(
        `정말 ${userId}번 ${
          users.find((u) => u.userId === userId)?.nickname
        } 유저의 이용권 ${ticketCount}장을 삭제하시겠습니까?`,
      )
    ) {
      try {
        await deleteTicket({
          userId,
          ticketCount,
        }).unwrap();
        window.alert(`이용권 ${ticketCount}장이 삭제되었습니다`);
      } catch (e: any) {
        if (e.data.message) window.alert(e.data.message);
        else window.alert(`이용권 삭제중 오류가 발생하였습니다`);
      }
    }
  }, [deleteTicket, deleteTicketUserId, deleteTicketCount, users]);

  return (
    <LayoutWithHeader>
      <Section center my="32px" display="flex">
        <UserIdInputContainer>
          <Input
            placeholder="유저 ID"
            allowClear
            prefix={<UserOutlined />}
            size="large"
            value={deleteTicketUserId}
            onChange={onChangeDeleteTicketUserId}
          />
        </UserIdInputContainer>
        <TicketCountInputContainer>
          <Input
            placeholder="이용권 개수"
            allowClear
            prefix={<TagOutlined />}
            size="large"
            value={deleteTicketCount}
            onChange={onChangeDeleteTicketCount}
          />
        </TicketCountInputContainer>
        <Button size="large" type="primary" onClick={onClickDeleteTicketButton}>
          이용권 삭제
        </Button>
      </Section>
      <Section center my="32px" display="flex">
        <UserIdInputContainer>
          <Input
            placeholder="유저 ID"
            allowClear
            prefix={<UserOutlined />}
            size="large"
            value={issueCouponUserId}
            onChange={onChangeUserId}
          />
        </UserIdInputContainer>
        <IssueCouponDropdownContainer>
          <Dropdown menu={menuProps}>
            <Button size="large">
              <Space>
                {issueCouponTypeId
                  ? getCouponType(issueCouponTypeId)?.name
                  : `쿠폰 선택`}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </IssueCouponDropdownContainer>
        <IssueCouponDateContainer>
          <DatePicker
            size="large"
            placeholder="만료 일자"
            disabledDate={(current) => {
              return current && dayjs(current).isBefore(dayjs());
            }}
            value={issueCouponExpireDate}
            onChange={onChangeDate}
          />
        </IssueCouponDateContainer>
        <Button size="large" type="primary" onClick={onClickIssueCouponButton}>
          쿠폰 발급
        </Button>
      </Section>
      <Section center my="32px">
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

const IssueCouponDropdownContainer = styled.div`
  display: inline-flex;
  margin-right: 15px;
`;

const IssueCouponDateContainer = styled.div`
  display: inline-flex;
  width: 130px;
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
