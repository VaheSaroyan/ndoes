import express from "express";
import path from "path";
import {config} from "dotenv"
import routes from "./routes"


config({path:__dirname + '/.env'})

const app = express();
const PORT = process.env.PORT;

app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'hbs');

app.use("/", routes);





app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server is running on ${PORT}`);
    } else {
        console.log(err);
    }
});
