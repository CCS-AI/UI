export type sp = {
    Rt: number; // between 0-120
    MaskRt: number; // between 0-120
    Lt: number; // between 0-120
    MaskLt: number; // between 0-120
    SF: string;
};

export type speechAudiometry = {
    SRT_db: sp;
    Disc: {
        Rt: [0, 1];
        Lt: [0, 1];
    };
    dB: sp;
    MCL: sp;
    UCL: sp;
    VDL: {
        Rt: number; // between 0-120
        Lt: number; // between 0-120
    };
};
