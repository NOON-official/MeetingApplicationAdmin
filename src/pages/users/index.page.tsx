import Section from "@/components/Section";
import {
  useGetAdminUsersQuery,
  usePostCouponMutation,
} from "@/features/user/api";
import { User } from "@/features/user/types";
import LayoutWithHeader from "@/layouts/LayoutWithHeader";
import { ColumnsType } from "antd/es/table";
import { Input, Table, Button, Dropdown, Space, DatePicker } from "antd";
import type { MenuProps, DatePickerProps } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import styled from "styled-components";
import { useCallback, useMemo, useState } from "react";
import { CouponTypes } from "../../config/constants";
import getCouponType from "../../utils/getCouponType";

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
    dayjs().add(2, `month`) || null
  );
  const [postCoupon] = usePostCouponMutation();

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

  const onClickCouponTypeMenu: MenuProps["onClick"] = (event) => {
    setIssueCouponTypeId(Number(event.key));
  };

  const items: MenuProps["items"] = CouponTypes.map((c) => {
    return { label: c.name, key: c.id };
  });

  const menuProps = {
    items,
    onClick: onClickCouponTypeMenu,
  };

  const onChangeDate: DatePickerProps["onChange"] = (date) => {
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
        }]을 발급하시겠습니까? (만료 일자: ${expiresAt})`
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
        console.error(e);
      }
    }
  }, [
    postCoupon,
    issueCouponUserId,
    issueCouponTypeId,
    issueCouponExpireDate,
    users,
  ]);

  return (
    <LayoutWithHeader>
      <Section center my="32px" display="flex">
        <IssueCouponInputContainer>
          <Input
            placeholder="유저 ID"
            allowClear
            prefix={<UserOutlined />}
            size="large"
            value={issueCouponUserId}
            onChange={onChangeUserId}
          />
        </IssueCouponInputContainer>
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
              defaultPageSize: 10,
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

const IssueCouponInputContainer = styled.div`
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

export default UsersPage;
