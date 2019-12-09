import React from 'react';
import { shallow } from 'enzyme';
import Saved from '../client/src/Saved.jsx';

const oneTranslation = [
  {
    _id: '5dedbec0d0cbdb4a82a9b594',
    text: 'I once had a rabbit',
    translation: 'Ich hatte einmal ein Kaninchen',
    language: 'German',
    target: 'de'
  }
];
const oneTranslationFilterLangs = { de: 'German' };
const twoTranslations = [
  {
    _id: '5dedbec0d0cbdb4a82a9b594',
    text: 'I once had a rabbit',
    translation: 'Ich hatte einmal ein Kaninchen',
    language: 'German',
    target: 'de'
  },
  {
    _id: '5de2086a36400c83face6056',
    text: 'Hello? Are you still there?',
    translation: 'Hallo? Ben je er nog?',
    language: 'Dutch',
    target: 'nl'
  }
];
const twoTranslationsFilterLangs = { de: 'German', nl: 'Dutch' };

describe('Saved Component', () => {
  it('Table displays a single translation', () => {
    let wrapper = shallow(
      <Saved
        translations={oneTranslation}
        deleteTranslation={() => {}}
        filter={''}
        filterLanguages={oneTranslationFilterLangs}
        updateFilter={() => {}}
      />
    );
    let row = wrapper.find('tbody').find('tr');
    expect(row.key()).toEqual('5dedbec0d0cbdb4a82a9b594');
    expect(row.contains(<td>I once had a rabbit</td>)).toEqual(true);
    expect(row.contains(<td>Ich hatte einmal ein Kaninchen</td>)).toEqual(true);
    expect(row.contains(<td>German</td>)).toEqual(true);
  });

  it('Table displays all translations when no filter selected', () => {
    let wrapper = shallow(
      <Saved
        translations={twoTranslations}
        deleteTranslation={() => {}}
        filter={''}
        filterLanguages={twoTranslationsFilterLangs}
        updateFilter={() => {}}
      />
    );
    let row1 = wrapper.find('tr').at(1);
    expect(row1.key()).toEqual('5dedbec0d0cbdb4a82a9b594');
    let row2 = wrapper.find('tr').at(2);
    expect(row2.key()).toEqual('5de2086a36400c83face6056');
  });

  it('Dropdown shows all languages to filter by', () => {
    let wrapper = shallow(
      <Saved
        translations={twoTranslations}
        deleteTranslation={() => {}}
        filter={''}
        filterLanguages={twoTranslationsFilterLangs}
        updateFilter={() => {}}
      />
    );
    let dropdown = wrapper.find('select');
    expect(dropdown.contains(<option value="de">German</option>)).toEqual(true);
    expect(dropdown.contains(<option value="nl">Dutch</option>)).toEqual(true);
  });

  it('Table displays filtered translations when filter selected', () => {
    let wrapper = shallow(
      <Saved
        translations={twoTranslations}
        deleteTranslation={() => {}}
        filter={'nl'}
        filterLanguages={twoTranslationsFilterLangs}
        updateFilter={() => {}}
      />
    );
    let row = wrapper.find('tr').at(1);
    expect(row.key()).toEqual('5de2086a36400c83face6056');
  });

  it('Clicking on the delete button calls deleteTranslation with ID of translation', () => {
    let mockFn = jest.fn();
    let wrapper = shallow(
      <Saved
        translations={oneTranslation}
        deleteTranslation={mockFn}
        filter={''}
        filterLanguages={oneTranslationFilterLangs}
        updateFilter={() => {}}
      />
    );

    let deleteButton = wrapper
      .find('tr')
      .at(1)
      .find('td')
      .at(3)
      .find('button');
    deleteButton.simulate('click');
    expect(mockFn).toBeCalled();
    expect(mockFn).toBeCalledWith('5dedbec0d0cbdb4a82a9b594');
  });

  it('Selecting language from dropdown calls updateFilter', () => {
    let mockFn = jest.fn();
    let wrapper = shallow(
      <Saved
        translations={oneTranslation}
        deleteTranslation={() => {}}
        filter={''}
        filterLanguages={oneTranslationFilterLangs}
        updateFilter={mockFn}
      />
    );
    let dropdown = wrapper.find('select');
    dropdown.simulate('change');
    expect(mockFn).toBeCalled();
  });
});
