const Translation = require('./index.js').Translation;

function getTranslations() {
  return Translation.find().sort('-updatedAt');
}

function addTranslation(translation) {
  return new Translation(translation).save();
}

function deleteTranslation(id) {
  return Translation.deleteOne(id);
}

module.exports.getTranslations = getTranslations;
module.exports.addTranslation = addTranslation;
module.exports.deleteTranslation = deleteTranslation;
