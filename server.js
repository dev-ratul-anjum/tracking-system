const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// 👉 Fake database (for now)
const fakeTrackingData = {
  "9030550340824568": {
    status: "Item in transit",
    date: "2026-04-02",
    time: "07:27:02",
    location: "EDMONTON"
  },
  "9030550340825565": {
    status: "Delivered",
    date: "2026-04-01",
    time: "12:10:00",
    location: "CALGARY"
  }
};

// 👉 Route
app.get("/track/:id", (req, res) => {
  const { id } = req.params;

  const data = fakeTrackingData[id];

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Tracking ID not found"
    });
  }

  res.json({
    success: true,
    id,
    ...data
  });
});

app.get("/track", (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.json({ success: false, message: "URL missing" });
  }

  // 👉 ID extract (last part)
  const id = url.split("/").pop();

  const data = fakeTrackingData[id];

  if (!data) {
    return res.json({ success: false, message: "Tracking not found" });
  }

  res.json({
    success: true,
    id,
    ...data
  });
});

// 👉 Server start
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});