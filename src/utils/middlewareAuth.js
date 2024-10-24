export async function middlewareAuth(req) {
  const accesToken = req.cookies.get("accessToken");
  const refreshToken = req.cookies.get("refreshToken");

  const options = {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: `${accesToken?.name}=${accesToken?.value}; ${refreshToken?.name}=${refreshToken?.value}`,
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`,
    options
  );

  const { data } = await res.json();
  const { user } = data || {};
  return user;
}
