
exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
        users.increments();
        users.text('name')
            .notNullable()
        users.text('email')
            .notNullable()
            .unique()
        users.text('password')
            .notNullable()
        users.integer('age', 3)
            .notNullable()
        users.boolean('consent')
            .defaultTo(false)
            .notNullable()
        users.boolean('terms')
            .defaultTo(false)
            .notNullable()

  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
