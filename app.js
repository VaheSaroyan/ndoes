import express from "express";
import path from "path";
import {config} from "dotenv"
import routes from "./routes"
import mysql from "mysql";
import util from "util";

config({path:__dirname + '/.env'})
function makeDb( config ) {
    const connection = mysql.createConnection( config );
    return {
        query( sql, args ) {
            return util.promisify( connection.query )
                .call( connection, sql, args );
        },
        close() {
            return util.promisify( connection.end ).call( connection );
        },
        beginTransaction() {
            return util.promisify( connection.beginTransaction )
                .call( connection );
        },
        commit() {
            return util.promisify( connection.commit )
                .call( connection );
        },
        rollback() {
            return util.promisify( connection.rollback )
                .call( connection );
        }
    };
}

global.connection = makeDb({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
})

console.log(process.env.PORT);
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
