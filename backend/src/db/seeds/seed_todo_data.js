/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // First remove all existing entries
  await knex('todo').del()
  await knex('todoList').del()

  const [todoList1] = await knex.insert({ title: 'First List' }).into('todoList').returning('id')
  const [todoList2] = await knex.insert({ title: 'Second List' }).into('todoList').returning('id')

  const todos = [
    {
      content: 'First todo of first list!',
      completed: false,
      todoListId: todoList1.id,
    },
    {
      content: 'First todo of second list!',
      completed: false,
      todoListId: todoList2.id,
    },
  ]

  await knex('todo').insert(todos)
}
