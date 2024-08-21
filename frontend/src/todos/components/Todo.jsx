import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDebouncedCallback } from 'use-debounce'
import { GET_TODO_LISTS } from '../../graphql/queries/todoQueries'
import { useTodoMutations } from '../../hooks/useTodoMutations'

const AUTOSAVE_DELAY = 1000

export const Todo = ({ todo }) => {
  const { deleteTodo, updateTodo } = useTodoMutations()
  const [todoContent, setTodoContent] = useState(todo.content);

  const handleDeleteTodo = (id) => {
    deleteTodo({ variables: { id }, refetchQueries: [GET_TODO_LISTS] })
  }

  const autoSaveTodo = useDebouncedCallback((todoId, newContent) => {
    console.log('Updating todo')
    updateTodo({
      variables: {
        id: todoId,
        input: { content: newContent },
      },
      refetchQueries: [GET_TODO_LISTS],
    })
  }, AUTOSAVE_DELAY)

  const handleInputChange = (todoId, newContent) => {
    setTodoContent(newContent)
    autoSaveTodo(todoId, newContent)
  }

  return (
    <>
      <TextField
        sx={{ flexGrow: 1, marginTop: '1rem' }}
        label='What to do?'
        value={todoContent}
        onChange={(e) => handleInputChange(todo.id, e.target.value)}
      />
      <Button
        sx={{ margin: '8px' }}
        size='small'
        color='secondary'
        onClick={() => handleDeleteTodo(todo.id)}
      >
        <DeleteIcon />
      </Button>
    </>
  )
}
