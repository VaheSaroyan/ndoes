import mysql from "mysql"

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"ewallet"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
})


class Model{
    constructor() {
        this.model = {}
        this.result = null
    }

    where(findElem,value){
        this.model = {[findElem]:value}
        return this
    }

    async get(){
         await con.query("SELECT * FROM users WHERE name = 'Vahe Saoyans'",(err,res) => {
           if (err) throw err;
           this.result = res
       })
        return this.result
    }
}

module.exports = Model;
