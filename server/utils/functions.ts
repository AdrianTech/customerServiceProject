import { IServices } from "../types/types";
class Functions {
  public sorted(arr: Array<IServices>) {
    return arr.sort((a: any, b: any) => <any>new Date(a.finishTime) - <any>new Date(b.finishTime));
  }
}

const functions = new Functions();
export default functions;
