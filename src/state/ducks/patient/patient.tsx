import { ModelConfig } from '@rematch/core';
import { localSDK as client } from '../../../sdk';
import { Patient } from '../../../models/entities/patient';

export type patientsStateType = {
    allPatients?: Patient[];
};

export const patient: ModelConfig<patientsStateType> = {
    state: {},
    reducers: {
        setAllPatients(state: patientsStateType, allPatients: [Patient]): patientsStateType {
            return { ...state, allPatients };
        }
    },
    effects: (dispatch: any) => ({
        async fetchAllPatients() {
            const patients = await client.patients().fetchAllPatients();
            dispatch.patient.setAllPatients(patients);
        },
        async createPatient(p: Patient) {
            const newPaitent = await client.patients().createPatient(p);
        }
    })
};
