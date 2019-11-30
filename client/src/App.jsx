import React from 'react';
import axios from 'axios';
import Translate from './Translate.jsx';
import Saved from './Saved.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: {},
      translations: [],
      visible: 'translate'
    };
    this.getTranslations = this.getTranslations.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.deleteTranslation = this.deleteTranslation.bind(this);
  }

  componentDidMount() {
    axios
      .get('/languages') // get dict of languages
      .then(response => {
        return this.setState({ languages: response.data });
      })
      .then(this.getTranslations) // get saved translations
      .catch(err => {
        console.log('Error:', err);
      });
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
      .catch(err => {
        console.log('Error:', err);
      });
  }

  changeTab(tab) {
    this.setState({ visible: tab });
  }

  deleteTranslation(id) {
    axios.delete(`/translations/${id}`).then(this.getTranslations);
  }

  render() {
    return (
      <div>
        <div className="tabs">
          <div onClick={() => this.changeTab('translate')}>Translate</div>
          <div onClick={() => this.changeTab('saved')}>Saved</div>
        </div>
        <div>
          {this.state.visible === 'translate' && <Translate />}
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
