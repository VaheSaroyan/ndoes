// import mysql from "mysql"
// import {config} from "dotenv";
//
// config({path:__dirname + '/../../.env'})







class Model{
    constructor() {
        this.model = {}
        this.result = {name:'valodik'}
        this.table = this.constructor.name.replace('Model','').toLowerCase()
        this.mainQuery = `SELECT * FROM ${this.table} `
        this.query = ''
    }

    where(findElem,value){
        console.log(findElem,value)
        this.query = `WHERE ${findElem} = '${value}'`

        return this
    }
    all(){
        connection.query(`SELECT * FROM ${this.table}`, (err, res) => {
            if (err) throw err;
            this.result = res
        })
        return this.result
    }
    async get(){
        try {
            const res = await connection.query(`${this.mainQuery + this.query}`)

            return  res[0]
        }catch (err){
            throw err;
        }finally {
            // await connection.close();
        }
        // return await withTransaction(connection,async () => {
        //    const res = await connection.query(`${this.mainQuery + this.query}`)
        //     console.log(res);
        // })



    }
}
async function withTransaction( db, callback ) {
    try {
        await db.beginTransaction();
        await callback();
        await db.commit();
    } catch ( err ) {
        await db.rollback();
        throw err;
    } finally {
        // await db.close();
    }
}

module.exports = Model;
