import { useMutation } from '@apollo/client'
import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from '../graphql/mutations/todoMutations'

export const useTodoMutations = () => {
  const [createTodo, { data: createData, loading: createLoading, error: createError }] =
    useMutation(ADD_TODO)

  const [updateTodo, { data: updateData, loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_TODO)

  const [deleteTodo, { data: deleteData, loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_TODO)

  return {
    createTodo,
    updateTodo,
    deleteTodo,
    data: { createData, updateData, deleteData },
    loading: { createLoading, updateLoading, deleteLoading },
    error: { createError, updateError, deleteError },
  }
}
