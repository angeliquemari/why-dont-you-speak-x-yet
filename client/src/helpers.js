const axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/json';

module.exports.getLanguages = function() {
  return axios
    .get('/languages')
    .then(response => {
      return this.setState({ languages: response.data });
    })
    .catch(err => console.log('Error:', err));
};

module.exports.getTranslations = function() {
  return axios
    .get('/translations')
    .then(response => {
      let translations = response.data.map(translation => {
        translation['language'] = this.state.languages[translation.target];
        return translation;
      });
      return this.setState({ translations: translations });
    })
    .catch(err => console.log('Error:', err));
};

module.exports.changeTab = function(tab) {
  this.setState({ visible: tab });
};

module.exports.deleteTranslation = function(id) {
  axios.delete(`/translations/${id}`).then(this.getTranslations);
};

module.exports.updateText = function(e) {
  this.setState({ text: e.target.value });
};

module.exports.updateLanguage = function(e) {
  this.setState({ language: e.target.value, translation: '' });
};

module.exports.translateText = function() {
  if (this.state.text.length > 0 && this.state.language.length > 0) {
    axios
      .post('/translations/translate', { text: this.state.text, target: this.state.language })
      .then(response => {
        this.setState({ translation: response.data });
      })
      .catch(err => console.log('Error:', err));
  } else {
    console.log('Missing text and/or language selection');
  }
};

module.exports.saveTranslation = function() {
  axios
    .post('/translations/save', {
      text: this.state.text,
      translation: this.state.translation,
      target: this.state.language,
      filter: ''
    })
    .then(this.getTranslations)
    .then(() => this.setState({ text: '', translation: '' }))
    .catch(err => console.log('Error:', err));
};

module.exports.updateFilter = function(e) {
  this.setState({ filter: e.target.value });
};
