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
  }

  componentDidMount() {
    axios
      .get('/languages') // get dict of languages
      .then(response => {
        return this.setState({ languages: response.data });
      })
      .then(this.getTranslations) // get saved translations
      .then(response => {
        return this.setState({ translations: response.data });
      })
      .catch(err => {
        console.log('Error:', err);
      });
  }

  getTranslations() {
    return axios.get('/translations');
  }

  changeTab(tab) {
    this.setState({ visible: tab });
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
          {this.state.visible === 'saved' && <Saved />}
        </div>
      </div>
    );
  }
}
