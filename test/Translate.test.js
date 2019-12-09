import React from 'react';
import { shallow } from 'enzyme';
import Translate from '../client/src/Translate.jsx';

describe('Translate Component', () => {
  it('Text area shows text', () => {
    let wrapper = shallow(
      <Translate
        text={'I once had a rabbit'}
        updateText={() => {}}
        updateLanguage={() => {}}
        translateText={() => {}}
        saveTranslation={() => {}}
        translation={''}
        languages={{}}
        language={''}
      />
    );
    let textarea = wrapper.find('textarea');
    expect(textarea.prop('value')).toEqual('I once had a rabbit');
  });

  it('Changing text calls updateText', () => {
    let mockFn = jest.fn();
    let wrapper = shallow(
      <Translate
        text={''}
        updateText={mockFn}
        updateLanguage={() => {}}
        translateText={() => {}}
        saveTranslation={() => {}}
        translation={''}
        languages={{}}
        language={''}
      />
    );
    let textarea = wrapper.find('textarea');
    textarea.simulate('change');
    expect(mockFn).toBeCalled();
  });

  it('Dropdown shows available languages', () => {
    let wrapper = shallow(
      <Translate
        text={''}
        updateText={() => {}}
        updateLanguage={() => {}}
        translateText={() => {}}
        saveTranslation={() => {}}
        translation={''}
        languages={{ de: 'German', nl: 'Dutch' }}
        language={''}
      />
    );
    let dropdown = wrapper.find('select');
    expect(dropdown.contains(<option value="de">German</option>)).toEqual(true);
    expect(dropdown.contains(<option value="nl">Dutch</option>)).toEqual(true);
  });

  it('Selecting language from dropdown calls updateLanguage', () => {
    let mockFn = jest.fn();
    let wrapper = shallow(
      <Translate
        text={''}
        updateText={() => {}}
        updateLanguage={mockFn}
        translateText={() => {}}
        saveTranslation={() => {}}
        translation={''}
        languages={{ de: 'German', nl: 'Dutch' }}
        language={''}
      />
    );
    let dropdown = wrapper.find('select');
    dropdown.simulate('change');
    expect(mockFn).toBeCalled();
  });

  it('If language selected, dropdown set to it', () => {
    let wrapper = shallow(
      <Translate
        text={''}
        updateText={() => {}}
        updateLanguage={() => {}}
        translateText={() => {}}
        saveTranslation={() => {}}
        translation={''}
        languages={{ de: 'German', nl: 'Dutch' }}
        language={'de'}
      />
    );
    let dropdown = wrapper.find('select');
    expect(dropdown.prop('value')).toEqual('de');
  });

  it('Clicking translate button calls translateText', () => {
    let mockFn = jest.fn();
    let wrapper = shallow(
      <Translate
        text={'I once had a rabbit'}
        updateText={() => {}}
        updateLanguage={() => {}}
        translateText={mockFn}
        saveTranslation={() => {}}
        translation={''}
        languages={{ de: 'German', nl: 'Dutch' }}
        language={'de'}
      />
    );
    let translateButton = wrapper.find('button').filterWhere(n => n.text() === 'Translate');
    translateButton.simulate('click');
    expect(mockFn).toBeCalled();
  });

  it('If there is no translation, do not display the save button', () => {
    let wrapper = shallow(
      <Translate
        text={'I once had a rabbit'}
        updateText={() => {}}
        updateLanguage={() => {}}
        translateText={() => {}}
        saveTranslation={() => {}}
        translation={''}
        languages={{ de: 'German', nl: 'Dutch' }}
        language={'de'}
      />
    );
    let translation = wrapper
      .find('div')
      .filterWhere(n => n.text() === 'Ich hatte einmal ein Kaninchen');
    expect(translation.exists()).toEqual(false);
    let saveButton = wrapper.find('button').filterWhere(n => n.text() === 'Save');
    expect(saveButton.exists()).toEqual(false);
  });

  it('If there is a translation, display it and the save button', () => {
    let wrapper = shallow(
      <Translate
        text={'I once had a rabbit'}
        updateText={() => {}}
        updateLanguage={() => {}}
        translateText={() => {}}
        saveTranslation={() => {}}
        translation={'Ich hatte einmal ein Kaninchen'}
        languages={{ de: 'German', nl: 'Dutch' }}
        language={'de'}
      />
    );
    let translation = wrapper
      .find('div')
      .filterWhere(n => n.text() === 'Ich hatte einmal ein Kaninchen');
    expect(translation.exists()).toEqual(true);
    let saveButton = wrapper.find('button').filterWhere(n => n.text() === 'Save');
    expect(saveButton.exists()).toEqual(true);
  });

  it('Clicking the save button calls saveTranslation', () => {
    let mockFn = jest.fn();
    let wrapper = shallow(
      <Translate
        text={'I once had a rabbit'}
        updateText={() => {}}
        updateLanguage={() => {}}
        translateText={() => {}}
        saveTranslation={mockFn}
        translation={'Ich hatte einmal ein Kaninchen'}
        languages={{ de: 'German', nl: 'Dutch' }}
        language={'de'}
      />
    );
    let saveButton = wrapper.find('button').filterWhere(n => n.text() === 'Save');
    saveButton.simulate('click');
    expect(mockFn).toBeCalled();
  });
});
