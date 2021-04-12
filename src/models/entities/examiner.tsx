import { userInfo } from './user';

export type Examiner = userInfo & {
    licenseNumber: string;
};
