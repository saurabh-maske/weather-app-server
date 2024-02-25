export function getUTCDayRange(days) {
    console.log(days)
    const endDate = new Date(); // Current date
    const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000));
console.log(startDate)
    // Format dates
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    return {
        start: formattedStartDate,
        end: formattedEndDate
    };
}

function formatDate(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let day = date.getDate();
    day = day < 10 ? '0' + day : day;
    return `${year}-${month}-${day}`;
}