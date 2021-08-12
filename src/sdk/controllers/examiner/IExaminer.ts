import { Examiner } from './../../../models/entities/examiner';

export default interface IExaminer {
    registerExaminer: (examiner: Examiner) => void;
    getExaminerByID: (examinerId: string) => Promise<Examiner>;
}
