import moment from "moment";

export function formatDate(
  date?: Date,
  format: string = "DD MMM, YYYY"
): string {
  if (!date) return "";
  return moment(date).format(format);
}
