import config from "../config/config";
import {AuthUtils} from "./auth-utils";

export class HttpUtils {
  static async request(url, method = "GET", useAuth = true, body = null) {

    let result = {}


    const params = {
      method: method, headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',

      },
    };
     let token = null;

    if(useAuth) {
      token = AuthUtils.getAuthInfo(AuthUtils.accessTokenKey);
      console.log('token из http- ' + token);
      if(token){
        params.headers['x-auth-token'] = token
      }
    }

    if (body) {
      params.body = JSON.stringify(body);
    }

    let response = null
    try {
      response = await fetch(config.api + url, params);

    } catch (e) {
      result.error = true;
      return result
    }


    if (response.status < 200 || response.status >= 300) {
      debugger
      result.error = true;
      if(useAuth && response.status === 401) {
        console.log(response)
        if(!token){
          // 1 токена нет
          console.log('1 токена нет');
          result.redirect = '/login'
        } else {
          console.log('2 токен устарел / невалиден ( надо обновить )');
          // 2 токен устарел / невалиден ( надо обновить )
          const updateTokenResult = await AuthUtils.updateRefreshToken()

          if (updateTokenResult){
            // запрос повторно
            return this.request(url, method, useAuth, body)
          } else {
            result.redirect = '/login'
          }
        }
      }
      return result;

    }
    return await response.json();
  }
}