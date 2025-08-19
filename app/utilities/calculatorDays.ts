import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from "dayjs/plugin/isoWeek";
import weekday from "dayjs/plugin/weekday";
import { DATE_FORMAT } from "../constants";

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.extend(customParseFormat)

function getNextRenderBaseDate(
  dayOfCreate: string,
  daysInRow: number,
  skipDays: number
): string {
  const start = dayjs(dayOfCreate, DATE_FORMAT);
  const today = dayjs();
  const cycleLength = daysInRow + skipDays;

  // начинаем считать с сегодняшнего дня
  let offset = today.diff(start, "day");

  if (offset < 0) offset = 0; // если today раньше dayOfCreate

  while (true) {
    const cycleDay = offset % cycleLength;
    if (cycleDay < daysInRow) {
      return start.add(offset, "day").format(DATE_FORMAT);
    }
    offset++;
  }
}

export default getNextRenderBaseDate
