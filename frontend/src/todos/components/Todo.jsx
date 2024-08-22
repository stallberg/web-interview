import { useState } from 'react'
import { Button, TextField, Checkbox, Box, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { CheckCircle, CheckCircleOutline } from '@mui/icons-material'
import { useDebouncedCallback } from 'use-debounce'
import { GET_TODO_LISTS } from '../../graphql/queries/todoQueries'
import { useTodoMutations } from '../../hooks/useTodoMutations'

const AUTOSAVE_DELAY = 1000

export const Todo = ({ todo, listIndex }) => {
  const { deleteTodo, updateTodo } = useTodoMutations()
  const [todoContent, setTodoContent] = useState(todo.content)
  const [todoCompleted, setTodoCompleted] = useState(todo.completed)

  const handleDeleteTodo = (id) => {
    deleteTodo({ variables: { id }, refetchQueries: [GET_TODO_LISTS] })
  }

  const autoSaveTodo = useDebouncedCallback((todoId, newContent) => {
    updateTodo({
      variables: {
        id: todoId,
        input: { content: newContent },
      },
      refetchQueries: [GET_TODO_LISTS],
    })
  }, AUTOSAVE_DELAY)

  const handleInputChange = (newContent) => {
    setTodoContent(newContent)
    autoSaveTodo(todo.id, newContent)
  }

  const handleCheckboxClick = () => {
    const newCompletedValue = !todoCompleted
    setTodoCompleted(newCompletedValue)
    updateTodo({
      variables: {
        id: todo.id,
        input: { completed: newCompletedValue },
      },
      refetchQueries: [GET_TODO_LISTS],
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        marginTop: '1rem',
        flexGrow: 1,
      }}
    >
      <Typography sx={{ alignContent: 'center' }} variant='h6'>
        {`${listIndex + 1}.`}
      </Typography>
      <Checkbox
        sx={{ marginLeft: '8px', marginRight: '8px' }}
        icon={<CheckCircleOutline />}
        checkedIcon={<CheckCircle />}
        checked={todoCompleted}
        onClick={handleCheckboxClick}
      />
      <TextField
        sx={{ flexGrow: 1 }}
        label='What to do?'
        value={todoContent}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <Button size='small' color='secondary' onClick={() => handleDeleteTodo(todo.id)}>
        <DeleteIcon />
      </Button>
    </Box>
  )
}
