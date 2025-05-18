import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  // const redirect_path = searchParams.get('redirect') || '/';

  const cookieStore = await cookies();
  const redirect_path = cookieStore.get("redirect_path")?.value || "/";

  const res = await fetch("http://localhost:4200/api/auth/token", {
    method: "POST",
    body: JSON.stringify({ code }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Token exchange failed" }), {
      status: 500,
    });
  }

  const data = await res.json();
  const {
    access_token,
    refresh_token,
    id_token,
    expires_in,
    refresh_expires_in,
  } = data;
  // console.log(data);
  const { sub, email, name, realm_access } = jwtDecode(access_token);

  // console.log(userData);

  // const user = {
  //   email,name,role:realm_access.roles,id:sub
  // }
  // localStorage.setItem("user",JSON.stringify({email,name,role:realm_access.roles,id:sub}))

  // const cookieStore = await cookies();

  cookieStore.set("access_token", access_token, {
    httpOnly: false,
    secure: true,
    sameSite: "lax",
    path: "/",
    // expires: "expires_in",
  });

  cookieStore.set("refresh_token", refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    // expires: refresh_expires_in,
  });
  cookieStore.set(
    "user",
    JSON.stringify({ email, name, role: realm_access.roles, id: sub }),
    {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      path: "/",
      // expires: expires_in,
    }
  );

  return Response.redirect(`${request.nextUrl.origin}${redirect_path}`);
}
