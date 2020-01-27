export const AUTH = 'AUTH';

export function auth(user) {
    return { type: AUTH, user: user }
}