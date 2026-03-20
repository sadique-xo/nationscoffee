/**
 * IST (Indian Standard Time) utilities.
 *
 * Server-side code on Vercel runs in UTC. These helpers ensure all
 * date grouping, filtering, and hour calculations use IST (UTC+5:30).
 */

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes

/** Shift a UTC Date so that its UTC methods return IST values. */
function shiftToIST(date: Date): Date {
  return new Date(date.getTime() + IST_OFFSET_MS);
}

/** YYYY-MM-DD key in IST for a given date. */
export function toISTDateKey(date: Date): string {
  const ist = shiftToIST(date);
  const y = ist.getUTCFullYear();
  const m = String(ist.getUTCMonth() + 1).padStart(2, "0");
  const d = String(ist.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Hour (0-23) in IST for a given date. */
export function getISTHour(date: Date): number {
  const ist = shiftToIST(date);
  return ist.getUTCHours();
}

/** Get the start of "today" in IST as a UTC ISO string (for DB queries). */
export function istTodayStartUTC(): string {
  const now = new Date();
  const ist = shiftToIST(now);
  // Build IST midnight, then convert back to UTC
  const istMidnight = Date.UTC(
    ist.getUTCFullYear(),
    ist.getUTCMonth(),
    ist.getUTCDate(),
    0, 0, 0, 0
  );
  return new Date(istMidnight - IST_OFFSET_MS).toISOString();
}

/** Get the start of N days ago in IST as a UTC ISO string. */
export function istDaysAgoStartUTC(daysAgo: number): string {
  const now = new Date();
  const ist = shiftToIST(now);
  const startIST = Date.UTC(
    ist.getUTCFullYear(),
    ist.getUTCMonth(),
    ist.getUTCDate() - daysAgo,
    0, 0, 0, 0
  );
  return new Date(startIST - IST_OFFSET_MS).toISOString();
}

/** Get today's YYYY-MM-DD in IST. */
export function istTodayKey(): string {
  return toISTDateKey(new Date());
}
