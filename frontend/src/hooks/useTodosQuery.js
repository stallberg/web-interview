import { useQuery } from '@apollo/client'
import { GET_TODO_LISTS } from '../graphql/queries/todoQueries'
import { useMemo } from 'react'

export const useTodosQuery = () => {
  const { data, loading, error } = useQuery(GET_TODO_LISTS)
  const todoLists = useMemo(() => data?.todoLists || [], [data])

  return {
    todoLists,
    loading,
    error,
  }
}
