import React from 'react';
import Translate from './Translate.jsx';
import Saved from './Saved.jsx';
import helpers from './helpers.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: {},
      translations: [],
      visible: 'translate',
      text: '',
      language: '',
      translation: '',
      filter: ''
    };
    this.getLanguages = helpers.getLanguages.bind(this);
    this.getTranslations = helpers.getTranslations.bind(this);
    this.changeTab = helpers.changeTab.bind(this);
    this.deleteTranslation = helpers.deleteTranslation.bind(this);
    this.updateText = helpers.updateText.bind(this);
    this.updateLanguage = helpers.updateLanguage.bind(this);
    this.translateText = helpers.translateText.bind(this);
    this.saveTranslation = helpers.saveTranslation.bind(this);
    this.updateFilter = helpers.updateFilter.bind(this);
  }

  componentDidMount() {
    this.getLanguages().then(this.getTranslations);
  }

  render() {
    return (
      <div className="container">
        <h3>Why don't you speak X yet?</h3>
        <div className="row">
          <button className="col" onClick={() => this.changeTab('translate')}>
            Translate
          </button>
          <button className="col" onClick={() => this.changeTab('saved')}>
            Saved
          </button>
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
              filter={this.state.filter}
              updateFilter={this.updateFilter}
            />
          )}
        </div>
      </div>
    );
  }
}
