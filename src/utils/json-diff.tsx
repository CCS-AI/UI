import { isEqual } from 'lodash';

export function diff(newObj: any, oldObj: any) {
    removeIds(newObj);
    removeIds(oldObj);
    const result: any = {};
    for (var o1 in newObj) {
        try {
            if (!isEqual(oldObj[o1], newObj[o1])) {
                result[o1] = {
                    new: newObj[o1],
                    old: oldObj[o1] ?? ''
                };
            }
        } catch {}
    }
    for (var o2 in oldObj) {
        if (newObj[o2] !== undefined && !newObj[o2] && isEmptyObject(oldObj[o2]) === false) {
            result[o2] = {
                new: '',
                old: oldObj[o2]
            };
        }
    }
    return result;
}
const isEmptyObject = function (obj: any) {
    var name;
    for (name in obj) {
        return false;
    }
    return true;
};
export function removeIds(obj: any) {
    for (const prop in obj) {
        if (prop.toLowerCase().indexOf('id') !== -1) delete obj[prop];
        else if (typeof obj[prop] === 'object') removeIds(obj[prop]);
    }
}
