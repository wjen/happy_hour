const { Schema, model } = require('mongoose');

const RoleSchema = new Schema({
  name: String,
});

module.exports = model('Role', RoleSchema);
