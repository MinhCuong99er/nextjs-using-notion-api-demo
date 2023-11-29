import { serialize, parse } from 'cookie'

const TOKEN_NAME = 'token'

// export const MAX_AGE = 60 * 10 // 10 minutes
// export const MAX_AGE = 60 * 60 * 8; // 8 hours
export const MAX_AGE = 60 * 60 * 24 * 30 * 12 // 1 years

/*
sameSite
  Specifies the boolean or string to be the value for the SameSite Set-Cookie attribute.

  true will set the SameSite attribute to Strict for strict same site enforcement.
  false will not set the SameSite attribute.
  'lax' will set the SameSite attribute to Lax for lax same site enforcement.
  'none' will set the SameSite attribute to None for an explicit cross-site cookie.
  'strict' will set the SameSite attribute to Strict for strict same site enforcement.
*/
export function setTokenCookie(res, token) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  })

  res.setHeader('Set-Cookie', cookie)
}

export function removeTokenCookie(res) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  })

  res.setHeader('Set-Cookie', cookie)
}

export function parseCookies(req) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie
  return parse(cookie || '')
}

export function getTokenCookie(req) {
  const cookies = parseCookies(req)
  return cookies[TOKEN_NAME]
}

export function setTokenCookieClient(token) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  })
  document.cookie = cookie
}

export function getTokenCookieClient() {
  const cookie = document.cookie
  return parse(cookie || '')[TOKEN_NAME]
}

export function removeTokenCookieClient() {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  })

  document.cookie = cookie
}
