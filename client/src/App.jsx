import React from 'react';
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
import Translate from './Translate.jsx';
import Saved from './Saved.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: {},
      translations: [],
      visible: 'translate',
      text: '',
      language: '',
      translation: ''
    };
    this.getTranslations = this.getTranslations.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.deleteTranslation = this.deleteTranslation.bind(this);
    this.updateText = this.updateText.bind(this);
    this.updateLanguage = this.updateLanguage.bind(this);
    this.translateText = this.translateText.bind(this);
    this.saveTranslation = this.saveTranslation.bind(this);
  }

  componentDidMount() {
    axios
      .get('/languages')
      .then(response => {
        return this.setState({ languages: response.data });
      })
      .then(this.getTranslations)
      .catch(err => console.log('Error:', err));
  }

  getTranslations() {
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
  }

  changeTab(tab) {
    this.setState({ visible: tab });
  }

  deleteTranslation(id) {
    axios.delete(`/translations/${id}`).then(this.getTranslations);
  }

  updateText(e) {
    let text = e.target.value;
    this.setState({ text: text });
  }

  updateLanguage(e) {
    let language = e.target.value;
    this.setState({ language: language });
  }

  translateText() {
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
  }

  saveTranslation() {
    axios
      .post('/translations/save', {
        text: this.state.text,
        translation: this.state.translation,
        target: this.state.language
      })
      .then(this.getTranslations)
      .then(() => this.setState({ text: '', translation: '' }))
      .catch(err => console.log('Error:', err));
  }

  render() {
    return (
      <div>
        <div className="tabs">
          <div onClick={() => this.changeTab('translate')}>Translate</div>
          <div onClick={() => this.changeTab('saved')}>Saved</div>
        </div>
        <div>
          {this.state.visible === 'translate' && (
            <Translate
              text={this.state.text}
              updateText={this.updateText}
              updateLanguage={this.updateLanguage}
              translateText={this.translateText}
              saveTranslation={this.saveTranslation}
              translation={this.state.translation}
              languages={this.state.languages}
              language={this.state.language}
            />
          )}
          {this.state.visible === 'saved' && (
            <Saved
              translations={this.state.translations}
              deleteTranslation={this.deleteTranslation}
            />
          )}
        </div>
      </div>
    );
  }
}
