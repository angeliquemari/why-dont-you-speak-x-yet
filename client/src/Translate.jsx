import React from 'react';

export default function Translate({ updateText, updateLanguage, translateText, translation }) {
  return (
    <div>
      <input id="text-input" onChange={updateText}></input>
      <button onClick={translateText}>Translate</button>
      {translation.length > 0 && <div>{translation}</div>}
    </div>
  );
}
