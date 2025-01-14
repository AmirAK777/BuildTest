export interface AuthenticationToken {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
}
export interface LoginUserRequest {
    user: LoginUser;
}
export interface LoginUser {
    email: string;
    password: string;
}
