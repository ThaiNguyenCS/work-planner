import { format } from "date-fns";

const dayMapping = {
    0: { fullForm: "Sunday", halfForm: "Sun" },
    1: { fullForm: "Monday", halfForm: "Mon" },
    2: { fullForm: "Tuesday", halfForm: "Tue" },
    3: { fullForm: "Wednesday", halfForm: "Wed" },
    4: { fullForm: "Thursday", halfForm: "Thu" },
    5: { fullForm: "Friday", halfForm: "Fri" },
    6: { fullForm: "Saturday", halfForm: "Sat" },
};

function getDayStr(dayIdx, option = "half") {
    if (dayIdx >= 0 && dayIdx <= 6) return dayMapping[dayIdx][`${option}Form`];
    return "Invalid dayIdx";
}

function getOnlyDate(date) {
    let temp = new Date(date);
    return format(temp, "yyyy-MM-dd");
}

export { getDayStr, getOnlyDate };
