import styled from 'styled-components'

export const StyledUsers = styled.div`
  td {
    width: 160px;
  }

  tr {
    height: 32px;
  }

  a {
    border: 1px solid black;
    border-radius: 4px;
    padding: 2px 4px;

    &:hover {
      background-color: #dadada;
      transition: 300ms;
    }
  }
`

export const CenteredTd = styled.td`
  text-align: center;
`
