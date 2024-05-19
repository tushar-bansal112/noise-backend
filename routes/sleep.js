const router = require("express").Router(); // Importing Express Router
const fs = require("fs"); // Importing File System module
const path = require("path"); // Importing Path module to handle file paths
let currentId = 1; // Variable to track current ID for new records

const filePath = path.join(__dirname, "../sleep_data/data.json"); // File path for storing sleep records

let records = []; // Array to store sleep records

// Attempt to read existing records from the data file
try {
  const data = fs.readFileSync(filePath, "utf-8");
  if (data) {
    records = JSON.parse(data);
    const maxId = records.reduce((max, record) => Math.max(max, record.id), 0);
    currentId = maxId + 1;
  } else {
    console.warn("data.json is empty.");
  }
} catch (err) {
  console.error(err);
}

// Function to save records to the data file
const saveRecord = () => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(records, null, 2));
  } catch (err) {
    console.error("Error writing to data file:");
  }
};

// POST endpoint to add a new sleep record
router.post("/", (req, res) => {
  const { userId, hours, timestamp } = req.body;
  if (!userId || !hours || !timestamp) {
    return res
      .status(400)
      .json({ error: "userId, hours and timestamp are required " });
  }

  if (typeof hours !== "number") {
    return res.status(400).json({ error: "hours must be a number" });
  }

  const newRecord = { id: currentId++, userId, hours, timestamp };

  // Attempt to add new record to records array
  try {
    records.push(newRecord);
    saveRecord();
    res.status(200).json(newRecord);
  } catch (err) {
    console.error("Error saving record:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET endpoint to retrieve sleep records for a specific user
router.get("/:userId", (req, res) => {
  try {
    const { userId } = req.params;

    const userData = records.filter((x) => x.userId === userId); // Filter records for the specified userId
    if (userData.length === 0) {
      return res.status(404).json({ error: "UserId not found" });
    }

    userData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // Sort user data by timestamp

    res.json(userData);
  } catch (err) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// DELETE endpoint to delete a sleep record by ID
router.delete("/:recordId", (req, res) => {
  try {
    const { recordId } = req.params;

    const id = parseInt(recordId);

    const index = records.findIndex((record) => record.id === id); // Find index of record with specified ID

    if (index === -1) {
      return res.status(404).json({ error: "Record not found" });
    }
    records.splice(index, 1); // Remove record from records array
    saveRecord();

    res.status(200).json({ success: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting record:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

module.exports = router;
