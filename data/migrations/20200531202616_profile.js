
exports.up = function(knex) {
  return knex.schema.createTable('profiles', prof => {
      prof.increments();
      prof.date('birthday')
      prof.text('conditions')
      prof.text('hospital')
      prof.text('nok_name')
      prof.text('nok_phone')
      prof.integer('user_id')
            .unsigned()
            .notNullable()
            .unique()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('profiles')
};
