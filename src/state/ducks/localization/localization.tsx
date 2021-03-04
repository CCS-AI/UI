import { Language, languages } from '../../../models/entities/language';
import locals from '../../../localization/localization';
import { ModelConfig } from '@rematch/core';

export type localizationStateType = {
    texts: any;
    currentLanguage: Language;
};

export const localization: ModelConfig<localizationStateType> = {
    state: {
        texts: locals,
        currentLanguage: languages.English
    },
    reducers: {
        changeLanguage(state: localizationStateType, language: Language): localizationStateType {
            return { ...state, currentLanguage: language };
        }
    }
};
