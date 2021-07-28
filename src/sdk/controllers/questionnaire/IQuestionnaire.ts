import { Questionnaire } from '../../../models/entities/questionnaire';
export default interface IQuestionnaire {
    fetchAllQuestionnaires: () => Promise<Questionnaire[]>;
    getQuestionnaireById: (questionnaireId: string) => Promise<Questionnaire>;
}
