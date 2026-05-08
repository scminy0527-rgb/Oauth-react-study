import { loginPost, securePost } from "./http";

const AUTH_BASE = "/auth";

// 로그인: POST /api/auth/login → 성공 시 서버가 쿠키에 JWT 발급
export const loginAuth = (data) => loginPost(`${AUTH_BASE}/login`, data);

// 토큰 갱신: POST /api/auth/refresh → 쿠키의 refreshToken으로 새 accessToken 발급
export const refreshToken = () => securePost(`${AUTH_BASE}/refresh`);
