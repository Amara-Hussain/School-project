const express = require("express");
const router = express.Router();
const { TeacherSalary } = require("../models/TeacherSalary");
const { Teacher } = require("../models/Teacher");

// Get teacher's salary if available
// router.get("/teachers", async (req, res) => {
//   try {
//     const teacher = await Teacher.findAll({
//       // where: { id: req.params.id },
//       attributes: { exclude: ["createdAt", "updatedAt"] },
//     });
//     if (!teacher) {
//       return res.status(404).send("Teacher not found");
//     }

//     const salary = await TeacherSalary.findAll({
//       // where: { teacherId: req.params.id },
//       attributes: { exclude: ["createdAt", "updatedAt"] },

//     });
//     if (!salary) {
//       return res.send("Teacher does not have a salary record");
//     }

//     res.send(salary);
//   } catch (error) {
//     console.error("Error retrieving teacher salary:", error);
//     res.status(500).send("Internal server error");
//   }
// });

router.get('/', async (req, res) => {
  try {
    const teacherSalaries = await TeacherSalary.findAll({
      include: {
        model: Teacher,
        as: 'teacher_link_with_salary',
        attributes: ['id','teacher_name'], // Include only the teacher_name attribute from the Teacher model
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt','teacher_name','teacherId'], // Exclude the specified fields from the TeacherSalary model
      },
    });
    res.send(teacherSalaries);
  } catch (error) {
    console.error('Error retrieving teacher salaries:', error);
    res.status(500).send('Internal server error');
  }
});


// Create teacher's salary
router.post("/teachers/:id/salary", async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ where: { id: req.params.id } });
    if (!teacher) {
      return res.status(404).send("Teacher not found");
    }

    const salary = await TeacherSalary.create({
      admin: req.body.admin,
      teacher_name: teacher.teacher_name,
      teacherId: teacher.id,
      salaryForTheYear: req.body.salaryForTheYear,
      salaryForTheMonth: req.body.salaryForTheMonth,
      salaryAmount: req.body.salaryAmount,
    });

    res.status(201).send(salary);
  } catch (error) {
    console.error("Error creating teacher salary:", error);
    res.status(500).send("Internal server error");
  }
});

// Update teacher's salary
router.put("/teachers/:id/salary", async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ where: { id: req.params.id } });
    if (!teacher) {
      return res.status(404).send("Teacher not found");
    }

    const salary = await TeacherSalary.findOne({
      where: { teacherId: req.params.id },
    });
    if (!salary) {
      return res.send("Teacher does not have a salary record");
    }

    await salary.update({
      admin: req.body.admin || salary.admin,
      teacher_name: teacher.teacher_name,
      teacherId: teacher.id,
      salaryForTheYear: req.body.salaryForTheYear || salary.salaryForTheYear,
      salaryForTheMonth: req.body.salaryForTheMonth || salary.salaryForTheMonth,
      salaryAmount: req.body.salaryAmount || salary.salaryAmount,
    });

    res.send(salary);
  } catch (error) {
    console.error("Error updating teacher salary:", error);
    res.status(500).send("Internal server error");
  }
});

// Delete teacher's salary
router.delete("/teachers/:id/salary", async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ where: { id: req.params.id } });
    if (!teacher) {
      return res.status(404).send("Teacher not found");
    }

    const salary = await TeacherSalary.findOne({
      where: { teacherId: req.params.id },
    });
    if (!salary) {
      return res.send("Teacher does not have a salary record");
    }

    await salary.destroy();

    res.send("Teacher salary deleted");
  } catch (error) {
    console.error("Error deleting teacher salary:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
