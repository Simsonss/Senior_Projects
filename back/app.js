const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const app = express();



const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const deviceRouter = require("./routes/api/device");
const groupRouter = require("./routes/api/group");
const MeRouter = require("./routes/api/me");

//router 2
// app.use('/', require('./routes/root'));
// app.use('/register', require('./routes/register'));
// app.use('/auth', require('./routes/auth'));
// app.use('/refresh', require('./routes/refresh'));
// app.use('/logout', require('./routes/logout'));


app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());


// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
// app.use(credentials);
// app.use(cookieParser());
// app.use(verifyJWT);

//routers
app.use("/devices", deviceRouter);
app.use("/groups", groupRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/me", MeRouter);




module.exports = app;
