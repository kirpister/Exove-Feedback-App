import { authenticate } from "ldap-authentication";

export const auth = async (username: string, password: string) => {
  const options = {
    ldapOpts: {
      url: "ldap://ldap.jumpcloud.com:389",
    },
    userDn: `uid=${username},ou=Users,o=6427e336e50f257fd58e4abd,dc=jumpcloud,dc=com`,
    userPassword: password,
    userSearchBase: "ou=Users,o=6427e336e50f257fd58e4abd,dc=jumpcloud,dc=com",
    usernameAttribute: "uid",
    username: username,
  };

  try {
    const user = await authenticate(options);
    return user;
  } catch (e) {
    throw new Error(`Something went wrong ${e}`);
  }
};
