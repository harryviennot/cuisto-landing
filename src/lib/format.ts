/**
 * Formatting utilities
 */

interface TimeFormatTranslations {
  days?: string;
  day?: string;
  hours?: string;
  hour?: string;
  minutes?: string;
  minute?: string;
}

/**
 * Format minutes into a human-readable duration string
 * e.g., 90 -> "1h 30min", 1500 -> "1d 1h", 45 -> "45min"
 */
export function formatDuration(
  totalMinutes: number,
  translations?: TimeFormatTranslations
): string {
  if (totalMinutes <= 0) return "";

  const t = {
    days: translations?.days ?? "d",
    day: translations?.day ?? "d",
    hours: translations?.hours ?? "h",
    hour: translations?.hour ?? "h",
    minutes: translations?.minutes ?? "min",
    minute: translations?.minute ?? "min",
  };

  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;

  const parts: string[] = [];

  if (days > 0) {
    parts.push(`${days}${days === 1 ? t.day : t.days}`);
  }

  if (hours > 0) {
    parts.push(`${hours}${hours === 1 ? t.hour : t.hours}`);
  }

  // Only show minutes if no days, or if there are remaining minutes with hours
  if (minutes > 0 && days === 0) {
    parts.push(`${minutes}${minutes === 1 ? t.minute : t.minutes}`);
  }

  // If only days and no hours/minutes shown, still show 0h for clarity
  if (days > 0 && hours === 0 && minutes === 0) {
    // Just show days
  }

  return parts.join(" ") || `0${t.minutes}`;
}

/**
 * Format minutes into a compact duration string for cards
 * e.g., 90 -> "1h 30m", 1500 -> "1d 1h", 45 -> "45m"
 */
export function formatDurationCompact(totalMinutes: number): string {
  if (totalMinutes <= 0) return "";

  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;

  const parts: string[] = [];

  if (days > 0) {
    parts.push(`${days}d`);
  }

  if (hours > 0) {
    parts.push(`${hours}h`);
  }

  // Only show minutes if no days, or if there are remaining minutes
  if (minutes > 0 && days === 0) {
    parts.push(`${minutes}m`);
  }

  return parts.join(" ") || "0m";
}
