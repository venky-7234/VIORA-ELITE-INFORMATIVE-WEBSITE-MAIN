/**
 * Viora Elite – Public API Service
 *
 * This module handles public-facing API calls that do NOT require
 * authentication. Website application submissions use this service,
 * not a shared axios client with an auth interceptor.
 */

const API_BASE_URL = '/api';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface WebsiteApplicationPayload {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  profession: string;
  organization: string;
  linkedin: string;
  instagram: string;
  applicationMessage: string;
  confirmed: true;
  source: 'WEBSITE';
}

export interface ApiError {
  message: string;
  isDuplicate?: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const isDuplicate =
      response.status === 409 ||
      (typeof data?.message === 'string' &&
        data.message.toLowerCase().includes('already submitted'));

    const err: ApiError = {
      message: data?.message ?? 'An unexpected error occurred.',
      isDuplicate,
    };
    throw err;
  }

  return data as T;
}

// ── Public API Functions ───────────────────────────────────────────────────────

/**
 * Submit a Viora Elite website application.
 * Contract: source = "WEBSITE", no eventId sent.
 */
export async function submitWebsiteApplication(
  payload: WebsiteApplicationPayload,
): Promise<void> {
  await postJson<unknown>('/applications', payload);
}
