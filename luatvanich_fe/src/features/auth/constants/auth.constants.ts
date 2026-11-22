export const LOGIN_PATH = "/admin/login";
export const DASHBOARD_PATH = "/admin";
export const SESSION_INDICATOR_COOKIE = "lvi_admin_session";
export const AUTH_CHANNEL_NAME = "lvi_auth_channel";

export const isAuthPath = (pathname: string) => pathname === LOGIN_PATH;
