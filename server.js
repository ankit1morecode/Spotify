const app = require("./src/app");
const connectDB = require("./src/db/db");
require("dotenv").config();

connectDB();

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})