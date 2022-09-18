import {
  differenceInSeconds,
  format,
  formatDistance,
  isSameDay,
  isSameMonth,
  isSameSecond,
  isValid,
  parse,
  parseISO,
  parseJSON,
  subDays,
} from "date-fns";
import isString from "lodash/isString";

import i18n, { supportedDateLocales } from "./i18n";

type DateType = Date | string;

const getLocale = () => supportedDateLocales[i18n.language] || supportedDateLocales.de!;

export const parsedDate = (date: DateType, local = false) => {
  if (isString(date)) {
    if (local) return parseDateLocal(date);
    // local ? parseISO(date) : parseJSON(date)
    return parseDateUtc(date);
  }

  return date;
};

export const parsedTime = (time: string | Date, reference: Date): Date => {
  try {
    return parsedDate(time);
  } catch {
    let parsedTime = reference;
    let [hour, minute] = time.toString().split(":");
    parsedTime.setHours(parseInt(hour, 10), parseInt(minute, 0));
    return parsedTime;
  }
};

const KNOWN_DATE_FORMATS = [
  "yyyy-MM-dd",
  "dd.MM.yyyy",
  "yyyy-MM-dd'T'HH:mm:ss.SSSSSS",
  "yyyy-MM-dd'T'HH:mm:ss.SSSX",
  "yyyy-MM-dd'T'HH:mm",
];

export const tryParsedDate = (date: string, formats = KNOWN_DATE_FORMATS) => {
  for (let i = 0; i < formats.length; ++i) {
    const rslt = parse(date, formats[i], new Date());

    if (isValid(rslt)) {
      return rslt;
    }
  }

  throw new Error(`Could not parse date: ${date}`);
};

export const parseDateLocal = (date: string) => {
  let rslt = parseISO(date);
  if (isValid(rslt)) {
    return rslt;
  }

  rslt = parse(date, "yyyy-MM-dd", new Date());
  if (isValid(rslt)) {
    return rslt;
  }

  throw new Error(`Unknown date format: ${date}`);
};

export const parseDateUtc = (date: string) => {
  let rslt = parseJSON(date);
  if (isValid(rslt)) {
    return rslt;
  }

  rslt = parse(date, "yyyy-MM-dd", new Date());
  if (isValid(rslt)) {
    return rslt;
  }

  throw new Error(`Unknown date format: ${date}`);
};

export const dateFormat = (date: DateType, formatStr: string | undefined = undefined, local = false) =>
  format(
    parsedDate(date, local),
    formatStr || i18n.t("translation:datetime.date_format", { defaultValue: "d.M.yyyy" }),
    { locale: getLocale() }
  );
export const timeFormat = (date: DateType, formatStr: string | undefined = undefined) =>
  dateFormat(date, formatStr || i18n.t("translation:datetime.time_format", { defaultValue: "H:mm" }));
export const dateTimeFormat = (date: DateType, formatStr: string | undefined = undefined, local = false) =>
  dateFormat(
    date,
    formatStr || i18n.t("translation:datetime.datetime_format", { defaultValue: "d.M.yyyy H:mm" }),
    local
  );

export const detailedDateFormat = (date: DateType) =>
  dateFormat(date, i18n.t("translation:datetime.detailed_date_format", { defaultValue: "EEEE, d. LLLL yyyy" }));
export const detailedDateTimeFormat = (date: DateType) =>
  dateFormat(
    date,
    i18n.t("translation:datetime.detailed_datetime_format", { defaultValue: "EEEE, d. LLLL yyyy, H:mm 'Uhr'" })
  );

export const indexDate = (date: DateType, fromDate = new Date(), local = false) => {
  date = parsedDate(date, local);
  const locale = getLocale();

  if (isSameDay(date, fromDate)) {
    return format(date, i18n.t("translation:datetime.time_format_idx", { defaultValue: "H:mm 'Uhr'" }), { locale });
  } else if (isSameDay(subDays(fromDate, 1), date)) {
    return format(
      date,
      i18n.t("translation:datetime.datetime_format_yesterday_idx", { defaultValue: "'gestern,' H:mm 'Uhr'" }),
      { locale }
    );
  }

  return format(date, i18n.t("translation:datetime.datetime_format_idx", { defaultValue: "d.M.yyyy, H:mm 'Uhr'" }), {
    locale,
  });
};

export const relativeTime = (date: DateType, fromDate = new Date()) =>
  formatDistance(parsedDate(date), fromDate, { locale: getLocale(), addSuffix: true });

export const nearlySimultaneously = (date1: DateType, date2: DateType) =>
  isSameSecond(parsedDate(date1), parsedDate(date2));

export const dateRangeFormatDays = (startDate: Date | string, endDate: Date | string, dateOnEqual: boolean = true) => {
  startDate = parsedDate(startDate);
  endDate = parsedDate(endDate);
  const diff = differenceInSeconds(endDate, startDate);

  if (diff === 0 && dateOnEqual) {
    return dateFormat(startDate);
  }

  if (diff < 86399) {
    return i18n.t("translation:datetime.range", {
      start: timeFormat(
        startDate,
        i18n.t("translation:datetime.range_same_day_start_format", { defaultValue: "H:mm" })
      ),
      stop: dateTimeFormat(
        endDate,
        i18n.t("translation:datetime.range_same_day_stop_format", { defaultValue: "H:mm, d.M.yyyy" })
      ),
    });
  }

  if (diff >= 86399 && diff <= 86400) {
    return dateFormat(startDate);
  }

  if (isSameMonth(startDate, endDate)) {
    return i18n.t("translation:datetime.range", {
      start: dateFormat(
        startDate,
        i18n.t("translation:datetime.range_same_month_start_format", { defaultValue: "H:mm" })
      ),
      stop: dateFormat(
        endDate,
        i18n.t("translation:datetime.range_same_month_stop_format", { defaultValue: "H:mm, d.M.yyyy" })
      ),
    });
  }

  return i18n.t("translation:datetime.range", {
    start: dateFormat(startDate, i18n.t("translation:datetime.range_start_format", { defaultValue: "H:mm" })),
    stop: dateFormat(endDate, i18n.t("translation:datetime.range_stop_format", { defaultValue: "H:mm, d.M.yyyy" })),
  });
};
