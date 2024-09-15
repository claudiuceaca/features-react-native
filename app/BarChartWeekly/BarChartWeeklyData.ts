import { addDays, startOfYear } from 'date-fns';

type Day = {
    day: Date;
    value: number
}
type Week = Day[]

const startOfYearDate = startOfYear(new Date());

const numberOfWeeks = 7;
const daysInWeek = 7;
export const data: Week[] = [];

for (let weekIndex = 0; weekIndex < numberOfWeeks; weekIndex++) {
    const week = [];
    for (let dayIndex = 0; dayIndex < daysInWeek; dayIndex++) {
        const day = addDays(startOfYearDate, weekIndex * daysInWeek + dayIndex);
        week.push({
            day: day,
            value: Math.random(),
        });
    }
    data.push(week);
}
