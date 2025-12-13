import {AuthUtils} from "./auth-utils";

export class CheckAccessUtils {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;

    this.init()
  }

  init() {

   const accessData = AuthUtils.getAuthInfo()

    if(accessData.accessToken !== undefined && accessData.refreshToken !== undefined ) {
      this.openNewRoute('/login')
      alert('не найдены токены')
    }
  }

}