const app=require('./index');
require('dotenv').config();
const port= process.env.PORT|| 8080
app.listen(port, () => {
    console.log(`Example app listening on port at http://localhost:${port}`)
  })
