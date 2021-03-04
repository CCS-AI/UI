import moment from 'moment';
export function combineDateWithTime(d: Date, t: Date) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds());
}
export function getDatesRange(code: string) {
    const range = {
        from: new Date(),
        to: new Date()
    };
    switch (code) {
        case 'LAST_30_DAYS':
            range.from = moment().subtract(30, 'days').toDate();
            break;
        case 'LAST_3_MONTHS':
            range.from = moment().subtract(3, 'months').toDate();
            break;
        case 'LAST_6_MONTHS':
            range.from = moment().subtract(6, 'months').toDate();
            break;
    }
    return range;
}
