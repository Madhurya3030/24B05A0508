const express = require("express");
const testRoutes = require("./routes/testRoutes");

const app = express();

app.use(express.json());

app.use("/api", testRoutes);

app.listen(3000, () => {
    console.log("Server Started");
});