import { Examination } from './../../../models/entities/examination';
export default interface IExamination {
    postExamination: (examination: Examination) => Promise<any>;
}
