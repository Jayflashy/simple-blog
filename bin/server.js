const app  = require("../index")

const DBConnect = require("../src/config/db.config")

const port = process.env.PORT || 8081

const start = async()=>{
    try {
        // database connection
        await DBConnect()
        app.listen(port, ()=>{
            console.log(`Server working on port ${port}...`);
        })
    } catch (error) {
        console.log(error)
    }
}

start()
