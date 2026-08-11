/**
 * Fetch wrapper that never throws and never crashes on a non-JSON response
 * (e.g. an HTML error page from a proxy/500, or a network failure).
 */
export async function safeFetchJson<T = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<{ ok: boolean; status: number; data: T | null; error: string | null }> {
  let res: Response;
  try {
    res = await fetch(input, init);
  } catch {
    return { ok: false, status: 0, data: null, error: 'Network error. Check your connection and try again.' };
  }

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    // Non-JSON response (HTML error page, empty body, etc.)
  }

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      data,
      error: data?.error ?? `Something went wrong (${res.status}). Please try again.`,
    };
  }

  return { ok: true, status: res.status, data, error: null };
}
