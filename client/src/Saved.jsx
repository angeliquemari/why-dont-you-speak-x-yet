import React from 'react';

export default function Saved({
  translations,
  deleteTranslation,
  filter,
  filterLanguages,
  updateFilter
}) {
  if (filter.length > 0)
    translations = translations.filter(translation => translation.target === filter);
  return (
    <div>
      <select value={filter} onChange={updateFilter}>
        <option value="">Filter by language</option>
        {Object.keys(filterLanguages).map(target => (
          <option key={target} value={target}>
            {filterLanguages[target]}
          </option>
        ))}
      </select>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Text</th>
            <th scope="col">Translation</th>
            <th scope="col">Language</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {translations.map(translation => (
            <tr key={translation._id}>
              <td>{translation.text}</td>
              <td>{translation.translation}</td>
              <td>{translation.language}</td>
              <td>
                <button onClick={() => deleteTranslation(translation._id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
