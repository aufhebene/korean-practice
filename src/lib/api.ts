const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://korean-practice.onrender.com";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.detail || "요청에 실패했습니다.");
  }

  return res.json();
}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

// --- Auth ---

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export async function signup(
  username: string,
  name: string,
  password: string,
): Promise<TokenResponse> {
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ username, name, password }),
  });
}

export async function login(
  username: string,
  password: string,
): Promise<TokenResponse> {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

// --- User Profile ---

export interface UserProgress {
  lessons_completed: number;
  vocabulary_mastered: number;
  grammar_points_learned: number;
}

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  created_at: string;
  last_login: string | null;
  progress: UserProgress | null;
}

export async function getProfile(token: string): Promise<UserProfile> {
  return request("/users/me", {
    headers: authHeaders(token),
  });
}

export async function updateProfile(
  token: string,
  data: { name?: string },
): Promise<UserProfile> {
  return request("/users/me", {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}
