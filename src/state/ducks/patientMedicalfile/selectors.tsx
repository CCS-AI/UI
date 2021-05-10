import { RootState } from '../../../state/store/store';

const patientMedicalFileInfo = (state: RootState) => state.patientMedicalFile.pmfInfo;
export { default as patientMedicalFileSelector } from './selectors';

export default {
    patientMedicalFileInfo
};
