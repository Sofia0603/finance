import {AuthUtils} from "./auth-utils";

export class CheckAccessUtils {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;

    this.init()
  }

  init() {
   const accessData = AuthUtils.getAuthInfo()

    if(accessData.accessToken === null && accessData.refreshToken === null) {
      this.openNewRoute('/login')
      alert('не найдены токены')
    }
  }
}