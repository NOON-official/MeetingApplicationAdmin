import Section from "@/components/Section";
import { useGetAdminUserStudentCardQuery } from "@/features/user/api";
import LayoutWithHeader from "@/layouts/LayoutWithHeader";
import { Button } from "antd";
import { useState } from "react";
import styled from "styled-components";

const StudentcardPage = () => {
  const [url, setUrl] = useState<string>(``);
  const aa = useGetAdminUserStudentCardQuery();
  console.log(aa);

  return (
    <LayoutWithHeader>
      <Section center my="32px" display="flex">
        <ImgContainer>
          <Img
            src="https://studentidcard.s3.ap-northeast-2.amazonaws.com/%EA%B9%80%EB%B3%B4%EC%9C%A4LKH3TZ84.jpg"
            alt="studentcardimg"
          />
          <DetailContainer>
            <Info>이름 : 김보윤</Info>
            <Info>성별 : 여자</Info>
            <Info>학교 : 한국외국어대학교</Info>
            <Info>나이 : 26</Info>
          </DetailContainer>
        </ImgContainer>
        <ButtonBox>
          <Btn>인증 완료</Btn>
          <Btn>인증 실패</Btn>
        </ButtonBox>
      </Section>
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
