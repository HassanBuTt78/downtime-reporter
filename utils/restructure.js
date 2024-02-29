const structureRange = (string) => {
    const date = new Date();
    switch (string) {
        case "lasthour":
            date.setHours(date.getHours() - 1);
            return date;
        case "lastday":
            date.setDate(date.getDate() - 1);
            return date;

        case "lastweek":
            date.setDate(date.getDate() - 7);
            return date;

        case "lastmonth":
            date.setMonth(date.getMonth() - 1);
            return date;

        case "lastyear":
            date.setFullYear(date.getFullYear() - 1);
            return date;

        case "alltime":
            return new Date(0);

        default:
            date.setHours(date.getHours() - 1);
            return date;
    }
};

module.exports = {
    structureRange,
};
