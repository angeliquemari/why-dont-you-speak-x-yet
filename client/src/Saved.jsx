import React from 'react';

export default function Saved({ translations, deleteTranslation, filter, updateFilter }) {
  let filterLanguagesObj = translations.reduce((accum, value) => {
    accum[value.target] = value.language;
    return accum;
  }, {});
  let filterLanguages = Object.keys(filterLanguagesObj);
  if (filter.length > 0)
    translations = translations.filter(translation => translation.target === filter);

  return (
    <div>
      <select value={filter} onChange={updateFilter}>
        <option value="">Filter by language</option>
        {filterLanguages.map(target => (
          <option key={target} value={target}>
            {filterLanguagesObj[target]}
          </option>
        ))}
      </select>
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
