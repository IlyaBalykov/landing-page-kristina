const { Schema, model } = require('mongoose');

const Role = new Schema( {
    value: { type: String, unique: false, default: 'user' },
})

module.exports = model('Role', Role) //model name, template of model