const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const musicRoutes = require("./routes/music.routes");
const { music } = require("./controllers/music.controller");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/auth",authRoutes);
app.use("/api/music",musicRoutes);

module.exports = app;