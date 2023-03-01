import Section from "@/components/Section";
import { useGetAdminUsersQuery } from "@/features/user/api";
import { User } from "@/features/user/types";
import LayoutWithHeader from "@/layouts/LayoutWithHeader";
import { ColumnsType } from "antd/es/table";
import { Input, Table } from "antd";
import dayjs from "dayjs";
import styled from "styled-components";
import { useCallback, useMemo, useState } from "react";

const columns: ColumnsType<User> = [
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

  return (
    <LayoutWithHeader>
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
            pagination={false}
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

export default UsersPage;
