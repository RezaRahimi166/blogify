export default function setCookieOnReq(cookies) {
  const accesToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");

  const options = {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: `${accesToken?.name}=${accesToken?.value}; ${refreshToken?.name}=${refreshToken?.value}`,
    },
  };
  return options;
}
