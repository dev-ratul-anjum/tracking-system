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
  },
  "9030550340826001": {
    status: "Out for delivery",
    date: "2026-04-03",
    time: "09:15:22",
    location: "TORONTO"
  },
  "9030550340826002": {
    status: "Item processed",
    date: "2026-04-02",
    time: "18:45:10",
    location: "VANCOUVER"
  },
  "9030550340826003": {
    status: "Item in transit",
    date: "2026-04-02",
    time: "22:05:24",
    location: "SUDBURY"
  },
  "9030550340826004": {
    status: "Shipment received",
    date: "2026-04-01",
    time: "08:30:00",
    location: "MONTREAL"
  },
  "9030550340826005": {
    status: "Delayed",
    date: "2026-04-03",
    time: "14:20:11",
    location: "OTTAWA"
  },
  "9030550340826006": {
    status: "Item arrived",
    date: "2026-04-02",
    time: "16:12:45",
    location: "WINNIPEG"
  },
  "9030550340826007": {
    status: "Customs clearance",
    date: "2026-04-01",
    time: "11:05:33",
    location: "VANCOUVER"
  },
  "9030550340826008": {
    status: "Item in transit",
    date: "2026-04-03",
    time: "06:55:19",
    location: "QUEBEC"
  },
  "9030550340826009": {
    status: "Delivered",
    date: "2026-04-02",
    time: "13:40:50",
    location: "CALGARY"
  },
  "9030550340826010": {
    status: "Out for delivery",
    date: "2026-04-03",
    time: "10:25:37",
    location: "TORONTO"
  },
  "9030550340826011": {
    status: "Item processed",
    date: "2026-04-02",
    time: "19:10:05",
    location: "HALIFAX"
  },
  "9030550340826012": {
    status: "Shipment info received",
    date: "2026-04-01",
    time: "07:45:55",
    location: "BRAMPTON"
  }
};

app.get("/health", (req, res) => {
  const now = new Date();

  res.status(200).json({
    status: "ok",
    timestamp: now.toLocaleTimeString(),
    message: "Backend is alive!"
  });
});

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