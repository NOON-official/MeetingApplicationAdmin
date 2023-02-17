import Section from "@/components/Section";
import BaseLayout from "@/layouts/BaseLayout";
import styled from "styled-components";

const IndexPage = () => {
  return (
    <BaseLayout>
      <Section center my="32px">
        <h2>관리자 페이지</h2>
        <StatTable>
          <tbody>
            <tr>
              <td>3:3</td>
              <td>남 : 55</td>
              <td>여 : 55</td>
              <td>전체 : 110</td>
            </tr>
            <tr>
              <td>2:2</td>
              <td>남 : 55</td>
              <td>여 : 55</td>
              <td>전체 : 110</td>
            </tr>
          </tbody>
        </StatTable>
      </Section>
    </BaseLayout>
  );
};

const StatTable = styled.table`
  display: inline-block;

  td {
    width: 140px;
    height: 40px;
    border: 1px solid #000000;
    font-weight: bold;
  }
`;

export default IndexPage;
