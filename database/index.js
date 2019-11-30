const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/translations', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const translationSchema = new mongoose.Schema(
  {
    text: String,
    translation: String,
    target: String
  },
  {
    timestamps: true
  }
);

const Translation = mongoose.model('Translation', translationSchema);

module.exports.Translation = Translation;
