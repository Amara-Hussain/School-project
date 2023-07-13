const express = require("express");
const router = express.Router();
const { Timetable } = require("../models/Timetable");

// Get all timetables
router.get("/", async (req, res) => {
  try {
    const timetables = await Timetable.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.send(timetables);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// Get a specific timetable by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const timetable = await Timetable.findOne({
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!timetable) {
      return res.status(404).send("Timetable not found");
    }
    res.send(timetable);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// Create a new timetable
router.post("/", async (req, res) => {
  const { day, subject, classStartTime, classEndTime } = req.body;
  try {
    const timetable = await Timetable.create({
      day,
      subject,
      classStartTime,
      classEndTime,
    });
    res.status(201).send(timetable);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// Update an existing timetable
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { day, subject, classStartTime, classEndTime } = req.body;
  try {
    const updatedRows = await Timetable.update(
      { day, subject, classStartTime, classEndTime },
      { where: { id } }
    );
    if (updatedRows[0] === 0) {
      return res.status(404).send("Timetable not found");
    }
    res.send("Timetable updated successfully");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// Delete a timetable
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const timetable = await Timetable.destroy({ where: { id } });
    if (timetable === 0) {
      return res.status(404).send("Timetable not found");
    }
    res.send("Timetable deleted successfully");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

  // Set the timetable for all subjects in one day
router.post('/set-timetable', async (req, res) => {
    const { day } = req.body;
    const schoolStartTime = new Date(); // Current date and time
    schoolStartTime.setHours(8, 0, 0, 0); // Set school start time to 8:00 AM
    const classDuration = {
      normal: 60, 
      special: 30, 
    };
  
    try {
      // Calculate the number of classes that can be scheduled based on school timings // School timings: 7 hours 15 minutes
      const totalClasses = Math.floor((7 * 60 + 15) / classDuration.normal); 
  
      // Generate the timetable for all subjects
      const subjects = ['Mathematics', 'English', 'Science', 'Urdu', 'Islamiat', 'History','Computer','Biology','Physics','Chemistry','Pak Study','Arabic','Math'];
      const timetable = [];
      let startTime = new Date(schoolStartTime);
  
      for (let i = 0; i < totalClasses; i++) {
        const subject = subjects[i % subjects.length];
        const endTime = new Date(startTime.getTime() + (subject === 'Urdu' || subject === 'Islamiat' ? classDuration.special : classDuration.normal) * 60000);
  
        timetable.push({
          day,
          subject,
          startTime: startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
          endTime: endTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
        });
  
        startTime = new Date(endTime);
      }
  
      res.send(timetable);
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  });
  
  

module.exports = router;
