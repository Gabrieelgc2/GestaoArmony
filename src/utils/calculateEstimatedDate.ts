export default function calculateEstimatedDate(
  measurementDate: Date | null,
  productionDeadline: number | null
): Date | null {
  if (!measurementDate || !productionDeadline) {
    return null;
  }

  const date = new Date(measurementDate);
  date.setDate(date.getDate() + productionDeadline);

  return date;
}