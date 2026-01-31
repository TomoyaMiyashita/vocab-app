/**
 * ISO 日付文字列が「今日」（ローカル日付）かどうか
 */
export function isToday(isoDateString: string): boolean {
  const d = new Date(isoDateString);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}
