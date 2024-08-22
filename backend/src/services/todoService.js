const getTodoLists = async (db) => {
  return await db
    .select(
      db.raw(`
      "todoList".*,
      coalesce(
        json_agg(todo.* ORDER BY todo.id ASC) FILTER (WHERE todo.id IS NOT NULL),
        '[]'::json
      ) AS todos
    `)
    )
    .from('todoList')
    .leftJoin('todo', 'todoList.id', 'todo.todoListId')
    .groupBy(['todoList.id'])
    .orderBy('todoList.id', 'asc')
}

const insertTodo = async (db, data) => {
  const [todo] = await db
    .insert({ ...data })
    .into('todo')
    .returning('*')

  return todo
}

const updateTodo = async (db, id, updateData) => {
  const [todo] = await db('todo')
    .update({ ...updateData })
    .where({ id })
    .returning('*')

  return todo
}

const deleteTodo = async (db, id) => {
  const [deleted] = await db('todo').where({ id }).del().returning('id')
  return deleted
}

export const todoService = {
  getTodoLists,
  insertTodo,
  updateTodo,
  deleteTodo,
}
