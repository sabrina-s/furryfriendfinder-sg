function getJWTSecret() {
  const secret = process.env.JWT_TOKEN;
  if (!secret) {
    throw new Error("Missing secrets to sign JWT token");
  }
  return secret;
}

module.exports = {
  secret: getJWTSecret(),
};
