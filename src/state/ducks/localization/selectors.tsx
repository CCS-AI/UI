import { RootState } from '../../../state/store/store';
import { createSelector } from 'reselect';
import LocalizedStrings from 'localized-strings';

const currentLanguage = (state: RootState) => state.localization.currentLanguage;
const localization = (state: RootState) => state.localization;

const allLocalization = createSelector(localization, currentLanguage, (localization, currentLanguage) => {
    const texts = localization.texts;
    currentLanguage = localization.currentLanguage;
    const localsObject: any = new LocalizedStrings(texts);
    localsObject.setLanguage(currentLanguage.symbol);
    return localsObject;
});

// const loginPage = createSelector(allLocalization, (allLocalization) => {
//     return { ...allLocalization.login };
// });

export { default as localizationSelectors } from './selectors';

export default {
    currentLanguage,
    localization
};
