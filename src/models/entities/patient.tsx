export class Patient {
    public id: string;
    public firstName: string;
    public lastName: string;
    public gender: Gender;
    public birth: Date;
    public address: string;
    public phone1: string;
    public phone2: string;
    public email: string;
    public hmo: HMO;
    public organizationId: string;
    public personalId: string;

    constructor(
        firstName: string,
        lastName: string,
        id: string,
        gender: Gender,
        birth: Date,
        address: string,
        phone1: string,
        phone2: string,
        email: string,
        hmo: HMO,
        organizationId: string,
        personalId: string
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
        this.organizationId = organizationId;
        this.personalId = personalId;
    }
}

enum Gender {
    MALE = 1,
    FEMALE
}

enum HMO { //KUPAT HOLIM
    CLALIT = 1,
    MACABI,
    LEUMIT
}
