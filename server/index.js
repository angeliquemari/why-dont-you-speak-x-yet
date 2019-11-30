const express = require('express');
const app = express();
const PORT = 3000;
const morgan = require('morgan');
const { Translate } = require('@google-cloud/translate').v2;
const googleTranslate = new Translate();
const db = require('../database/methods.js');

app.use(express.static('./client/dist'));
app.use(express.json());
app.use(morgan('dev'));

app.get('/languages', (req, res) => {
  googleTranslate
    .getLanguages()
    .then(languages => {
      let languagesDict = {};
      languages[0].forEach(language => {
        languagesDict[language.code] = language.name;
      });
      res.send(languagesDict);
    })
    .catch(err => {
      console.log('Error:', err);
      res.end();
    });
});

app.get('/translations', (req, res) => {
  db.getTranslations()
    .then(translations => res.send(translations))
    .catch(err => {
      console.log('Error:', err);
      res.end();
    });
});

app.post('/translations/translate', (req, res) => {
  googleTranslate
    .translate(req.body.text, req.body.target)
    .then(response => res.send(response[0]))
    .catch(err => {
      console.log('Error:', err);
      res.end();
    });
});

app.post('/translations/save', (req, res) => {
  db.addTranslation(req.body)
    .then(() => res.end())
    .catch(err => {
      console.log('Error:', err);
      res.end();
    });
});

app.delete('/translations/:id', (req, res) => {
  db.deleteTranslation({ _id: req.params.id })
    .then(() => res.end())
    .catch(err => {
      console.log('Error:', err);
      res.end();
    });
});

app.listen(PORT, () => console.log(`Server app listening on port ${PORT}`));
