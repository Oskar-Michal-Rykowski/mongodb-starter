const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    //jak zrobić by były wymagane tylko przy wprowadzaniu danych, a przy edycji aktualizował się tylko jeden element
    client: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Product', productSchema);
