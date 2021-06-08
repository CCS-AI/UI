import AC_IMG from './../../static/images/PointTypeImages/AC.jpeg';
import AC_MASK_IMG from './../../static/images/PointTypeImages/AC+MASK.jpeg';
import BC_IMG from './../../static/images/PointTypeImages/BC.jpeg';
import BC_MASK_IMG from './../../static/images/PointTypeImages/BC+MASK.jpeg';
import ACL_IMG from './../../static/images/PointTypeImages/ACL.jpeg';
import ACL_MASK_IMG from './../../static/images/PointTypeImages/ACL+MASK.jpeg';
import SF_IMG from './../../static/images/PointTypeImages/SF.jpeg';
import SFL_IMG from './../../static/images/PointTypeImages/SFL.jpeg';
import BCL_IMG from './../../static/images/PointTypeImages/BCL.jpeg';
import BCL_MASK_IMG from './../../static/images/PointTypeImages/BCL+MASK.jpeg';
import ST_IMG from './../../static/images/PointTypeImages/ST.jpeg';
import STL_IMG from './../../static/images/PointTypeImages/STL.jpeg';
import AC_MASK_NO_RES from './../../static/images/PointTypeImages/AC+MASK_NO_RES.jpeg';
import AC_NO_RES from './../../static/images/PointTypeImages/AC_NO_RES.jpeg';
import ACL_NO_RES from './../../static/images/PointTypeImages/ACL_NO_RES.jpeg';
import BCL_NO_RES from './../../static/images/PointTypeImages/BCL_NO_RES.jpeg';
import ACL_MASK_NO_RES from './../../static/images/PointTypeImages/ACL_MASK_NO_RES.png';
import BC_NO_RES from './../../static/images/PointTypeImages/BC_NO_RES.png';
import BC_MASK_NO_RES from './../../static/images/PointTypeImages/BC_MASK_NO_RES.png';
import BCL_MASK_NO_RES from './../../static/images/PointTypeImages/BCL_MASK_NO_RES.png';
import { Data } from '../../components/pages/Examination/CreateExamination';

// Point type with Sound Flield or Stenger cannot be with isNoResponse = true
export const earTypes = ['RIGHT', 'LEFT'];
export const examPointTypes = [
    'AC',
    'AC+MASK',
    'BC',
    'BC+MASK',
    'Sound Flield',
    'Stenger',
    'AC_NO_RES',
    'AC+MASK_NO_RES',
    'BC_NO_RES',
    'BC+MASK_NO_RES'
];
const stroked_types = ['BC+MASK', 'BC', 'BCL', 'BCL+MASK'];
export const NO_RES_SUFFIX = '_NO_RES';
export type ExamPointTypes =
    | 'AC'
    | 'AC+MASK'
    | 'BC'
    | 'BC+MASK'
    | 'Sound Flield'
    | 'Stenger'
    | 'AC_NO_RES'
    | 'AC+MASK_NO_RES'
    | 'BC_NO_RES'
    | 'BC+MASK_NO_RES';
export const noResTypes = ['AC', 'AC+MASK', 'BC', 'BC+MASK'];
export const pointTypeToStyle = (ear: 'RIGHT' | 'LEFT', type: ExamPointTypes) => {
    const color = ear == 'RIGHT' ? 'red' : 'blue';
    const isStrokeDasharray = stroked_types.includes(type);
    const DASH_LINE_SIZE = 3;

    let style: { stroke: string; strokeDasharray?: number; strokeWidth: number } = {
        stroke: color,
        strokeWidth: 1
    };

    if (isStrokeDasharray) style['strokeDasharray'] = DASH_LINE_SIZE;

    return style;
};

export const pointToImage = (type: ExamPointTypes, ear: 'RIGHT' | 'LEFT', isNoResponse = false) => {
    if (!isNoResponse) {
        if (type == 'AC' && ear == 'RIGHT') return AC_IMG;
        if (type == 'AC+MASK' && ear == 'RIGHT') return AC_MASK_IMG;
        if (type == 'AC' && ear == 'LEFT') return ACL_IMG;
        if (type == 'AC+MASK' && ear == 'LEFT') return ACL_MASK_IMG;
        if (type == 'BC' && ear == 'RIGHT') return BC_IMG;
        if (type == 'BC+MASK' && ear == 'RIGHT') return BC_MASK_IMG;
        if (type == 'BC' && ear == 'LEFT') return BCL_IMG;
        if (type == 'BC+MASK' && ear == 'LEFT') return BCL_MASK_IMG;
        if (type == 'Sound Flield' && ear == 'RIGHT') return SF_IMG;
        if (type == 'Stenger' && ear == 'RIGHT') return ST_IMG;
        if (type == 'Sound Flield' && ear == 'LEFT') return SFL_IMG;
        if (type == 'Stenger' && ear == 'LEFT') return STL_IMG;
    } else {
        if (type == 'AC_NO_RES' && ear == 'RIGHT') return AC_NO_RES;
        if (type == 'AC_NO_RES' && ear == 'LEFT') return ACL_NO_RES;
        if (type == 'AC+MASK_NO_RES' && ear == 'RIGHT') return AC_MASK_NO_RES;
        if (type == 'AC+MASK_NO_RES' && ear == 'LEFT') return ACL_MASK_NO_RES;
        if (type == 'BC_NO_RES' && ear == 'RIGHT') return BC_NO_RES;
        if (type == 'BC_NO_RES' && ear == 'LEFT') return BCL_NO_RES;
        if (type == 'BC+MASK_NO_RES' && ear == 'RIGHT') return BC_MASK_NO_RES;
        if (type == 'BC+MASK_NO_RES' && ear == 'LEFT') return BCL_MASK_NO_RES;
        return AC_IMG;
    }
};

export const getDevelopedType = (type: ExamPointTypes, ear: 'RIGHT' | 'LEFT') => {
    return 'None';
};

export const getBaseType = (type: ExamPointTypes, ear: 'RIGHT' | 'LEFT') => {
    console.log(type, ear);
    if (type == 'AC+MASK' && ear == 'RIGHT') return 'AC';
    if (type == 'AC+MASK' && ear == 'LEFT') return 'AC';
    if (type == 'BC' && ear == 'RIGHT') return 'BC+MASK';
    if (type == 'BC' && ear == 'LEFT') return 'BC+MASK';
    return 'None';
};

export const typeWithNoRes = (type: ExamPointTypes) => {
    if (!noResTypes.includes(type)) throw new Error('Invalid type.');

    if (type == 'AC') return 'AC_NO_RES';
    else if (type == 'AC+MASK') return 'AC+MASK_NO_RES';
    else if (type == 'BC') return 'BC_NO_RES';
    else if (type == 'BC+MASK') return 'BC+MASK_NO_RES';

    throw new Error('Invalid type.');
};
