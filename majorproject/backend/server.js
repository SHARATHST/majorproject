const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require("./middleware/error");
require("dotenv").config({ path: "./config.env" });



const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

const cors = require('cors');

app.use(cors());
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

 
app.get("/", (req, res, next) => {
  res.send("Api running");
});

app.use("/api/auth/student", require("./routes/student.auth"));
app.use("/api/private/student", require("./routes/student.private"));


app.use("/api/auth/teacher", require("./routes/teacher.auth"));
app.use("/api/private/teacher", require("./routes/teacher.private"));

app.use("/api/auth/admin", require("./routes/admin.auth"));
app.use("/api/private/admin", require("./routes/admin.private"));

app.use("/subject", require("./routes/subject.route"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
