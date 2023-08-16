import Section from '@/components/Section';
import { useGetAdminUserStudentCardQuery } from '@/features/user/api';
import LayoutWithHeader from '@/layouts/LayoutWithHeader';
import { Button } from 'antd';
import styled from 'styled-components';

const StudentcardPage = () => {
  const { data: users } = useGetAdminUserStudentCardQuery();

  return (
    <LayoutWithHeader>
      {users?.users.map((user) => {
        return (
          <Section center my="32px" display="flex" key={user.userId}>
            <ImgContainer>
              <Img src={user.studentCardUrl} alt="studentcardimg" />

              <DetailContainer>
                <Info>{`이름 : ${user.nickname}`}</Info>
                <Info>{`성별 : ${user.gender}`}</Info>
                <Info>{`학교 : ${user.university}`}</Info>
                <Info>{`나이 : ${user.birth}`}</Info>
              </DetailContainer>
            </ImgContainer>
            <ButtonBox>
              <Btn>인증 완료</Btn>
              <Btn>인증 실패</Btn>
            </ButtonBox>
          </Section>
        );
      })}
    </LayoutWithHeader>
  );
};

export default StudentcardPage;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const Img = styled.img`
  height: 300px;
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
