import Knex from 'knex'

export async function up(knex: Knex){
  return knex.schema.createTable('login', table => {
    table.string('name').notNullable();
    table.string('password').notNullable();
  });
}

export async function down(knex: Knex){
  return knex.schema.dropTable('login')
}