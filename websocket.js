const env = require('dotenv');
env.config();
let abc = "http://" + process.env.baseURL + ":" + process.env.PORT
console.log(abc)