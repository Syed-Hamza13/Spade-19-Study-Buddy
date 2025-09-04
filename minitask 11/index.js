const express = require("express");
const mongoose = require("mongoose");
const studentRoutes = require("./studentRoutes");

const app = express();
app.use(express.json()); // JSON body parse karega

// ✅ MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/studentDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

// Routes
app.use("/api/students", studentRoutes);

// Server Start
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
