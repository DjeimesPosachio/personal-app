/* eslint-disable prettier/prettier */
export const formatDate = date => {
    return new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
};
