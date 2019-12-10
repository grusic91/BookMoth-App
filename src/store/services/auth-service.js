// Responsible for token
import * as jwt from "jsonwebtoken";
import * as moment from "moment";

class AuthService {

  tokenKey = "auth_token";

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  decode(token) {
    return jwt.decode(token);
  }

  saveToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  invalidateUser() {
    // remove token from localStorage used for LOGOUT
    localStorage.removeItem("auth_token");
  }

  getExpiration(token) {
    const exp = this.decode(token).exp;
    // expiration time
    return moment.unix(exp);
  }

  getUsername() {
    return this.decode(this.getToken()).username;
  }

  isValid(token) {
    return moment().isBefore(this.getExpiration(token));
  }

  isAuthenticated() {
    const token = this.getToken();
    return (token && this.isValid(token)) ? true : false;
  }

}

export default new AuthService();
