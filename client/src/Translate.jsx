import React from 'react';

export default function Translate({
  text,
  updateText,
  updateLanguage,
  translateText,
  saveTranslation,
  translation,
  languages,
  language
}) {
  return (
    <div className="container">
      <div className="row">
        <textarea className="col" value={text} onChange={updateText}></textarea>
      </div>
      <div className="row">
        <select className="col" value={language} onChange={updateLanguage}>
          <option value="">Select language</option>
          {Object.keys(languages).map(key => (
            <option key={key} value={key}>
              {languages[key]}
            </option>
          ))}
        </select>
        <button className="col" onClick={translateText}>
          Translate
        </button>
      </div>
      {translation.length > 0 && (
        <div>
          <div>{translation}</div>
          <button onClick={saveTranslation}>Save</button>
        </div>
      )}
    </div>
  );
}
