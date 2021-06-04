export type questionR = {
    id: string;
    name: string;
    answers: string[];
};

export type Question = {
    id: string;
    name: string;
    questionnaireId: string;
    answers: Array<Answer>;
};

export type Answer = {
    id: string;
    name: string;
    questionId: string;
};

export type Questionnaire = {
    id: string;
    name: string;
    questions: Array<Question>;
};

export type questionnaireResult = Array<questionR>;
