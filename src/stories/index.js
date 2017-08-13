/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { storiesOf, action, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { muiTheme } from 'storybook-addon-material-ui';
import { WithNotes } from '@storybook/addon-notes';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import App from '../App';
import App2 from '../App2';
import Header from '../Header';
import Intro from '../Intro';
import '../App.css';

const reqThemes = require.context('../.themes/', true, /.json/);
const themesList = [];
reqThemes.keys().forEach((filename) => {
    themesList.push(reqThemes(filename));
});

/** note: decorators
 *  You can add decorator globally:
 *  addDecorator(muiTheme(greyTheme));
 *  You can pass a single object or an array of themes
 */

storiesOf('Popup Component', module)
    .addDecorator(muiTheme(themesList)) /* [lightTheme, darkTheme, greyTheme]*/
    .addDecorator(story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '50%', maxWidth: 500, minWidth: 200 }}>
          {story()}
          {/* SHOW_SUPPORT ? <SupportProject /> : null*/}
        </div>
      </div>
    ))
    .addDecorator(withKnobs)
    .add('Popup', () => (
        <App2 />
    ));


function withNote(note, child) {
    return (
      <WithNotes notes={note}>{child || null}</WithNotes>
    );
}
