export type QuestionR = {
    id: string;
    name: string;
    answers: string[];
};

export type QuestionnaireResult = Array<QuestionR>;
