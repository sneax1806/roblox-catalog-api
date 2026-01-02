const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint test
app.get("/", (req, res) => {
  res.send("API Roblox Catalog OK");
});

// Récupérer des items Roblox
app.get("/items", async (req, res) => {
  try {
    const { cursor } = req.query;

    const response = await axios.get(
      "https://catalog.roblox.com/v1/search/items",
      {
        params: {
          category: "Accessories",
          salesTypeFilter: 1,
          limit: 30,
          cursor: cursor || ""
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Erreur API Roblox" });
  }
});

app.listen(PORT, () => {
  console.log("API lancée sur le port " + PORT);
});
