
exports.up = function(knex) {
  return knex.schema.createTable('medicines', medicine => {
        medicine.increments()
        medicine.text('med_name')
                .notNullable()
        medicine.integer('qty')
                .notNullable()
        medicine.boolean('morning')
        medicine.boolean('afternoon')
        medicine.boolean('night')
        medicine.boolean('otc')
        medicine.boolean('script')
        medicine.integer('user_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')    
})
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('medicines')
};
