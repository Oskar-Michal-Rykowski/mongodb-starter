const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 5, maxlength: 20 },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Department', departmentSchema);
