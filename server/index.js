const express = require('express');
const app = express();
const PORT = 3000;
const morgan = require('morgan');
const { Translate } = require('@google-cloud/translate').v2;
const googleTranslate = new Translate();

// serve static files to /
// app.use(express.static('public'));
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
    });
});

app.get('/translations', (req, res) => {
  // get all translations from db
  res.end();
});

app.post('/translations', (req, res) => {
  let text = req.body.text;
  let target = req.body.target; // language code
  googleTranslate
    .translate(text, target)
    .then(translation => {
      // save translation to db
      res.send(translation);
    })
    .catch(err => {
      console.log('Error:', err);
    });
});

app.delete('/translations/:id', (req, res) => {
  // use req.params.id to delete translation from db
  res.end();
});

app.listen(PORT, () => console.log(`Server app listening on port ${PORT}`));
