const express = require('express');
const app = express();
const path = require('path');
const database = require('./utility/sql');
const port = 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
const blogRoutes = require('./routes/blogRoutes');
app.use('/blogs',blogRoutes);
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','product.html'));
});
database.sync({ force: false }).then(() => {
    console.log("Database synced");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}).catch((err) => {
    console.error("Error syncing database:", err);
});
