const port = process.env.PORT || 7777;
import app from "./app";

app.listen(port, () => console.log("Server running..."));
