import styled from 'styled-components'

export const StyledButton = styled.button`
  border-radius: 4px;
  height: 24px;
  border: 1px solid black;
  background-color: ${({ bg }) => bg};
  color: ${({ textColor }) => textColor};

  &:hover {
    background-color: ${({ bghover }) => bghover};
    transition: 300ms;
    color: white;
  }
`
