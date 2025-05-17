"use client";
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,

  clientSecret: "570f4714-26ce-48b8-80d3-249c36825129",
});





export default keycloak;
