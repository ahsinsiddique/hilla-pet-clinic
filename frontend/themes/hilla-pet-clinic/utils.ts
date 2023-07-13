import dateFnsFormat from 'date-fns/format';

export const formatDateIso8601 = (dateParts: any): string => {
    if (dateParts == "") return "";
    const date = new Date(dateParts);
    return dateFnsFormat(date, 'yyyy-MM-dd');
};