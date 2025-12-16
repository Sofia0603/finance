import {HttpUtils} from "../../utils/http-utils";

export class CommonPage{
  constructor() {


    this.getCommon().then()
  }


  async getCommon(){

    const result = HttpUtils.request('/operations')
    console.log(result)
  }
}