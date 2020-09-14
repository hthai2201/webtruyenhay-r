export function authHeader() {
  // return authorization header with jwt token
  const token = localStorage.getItem('USER_TOKEN');

  if (token) {
    return { Authorization: 'JWT ' + token };
  }
  return {};
}
