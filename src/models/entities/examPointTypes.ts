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
import { Data } from '../../components/pages/Examination/CreateExamination';

// Point type with Sound Flield or Stenger cannot be with isNoResponse = true
export const earTypes = ['RIGHT', 'LEFT'];
export const examPointTypes = ['AC', 'AC+MASK', 'BC', 'BC+MASK', 'Sound Flield', 'Stenger'];
const stroked_types = ['BC+MASK', 'BC', 'BCL', 'BCL+MASK'];
export type ExamPointTypes = 'AC' | 'AC+MASK' | 'BC' | 'BC+MASK' | 'Sound Flield' | 'Stenger';
export const pointTypeToStyle = (ear: 'RIGHT' | 'LEFT', type: ExamPointTypes) => {
    const color = ear == 'RIGHT' ? 'red' : 'blue';
    const isStrokeDasharray = stroked_types.includes(type);
    const DASH_LINE_SIZE = 3;

    let style: { stroke: string; strokeDasharray?: number } = {
        stroke: color
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
