import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { Fragment } from 'react'

export const TodoListItem = ({ todoList, setActiveList }) => {
  const todoCount = todoList?.todos?.length
  const completedTodoCount = todoList?.todos?.filter((todo) => todo.completed).length
  const allTodosCompleted = todoCount === completedTodoCount
  return (
    <Fragment>
      <ListItemButton key={todoList.id} onClick={setActiveList}>
        <ListItemIcon>{allTodosCompleted ? <DoneAllIcon /> : <ReceiptIcon />}</ListItemIcon>
        <ListItemText
          primary={todoList.title}
          secondary={`${completedTodoCount}/${todoCount} completed`}
        />
      </ListItemButton>
    </Fragment>
  )
}
