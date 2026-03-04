/**
 * Formats a date string into a human-readable relative time string.
 * @param dateString - An ISO date string or a value compatible with the Date constructor.
 * @returns A formatted string like "yesterday: 12:00 am"
 */
export function formatRelativeTime(dateString: string | number | Date): string {
  const target = new Date(dateString);

  // Basic error handling for invalid dates
  if (isNaN(target.getTime())) {
    return "Invalid date";
  }

  const now = new Date();

  // Strip hours/mins to compare "calendar days" accurately
  const targetDateOnly = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Calculate difference in milliseconds, then convert to days
  const diffTime: number = nowDateOnly.getTime() - targetDateOnly.getTime();
  const diffDays: number = Math.round(diffTime / (1000 * 60 * 60 * 24));

  // Format the time part (e.g., 12:00 am)
  const timeStr: string = target.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).toLowerCase();

  let label: string;

  if (diffDays === 0) {
    label = "today";
  } else if (diffDays === 1) {
    label = "yesterday";
  } else if (diffDays < 30) {
    label = `${diffDays} days ago`;
  } else {
    const months = Math.floor(diffDays / 30);
    label = `${months} month${months > 1 ? 's' : ''} ago`;
  }

  return `${label ? label : timeStr}`;
}