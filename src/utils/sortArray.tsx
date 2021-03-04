import moment from 'moment';
export function byNumber<T>(ascending: boolean, getNumber: (object: T) => number) {
    if (ascending)
        return (objectA: T, objectB: T) => {
            const a = getNumber(objectA);
            const b = getNumber(objectB);
            return a - b;
        };
    else
        return (objectA: T, objectB: T) => {
            const a = getNumber(objectA);
            const b = getNumber(objectB);
            return b - a;
        };
}
export function byString<T>(ascending: boolean, getString: (object: T) => string) {
    if (ascending)
        return (objectA: T, objectB: T) => {
            const a = getString(objectA);
            const b = getString(objectB);
            if (a > b) {
                return 1;
            }
            if (b > a) {
                return -1;
            }
            return 0;
        };
    else
        return (objectA: T, objectB: T) => {
            const a = getString(objectA);
            const b = getString(objectB);
            if (a > b) {
                return -1;
            }
            if (b > a) {
                return 1;
            }
            return 0;
        };
}
export function byDate<T>(ascending: boolean, getPropertyTime: (object: T) => Date) {
    if (ascending) return byDateAsc(getPropertyTime);
    else return byDateDesc(getPropertyTime);
}
function byDateAsc<T>(getPropertyTime: (object: T) => Date) {
    return (objectA: T, objectB: T) => {
        let a = getPropertyTime(objectA);
        let b = getPropertyTime(objectB);
        if (!a) {
            return 1;
        }
        if (!b) {
            return -1;
        }
        if (!a.getTime) a = moment(a).toDate();
        if (!b.getTime) b = moment(b).toDate();
        return b.getTime() - a.getTime();
    };
}

function byDateDesc<T>(getPropertyTime: (object: T) => Date) {
    return (objectA: T, objectB: T) => {
        let a = getPropertyTime(objectA);
        let b = getPropertyTime(objectB);
        if (!a) {
            return -1;
        }
        if (!b) {
            return 11;
        }
        if (!a.getTime) a = moment(a).toDate();
        if (!b.getTime) b = moment(b).toDate();
        return a.getTime() - b.getTime();
    };
}
