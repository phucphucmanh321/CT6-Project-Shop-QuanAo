require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//ket noi database
require("./config/db");

//router
const authRoutes = require("./routes/authRoutes");

app.use("/auth",authRoutes);

const userRoutes = require("./routes/userRoutes");

app.use("/users", userRoutes);

const productRoutes = require("./routes/productRoutes");

app.use("/products", productRoutes);



app.get("/", (req, res) => {
  res.json({ message: "API running local 🚀" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
