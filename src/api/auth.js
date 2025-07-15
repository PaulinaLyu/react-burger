import { DOMAIN, RESET_PASSWORD_API, REGISTER_API } from "../contants";
import { request } from "../utils";

export function registerUser(user) {
    return request(`${DOMAIN}${REGISTER_API}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ...user })
    });
}

export const resetPassword = (form) => {
    return request(`${DOMAIN}${RESET_PASSWORD_API}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ...form })
    });
}