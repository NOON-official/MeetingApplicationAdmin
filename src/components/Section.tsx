import styled from "styled-components";

/**
 * mx: margin x축
 * my: margin y축
 */
const Section = styled.section<{
  mx?: string;
  my?: string;
  px?: string;
  py?: string;
  center?: boolean;
  display?: string;
}>`
  margin: ${({ my }) => my || `0px`} ${({ mx }) => mx || `20px`};
  padding: ${({ py }) => py || `0px`} ${({ px }) => px || `0px`};
  text-align: ${({ center }) => (center ? `center` : `left`)};
`;

export default Section;
