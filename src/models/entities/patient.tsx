export class Patient {
    firstName: string;
    lastName: string;
    id: string;
    gender: Gender;
    birth: string;
    address: string;
    phone1: string;
    phone2: string;
    email: string;
    hmo: HMO;
    organization: string;

    constructor(
        firstName: string,
        lastName: string,
        id: string,
        gender: Gender,
        birth: string,
        address: string,
        phone1: string,
        phone2: string,
        email: string,
        hmo: HMO,
        organization: string
    ) {
        this.firstName = firstName;
        this.address = address;
        this.lastName = lastName;
        this.id = id;
        this.gender = gender;
        this.birth = birth;
        this.phone1 = phone1;
        this.phone2 = phone2;
        this.email = email;
        this.hmo = hmo;
        this.organization = organization;
    }
}

export enum Gender {
    MALE = 1,
    FEMALE
}

export enum HMO {
    CLALIT = 1,
    MACABI,
    LEUMIT
}
