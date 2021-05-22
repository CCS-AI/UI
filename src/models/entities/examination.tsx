import { speechAudiometry } from './SP';

export type examinationType = 'AC' | 'AC+MASK' | 'BC' | 'BC+MASK' | 'WEBER' | 'NO_RESPONSE' | 'FF' | 'STENGER';

export type examResult = {
    x: number;
    y: number;
    ear: 'RIGHT' | 'LEFT';
    type: examinationType;
};

export type Examination = {
    id: string;
    pmfId: string;
    createdAt: Date;
    updatedAt: Date;
    info: Array<examResult>;
    speechAudiometry: speechAudiometry;
    patientTestBackground: string;
};
