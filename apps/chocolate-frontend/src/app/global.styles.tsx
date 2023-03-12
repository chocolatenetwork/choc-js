import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

* ,*::before , *::after{
  box-sizing: border-box;
}

img, picture, svg, video {
  display: block;
  max-width: 100%;
}


* {
  margin: 0;
  padding: 0;
}

`;

export default GlobalStyle;
