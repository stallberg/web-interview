import { todoService } from '../services/todoService.js'

const getTodoListsResolver = async (_, __, { db }) => {
  return await todoService.getTodoLists(db)
}

const addTodoResolver = async (_, { input }, { db }) => {
  return await todoService.insertTodo(db, input)
}

const deleteTodoResolver = async (_, { id }, { db }) => {
  return await todoService.deleteTodo(db, id)
}

const updateTodoResolver = async (_, { id, input }, { db }) => {
  return await todoService.updateTodo(db, id, input)
}


// Resolvers get passed (parent, args, contextValue, info)
export const resolvers = {
  Query: {
    todoLists: (...args) => getTodoListsResolver(...args),
  },
  Mutation: {
    addTodo: (...args) => addTodoResolver(...args),
    updateTodo: (...args) => updateTodoResolver(...args),
    deleteTodo: (...args) => deleteTodoResolver(...args),
  },
}
