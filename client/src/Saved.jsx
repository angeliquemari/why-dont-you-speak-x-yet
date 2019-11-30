import React from 'react';

export default function Saved({ translations, deleteTranslation }) {
  return (
    <div>
      {translations.map(translation => (
        <div key={translation._id}>
          <div>{translation.text}</div>
          <div>{translation.translation}</div>
          <div>{translation.language}</div>
          <button onClick={() => deleteTranslation(translation._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
