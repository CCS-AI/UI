export const phonePattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/;
export const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*([.]\w{2,3})+$/;
export const rmHtmlTags = /<[^>]*>|&nbsp;/g;
export function numberWithCommas(value: string | number) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
