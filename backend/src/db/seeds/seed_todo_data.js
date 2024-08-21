/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // First remove all existing entries
  await knex('todo').del()
  await knex('todoList').del()

  const todoLists = [
    { id: 1, title: 'First List' },
    { id: 2, title: 'Second List' },
  ]

  const todos = [
    {
      id: 1,
      content: 'First todo of first list!',
      completed: false,
      todoListId: 1,
    },
    {
      id: 2,
      content: 'First todo of second list!',
      completed: false,
      todoListId: 2,
    },
  ]

  await knex('todoList').insert(todoLists)
  await knex('todo').insert(todos)
}
