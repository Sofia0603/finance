import config from "../config/config";

export class changedTypeUtils {
  static changedType(type){
    let typeHtml = null;

    switch (type){
      case config.types.expense:
        typeHtml = '<span class="text-danger">расход</span>'
        break;

      case config.types.income:
        typeHtml = '<span class="text-success">доход</span>'
        break;

    }
    console.log(typeHtml);
    return typeHtml;

  }
}