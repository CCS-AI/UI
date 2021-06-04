export type question = {
    name: string;
    answers: string[];
};
export type Questionnaire = {
    id: string;
    name: string;
    questions: Array<question>;
};

export type questionnaireResult = Array<question>;
