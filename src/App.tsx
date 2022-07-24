import React from 'react';
import { css, Global, ThemeProvider } from '@emotion/react'
import { theme } from './theme/theme';
import Survey from './Survey';
import surveyConf from './surveyConf';
import emotionReset from 'emotion-reset';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global 
        styles={css`
          ${emotionReset}

          *, *::after, *::before {
            box-sizing: border-box;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
          }
        `} 
      />
      <Survey surveyConf={surveyConf} />
    </ThemeProvider>
  );
}

export default App;
