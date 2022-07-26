import { css, Global, ThemeProvider } from '@emotion/react'
import { theme } from './theme/theme';
import Survey from './Survey';
import surveyConf from './surveyConf';
import emotionReset from 'emotion-reset';
import Header from './design-system/Header';
import { Flex } from './design-system/Styled';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global 
        styles={css`
          ${emotionReset}
          body {
            font-family: 'Fuzzy Bubbles', cursive;
            font-size: 10px;
          }

          .swiper.swiper-initialized {
            width: 100%;
            height: calc(100vh - 150px);
            @media screen and (max-width: 640px) {
              height: calc(100vh - 230px);
            }
          }
          *, *::after, *::before {
            box-sizing: border-box;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
          }
        `} 
      />
      <Flex flexDirection="column">
        <Header />
        <Survey surveyConf={surveyConf} />
      </Flex>
    </ThemeProvider>
  );
}

export default App;
