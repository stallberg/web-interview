import React, { Fragment, useState } from 'react'
import {
  Card,
  CardContent,
  List,
  Typography,
  CircularProgress,
} from '@mui/material'
import { TodoListForm } from './TodoListForm'
import { useTodosQuery } from '../../hooks/useTodosQuery'
import { TodoListItem } from './TodoListItem'

export const TodoLists = ({ style }) => {
  const [activeList, setActiveList] = useState()
  const { loading, error, todoLists } = useTodosQuery()

  if (loading) return <CircularProgress style={{ position: 'fixed', top: '50%', left: '50%' }} />
  if (error) return <Typography component='p'>Error: {error.message}</Typography>

  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {todoLists.map((todoList, index) => (
              <TodoListItem
                todoList={todoList}
                key={todoList.id}
                setActiveList={() => setActiveList(index)}
              />
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
        />
      )}
    </Fragment>
  )
}
