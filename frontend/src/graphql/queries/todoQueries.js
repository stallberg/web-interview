import { gql } from '@apollo/client'

export const GET_TODO_LISTS = gql`
  query GetTodoLists {
    todoLists {
      id
      title
      createdAt
      todos {
        id
        content
        completed
        createdAt
      }
    }
  }
`
