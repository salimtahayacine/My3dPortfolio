export class DateUtils {
  static formatDate(date: Date | undefined, locale: string = 'fr-FR'): string {
    if (!date) return '';
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'short' });
  }
}
