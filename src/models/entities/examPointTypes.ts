import L0Img from './../../static/images/PointTypeImages/0.png';
import L1Img from './../../static/images/PointTypeImages/1.png';
import L2Img from './../../static/images/PointTypeImages/2.png';
import L3Img from './../../static/images/PointTypeImages/3.png';
import R0Img from './../../static/images/PointTypeImages/4.png';
import R1Img from './../../static/images/PointTypeImages/5.png';
import R2Img from './../../static/images/PointTypeImages/6.png';
import R3Img from './../../static/images/PointTypeImages/7.png';

export enum ExamPointTypes {
    L0,
    L1,
    L2,
    L3,
    R0,
    R1,
    R2,
    R3
}

export const pointTypeToStyle = (type: ExamPointTypes) => {
    const styles = {
        0: {
            stroke: 'red'
        },
        1: {
            stroke: 'red',
            strokeDasharray: 3
        },
        2: {
            stroke: 'red'
        },
        3: {
            stroke: 'red'
        },
        4: {
            stroke: 'blue'
        },
        5: {
            stroke: 'blue'
        },
        6: {
            stroke: 'blue'
        },
        7: {
            stroke: 'blue'
        }
    };

    return styles[type];
};

export const pointTypeToImage = (type: ExamPointTypes) => {
    if (type == ExamPointTypes.L0) return L0Img;
    if (type == ExamPointTypes.L1) return L1Img;
    if (type == ExamPointTypes.L2) return L2Img;
    if (type == ExamPointTypes.L3) return L3Img;
    if (type == ExamPointTypes.R0) return R0Img;
    if (type == ExamPointTypes.R1) return R1Img;
    if (type == ExamPointTypes.R2) return R2Img;
    if (type == ExamPointTypes.R3) return R3Img;
};
