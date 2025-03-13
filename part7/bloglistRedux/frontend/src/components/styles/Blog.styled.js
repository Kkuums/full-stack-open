import styled from 'styled-components'

export const StyledBlog = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  background-color: #fafafa;
  max-width: 50%;
  margin: auto;
  padding: 25px;
  box-shadow: 2px 2px 1px #dddddd;

  form {
    display: flex;
    flex-direction: column;
    width: 320px;

    input {
      border-radius: 4px;
      border: 1px solid black;
      height: 20px;
    }

    button {
      width: 128px;
      margin-top: 8px;
    }
  }

  ul {
    padding: 0;
  }

  li {
    list-style-type: none;
  }
`

export const StyledButtonDiv = styled.div`
  display: flex;
  flex-direction: row;

  button {
    margin-right: 4px;
  }
`
