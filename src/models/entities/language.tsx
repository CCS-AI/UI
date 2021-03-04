export type Language = {
    symbol: string;
    direction: string;
    displayText: string;
};

export const eLanguageDirection = {
    RightToLeft: 'rtl',
    LeftToRight: 'ltr'
};

export const languages: { [identifier: string]: Language } = {
    Hebrew: {
        symbol: 'he',
        direction: eLanguageDirection.RightToLeft,
        displayText: 'עברית'
    },
    Spanish: {
        symbol: 'es',
        direction: eLanguageDirection.LeftToRight,
        displayText: 'Español'
    },
    English: {
        symbol: 'en',
        direction: eLanguageDirection.LeftToRight,
        displayText: 'English'
    }
};
