
exports.up = function(knex) {
  return knex.schema.createTable('sideeffects', se => {
        se.increments()
        se.text('name')
            .notNullable()
        se.text('description')
            .notNullable()
        se.integer('med_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('medicines')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')
        se.boolean('sevhigh')
        se.boolean('sevmed')
        se.boolean('sevlow')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('sideeffects')
};
