export const auth0Config = {
  domain: process.env.AUTH0_DOMAIN ?? "",
  clientId: process.env.AUTH0_CLIENT_ID ?? "",
  clientSecret: process.env.AUTH0_CLIENT_SECRET ?? "",
  redirectUri: process.env.AUTH0_REDIRECT_URI ?? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
  audience: process.env.AUTH0_AUDIENCE ?? "",
};

export function getAuth0LoginUrl(state?: string): string {
  const params = new URLSearchParams({
    client_id: auth0Config.clientId,
    redirect_uri: auth0Config.redirectUri,
    response_type: "code",
    scope: "openid profile email",
    ...(state && { state }),
    ...(auth0Config.audience && { audience: auth0Config.audience }),
  });
  return `https://${auth0Config.domain}/authorize?${params.toString()}`;
}
