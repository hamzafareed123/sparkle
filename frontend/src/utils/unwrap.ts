export function unwrap<T>(payload: unknown): T {
  if (
    payload &&
    typeof payload === 'object' &&
    'success' in payload &&
    (payload as { success: boolean }).success &&
    'data' in payload
  ) {
    return (payload as { data: T }).data
  }
  return payload as T
}
