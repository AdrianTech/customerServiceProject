const port = process.env.PORT || 7777;
import app from "./server";
import moment from "moment-timezone";
// import emailHandler from "./utils/emailHandler";
moment.locale("en-gb");
moment.tz.setDefault("Europe/Warsaw");

app.listen(port);
//, () => emailHandler.clientChecker()
