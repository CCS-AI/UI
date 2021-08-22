import { ModelConfig } from '@rematch/core';
import { localSDK as client } from '../../../sdk';
import { Patient } from '../../../models/entities/patient';
import { Filter } from '../../../models/entities/filter';

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
        async fetchAllPatients(filter: Filter) {
            const patients = await client.patients().fetchAllPatients(filter);
            dispatch.patient.setAllPatients(patients);
        },
        async createPatient(p: Patient) {
            const newPaitent = await client.patients().createPatient(p);
            return true;
        }
    })
};
