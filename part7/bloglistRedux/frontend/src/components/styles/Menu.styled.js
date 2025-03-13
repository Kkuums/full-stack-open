import styled from 'styled-components'

export const StyledMenu = styled.nav`
  background-color: #2b2926;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;

  a {
    text-decoration: none;
    margin-right: 16px;
    font-size: 24px;
    color: inherit;
    position: relative;

    &:hover {
      color: #c9c9c9;
      transition: 300ms;
    }

    &::before {
      content: '';
      position: absolute;
      display: block;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: #c9c9c9;
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &:hover::before {
      transform: scaleX(1);
    }
  }
`
