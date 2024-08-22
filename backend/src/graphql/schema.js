export const schema = `#graphql
  type Todo {
    id: ID!
    todoListId: ID!
    content: String!
    completed: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type TodoList {
    id: ID!
    title: String!
    createdAt: String!
    updatedAt: String!
    todos: [Todo]!
  }

  type Query {
    todoLists: [TodoList]!
  }

  input AddTodoInput {
    todoListId: ID!
    content: String!
    completed: Boolean
  }

  input UpdateTodoInput {
    content: String
    completed: Boolean
  }

  type Mutation {
    addTodo(input: AddTodoInput!): Todo
    updateTodo(id: ID!, input: UpdateTodoInput!): Todo
    deleteTodo(id: ID!): Todo
  }
`;

