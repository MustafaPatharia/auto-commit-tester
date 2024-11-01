const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory database (replace with a real database in production)
let employees = [
  { id: 1, name: 'John Doe', position: 'Developer' },
  { id: 2, name: 'Jane Smith', position: 'Designer' }
];

// GET - Retrieve all employees
app.get('/api/employees', (req, res) => {
  res.json(employees);
});

// POST - Create a new employee
app.post('/api/employees', (req, res) => {
  const newEmployee = {
    id: employees.length + 1,
    name: req.body.name,
    position: req.body.position
  };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

// PUT - Update an existing employee
app.put('/api/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employeeIndex = employees.findIndex(emp => emp.id === id);

  if (employeeIndex === -1) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  employees[employeeIndex] = {
    ...employees[employeeIndex],
    name: req.body.name || employees[employeeIndex].name,
    position: req.body.position || employees[employeeIndex].position
  };

  res.json(employees[employeeIndex]);
});

// DELETE - Remove an employee
app.delete('/api/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employeeIndex = employees.findIndex(emp => emp.id === id);

  if (employeeIndex === -1) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  const deletedEmployee = employees.splice(employeeIndex, 1);
  res.json(deletedEmployee[0]);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});