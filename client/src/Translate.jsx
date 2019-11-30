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
    <div>
      <textarea value={text} onChange={updateText}></textarea>
      <select value={language} onChange={updateLanguage}>
        <option value="">Select language</option>
        {Object.keys(languages).map(key => (
          <option key={key} value={key}>
            {languages[key]}
          </option>
        ))}
      </select>
      <button onClick={translateText}>Translate</button>
      {translation.length > 0 && (
        <div>
          <div>{translation}</div>
          <button onClick={saveTranslation}>Save</button>
        </div>
      )}
    </div>
  );
}
