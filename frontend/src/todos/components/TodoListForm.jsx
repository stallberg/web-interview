import React from 'react'
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useTodoMutations } from '../../hooks/useTodoMutations'
import { GET_TODO_LISTS } from '../../graphql/queries/todoQueries'
import { Todo } from './Todo'

export const TodoListForm = ({ todoList }) => {
  const { createTodo } = useTodoMutations()
  const { todos } = todoList

  const handleAddTodo = () => {
    createTodo({
      variables: {
        input: { content: '', todoListId: todoList.id },
      },
      refetchQueries: [GET_TODO_LISTS],
    })
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {todos.map((todo, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <Todo key={todo.id} todo={todo} />
            </div>
          ))}
          <CardActions>
            <Button type='button' color='primary' onClick={handleAddTodo}>
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
