import React from 'react';
import { shallow } from 'enzyme';
import Saved from '../client/src/Saved.jsx';
import { deleteTranslation, updateFilter } from '../client/src/helpers.js';

describe('Saved Component', () => {
  it('renders', () => {
    shallow(
      <Saved
        translations={[]}
        deleteTranslation={deleteTranslation}
        filter={''}
        filterLanguages={{}}
        updateFilter={updateFilter}
      />
    );
  });

  // option elements = languages in translations + 1

  // if filter === '' # of tr elements is same as # of translations

  // if filter exists, translations shown are only of that language
});
