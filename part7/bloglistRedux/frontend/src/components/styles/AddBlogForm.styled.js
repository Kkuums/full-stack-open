import styled from 'styled-components'

export const StyledAddBlogForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 320px;

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
    align-self: flex-start;
  }
`
