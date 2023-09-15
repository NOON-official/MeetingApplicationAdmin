import Section from '@/components/Section';
import {
  useGetAdminUserStudentCardQuery,
  usePutAdminUsersUserIdStudentCardVerifyMutation,
  usePutAdminUsersUserIdStudentCardDeclineMutation,
  useGetAdminUsersQuery,
} from '@/features/user/api';
import LayoutWithHeader from '@/layouts/LayoutWithHeader';
import { Button, Input, Table } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ColumnsType } from 'antd/es/table';
import { User } from '@/features/user/types';
import Universities from './University';

const columns: ColumnsType<User> = [
  {
    title: `User Id`,
    dataIndex: `userId`,
    width: 40,
  },
  {
    title: `이름`,
    dataIndex: `nickname`,
    width: 40,
  },
  {
    title: `대학교`,
    dataIndex: `university`,
    render: (value) => {
      return Universities[Number(value) - 1]?.name;
    },
    width: 50,
  },
  {
    title: `신청 여부`,
    dataIndex: `isVerified`,
    render: (value) => {
      if (value === true) {
        return `O`;
      }
      return `X`;
    },

    width: 30,
  },
  {
    title: `승인 여부`,
    dataIndex: `approval`,
    render: (value) => {
      if (value === true) {
        return `O`;
      }
      if (value === false) {
        return `X`;
      }
      return ``;
    },
    width: 30,
  },
];

const StudentcardPage = () => {
  // 학생증 인증 승인/거절
  const { data: applyStudentCard } = useGetAdminUserStudentCardQuery();
  const [verifyUser] = usePutAdminUsersUserIdStudentCardVerifyMutation();
  const [declineUser] = usePutAdminUsersUserIdStudentCardDeclineMutation();

  const onVerifyUser = useCallback(
    async (userId: number) => {
      try {
        await verifyUser({ userId }).unwrap();
        window.alert(`학생증 인증이 완료되었습니다`);
      } catch (e) {
        window.alert(`학생증 인증 중 오류가 발생했습니다`);
      }
    },
    [verifyUser],
  );
  const onDeclineUser = useCallback(
    async (userId: number) => {
      try {
        await declineUser({ userId }).unwrap();
        window.alert(`학생증 인증이 거절되었습니다`);
      } catch (e) {
        window.alert(`거절중 오류가 발생했습니다`);
      }
    },
    [declineUser],
  );

  // 전체 회원 학생증 인증 여부 목록
  const { data } = useGetAdminUsersQuery();
  console.log(data);
  const [keyword, setKeyword] = useState(``);
  const onSearch = useCallback((value: string) => {
    setKeyword(value);
  }, []);

  const users = useMemo(() => {
    if (!data) {
      return [];
    }
    if (!keyword) {
      return data.users;
    }
    return data.users.filter((user) => {
      const searchStr = user.nickname;
      return searchStr.search(keyword) > -1;
    });
  }, [data, keyword]);

  return (
    <LayoutWithHeader>
      <Title>학생증 인증</Title>
      {applyStudentCard?.users.map((user) => {
        return (
          <Section center my="32px" display="flex" key={user.userId}>
            <ImgContainer>
              <Img src={user.studentCardUrl} alt="studentcardimg" />

              <DetailContainer>
                <Info>{`이름 : ${user.nickname}`}</Info>
                <Info>{`성별 : ${
                  user.gender === `female` ? `여자` : `남자`
                }`}</Info>
                <Info>{`학교 : ${
                  Universities[Number(user.university) - 1]?.name
                }`}</Info>
                <Info>{`나이 : ${user.birth}`}</Info>
              </DetailContainer>
            </ImgContainer>
            <ButtonBox>
              <Btn onClick={() => onVerifyUser(user.userId)}>인증 완료</Btn>
              <Btn onClick={() => onDeclineUser(user.userId)}>인증 실패</Btn>
            </ButtonBox>
          </Section>
        );
      })}
      <Section center my="50px" display="flex">
        <Title>전체 회원 학생증 인증 여부</Title>
        <InputContainer>
          <Input.Search
            placeholder="이름 검색"
            allowClear
            enterButton="검색"
            size="large"
            onSearch={onSearch}
          />
        </InputContainer>
      </Section>
      <Section center my="32px" display="flex">
        <Container>
          <TableContainer>
            <Table
              rowKey="userId"
              dataSource={users}
              columns={columns}
              pagination={{ position: [`bottomCenter`], defaultPageSize: 100 }}
            />
          </TableContainer>
        </Container>
      </Section>
    </LayoutWithHeader>
  );
};

export default StudentcardPage;

const Title = styled.h2`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  margin: 40px 0;
`;

const Container = styled.div`
  .ant-table-thead > tr > th {
    padding: 8px;
  }
  .ant-table-tbody > tr > td {
    padding: 8px;
  }
`;

const TableContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 900px;
`;

const Img = styled.img`
  height: 400px;
`;

const DetailContainer = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-left: 10%;
`;

const Info = styled.div`
  font-size: 20px;
`;

const ButtonBox = styled.div`
  width: 200px;
  margin: 5% auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Btn = styled(Button)`
  background-color: #eb8888;
  color: #ffffff;
`;

const InputContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;
