import express from "express";
class TestMid {
  checkSome(req: express.Request, res: express.Response, next: express.NextFunction): void {
    console.log("Works");
    next();
  }
}
export default TestMid;
