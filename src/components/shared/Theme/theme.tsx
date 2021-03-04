import baseStyled, { ThemedStyledInterface } from 'styled-components';

const theme = {
    basic: {
        white: '#fff'
    },
    colors: {
        primary: '#00B5B9',
        secondary: '#252b4a',
        primaryBlue: '#008ac9'
    }
};

export type themeType = typeof theme;
// Export styled with strongly typed ts - https://github.com/styled-components/styled-components/issues/1589
export const styled = baseStyled as ThemedStyledInterface<themeType>;
export default theme;
