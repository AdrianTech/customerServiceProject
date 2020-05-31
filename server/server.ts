const port = process.env.PORT || 7777;
import app from "./app";
import moment from "moment-timezone";
moment.locale("en-gb");
moment.tz.setDefault("Europe/Warsaw");

app.listen(port, () => console.log("Server running..."));
