import { parseISO, format } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

export class DateService {
  static toUTC(date: Date | string, timezone: string): Date {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return zonedTimeToUtc(dateObj, timezone);
  }

  static toLocal(date: Date | string, timezone: string): Date {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return utcToZonedTime(dateObj, timezone);
  }

  static formatForDateInput(date: Date | string, timezone: string): string {
    const localDate = this.toLocal(date, timezone);
    return format(localDate, 'yyyy-MM-dd');
  }

  static formatForTimeInput(date: Date | string, timezone: string): string {
    const localDate = this.toLocal(date, timezone);
    return format(localDate, 'HH:mm');
  }

  static formatForDisplay(date: Date | string, timezone: string): string {
    const localDate = this.toLocal(date, timezone);
    return format(localDate, 'PPp');
  }

  static combineDateAndTime(date: string, time: string | undefined, timezone: string): Date {
    const dateTimeString = time ? `${date}T${time}` : `${date}T00:00`;
    return this.toUTC(dateTimeString, timezone);
  }
}