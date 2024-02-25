export function getUTCDayRange(days: number) {
    var currentDate = new Date();
    var endDate = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()));
    var startDate = new Date(endDate);
    startDate.setUTCDate(startDate.getUTCDate() - days);
    if (isNaN(startDate.getTime())) {
        console.error("Invalid start date after subtraction")
        startDate = new Date();
    }

    return {
        start: startDate.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0]
    }
}