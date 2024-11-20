/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const app = express(); // Initialize express instance

const { PORT } = require("./constants");

// Import Routes
const authRoutes = require("./routes/auth");
app.use("/apii", authRoutes);

// Enable CORS
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

app.get("/api", (req, res) => {
  res.json({ fruits: ["apple", "banana", "orange", "strawberry"] });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});

// app.listen(8080, () => {
//   console.log("Server started on port 8080");
// });
