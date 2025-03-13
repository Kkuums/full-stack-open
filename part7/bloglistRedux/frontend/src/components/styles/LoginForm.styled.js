import styled from 'styled-components'

export const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 320px;
  margin: 0 auto;

  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
  }

  label {
    margin-bottom: 4px;
  }

  input {
    padding: 4px;
    font-size: 16px;
    border: 1px solid black;
    border-radius: 4px;
  }

  button {
    align-self: center;
    width: 64px;
  }
`
