import { RootState } from '../../../state/store/store';

const patientInfo = (state: RootState) => state.patient.allPatients;
export { default as patientSelector } from './selectors';

export default {
    patientInfo
};
