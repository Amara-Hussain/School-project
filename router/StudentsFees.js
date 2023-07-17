const express = require("express");
const router = express.Router();
const { StudentFees, validate } = require("../models/StudentFees");
const { Student } = require("../models/Student");


// GET /student-fees - Retrieve all student fees records
router.get('/', async (req, res) => {
  try {
    const studentFees = await StudentFees.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.send(studentFees);
  } catch (error) {
    console.error('Error retrieving student fees:', error);
    res.status(500).send('Internal server error');
  }
});

// GET / student-fees with student record 
router.get('/StudentFees', async (req, res) => {
  try {
    const studentFees = await StudentFees.findAll({
      include: {
        model: Student,
        as: 'student_link_with_fees',
        attributes:{
          exclude:['createdAt', 'updatedAt']
        }
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt','student_id','roll_no'], // Exclude the specified fields from the TeacherSalary model
      },
    });
    res.send(studentFees);
  } catch (error) {
    console.error('Error retrieving student fees:', error);
    res.status(500).send('Internal server error');
  }
});

// POST /student-fees - Create a new student fees record
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const student = await Student.findOne({ where: { id: req.body.student_id } });
    if (!student) return res.status(404).send("Student not found");

    const studentFees = await StudentFees.create({
      admin: req.body.admin,
      student_name: req.body.student_name,
      classname: req.body.classname,
      roll_no: req.body.roll_no,
      month_name: req.body.month_name,
      year: req.body.year,
      monthly_fees: req.body.monthly_fees,
      hostel_fees: req.body.hostel_fees,
      laboratory_fees: req.body.laboratory_fees,
      computer_fees: req.body.computer_fees,
      exam_fees: req.body.exam_fees,
      student_id: req.body.student_id,
    });

    res.status(201).send(studentFees);
  } catch (error) {
    console.error("Error creating student fees:", error);
    res.status(500).send("Internal server error");
  }
});



// PUT /student-fees/:id - Update a student fees record by ID
router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const studentFees = await StudentFees.findOne({ where: { id: req.params.id } });
    if (!studentFees) return res.status(404).send("Student fees not found");

    const student = await Student.findOne({ where: { id: req.body.student_id } });
    if (!student) return res.status(404).send("Student not found");

    await studentFees.update({
      admin: req.body.admin,
      student_name: req.body.student_name,
      classname: req.body.classname,
      roll_no: req.body.roll_no,
      month_name: req.body.month_name,
      year: req.body.year,
      monthly_fees: req.body.monthly_fees,
      hostel_fees: req.body.hostel_fees,
      laboratory_fees: req.body.laboratory_fees,
      computer_fees: req.body.computer_fees,
      exam_fees: req.body.exam_fees,
      student_id: req.body.student_id,
    });

    res.send(studentFees);
  } catch (error) {
    console.error("Error updating student fees:", error);
    res.status(500).send("Internal server error");
  }
});

// DELETE /student-fees/:id - Delete a student fees record by ID
router.delete("/:id", async (req, res) => {
  try {
    const studentFees = await StudentFees.findOne({ where: { id: req.params.id } });
    if (!studentFees) return res.status(404).send("Student fees not found");

    await studentFees.destroy();

    res.send("Student fees deleted successfully");
  } catch (error) {
    console.error("Error deleting student fees:", error);
    res.status(500).send("Internal server error");
  }
});


module.exports = router;
