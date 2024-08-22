/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.raw(`
    CREATE TABLE "todoList" (
      "id" SERIAL PRIMARY KEY NOT NULL,
      "title" TEXT NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE "todo" (
      "id" SERIAL PRIMARY KEY NOT NULL,
      "content" TEXT NOT NULL,
      "completed" BOOLEAN NOT NULL DEFAULT FALSE, 
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "todoListId" INTEGER NOT NULL,

      CONSTRAINT "todo_todoList_fk" FOREIGN KEY ("todoListId") REFERENCES "todoList"("id") ON DELETE CASCADE
    );
  `)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.raw(`
    ALTER TABLE "todo" DROP CONSTRAINT "todo_todoList_fk";
    DROP TABLE IF EXISTS "todo";
    DROP TABLE IF EXISTS "todoList";
  `)
}
