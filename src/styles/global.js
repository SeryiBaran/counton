import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
:root {
  font-family: Roboto, Inter, Avenir, Helvetica, Arial, sans-serif;
}
#root{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
`;
