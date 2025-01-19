import dayjs, { extend } from "dayjs";
import dayjsDevHelper from "dayjs/plugin/devHelper";
import dayjsTimezone from "dayjs/plugin/timezone";
import dayjsUtc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";

extend(dayjsDevHelper);
extend(dayjsUtc);
extend(dayjsTimezone);
extend(customParseFormat);

export { dayjs };
