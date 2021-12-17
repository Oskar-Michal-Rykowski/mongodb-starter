const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Department', departmentSchema);
