import styled from "styled-components";

/**
 * mx: margin x축
 * my: margin y축
 */
const Section = styled.section<{ mx?: string; my?: string; center?: boolean }>`
  margin: ${({ my }) => my || `0px`} ${({ mx }) => mx || `20px`};
  text-align: ${({ center }) => (center ? `center` : `left`)};
`;

export default Section;
