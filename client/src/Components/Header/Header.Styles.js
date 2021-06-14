import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

// css allows us to write a block of css that we can pass in and render as css inside of any styled components
const OptionContainerStyles = css`
      padding: 10px 15px;
      cursor: pointer;
`

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

// by calling styled() we can extend other components which in this case we extent the Link component
export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
`;

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
    padding: 10px 15px;
    cursor: pointer;
`;

// This is no longer needed since we can use OptionLink with the prop as='div' to convert it from a Link to a div
// We can also use it as another component like as={someComponent}
export const OptionDiv = styled.div`
  ${OptionContainerStyles}
`;
