require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontend')));

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'student_portal',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') console.error('Database connection was closed.');
    if (err.code === 'ER_CON_COUNT_ERROR') console.error('Database has too many connections.');
    if (err.code === 'ER_ACCESS_DENIED_ERROR') console.error('Database access was denied.');
  } else {
    console.log('✓ Database connected successfully');
    connection.release();
  }
});

// Initialize Database Tables
const initDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        rollNo VARCHAR(50) NOT NULL UNIQUE,
        batch VARCHAR(50) NOT NULL,
        course VARCHAR(100) NOT NULL,
        contact VARCHAR(20) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    connection.release();
    console.log('✓ Database table initialized');
  } catch (error) {
    console.error('✗ Database init error:', error.message);
    process.exit(1);
  }
};

// Initialize database on startup
initDatabase();

// =====================
// API ENDPOINTS
// =====================

// GET all students
app.get('/api/students', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [students] = await connection.execute('SELECT * FROM students ORDER BY id DESC');
    connection.release();
    res.json({ 
      success: true, 
      data: students 
    });
  } catch (error) {
    console.error('GET error:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Error fetching students',
      message: error.message 
    });
  }
});

// GET single student by ID
app.get('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  
  if (!id || isNaN(id)) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid student ID' 
    });
  }

  try {
    const connection = await pool.getConnection();
    const [results] = await connection.execute('SELECT * FROM students WHERE id = ?', [id]);
    connection.release();
    
    if (results.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Student not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: results[0] 
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error fetching student',
      message: error.message 
    });
  }
});

// POST - Create new student
app.post('/api/students', async (req, res) => {
  const { name, rollNo, batch, course, contact } = req.body;

  // Validation
  if (!name || !rollNo || !batch || !course || !contact) {
    return res.status(400).json({ 
      success: false, 
      error: 'All fields are required' 
    });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO students (name, rollNo, batch, course, contact) VALUES (?, ?, ?, ?, ?)',
      [name, rollNo, batch, course, contact]
    );
    connection.release();
    
    res.status(201).json({ 
      success: true, 
      message: 'Student created successfully',
      data: {
        id: result.insertId,
        name,
        rollNo,
        batch,
        course,
        contact
      }
    });
  } catch (error) {
    console.error('Error creating student:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ 
        success: false, 
        error: 'Roll number already exists' 
      });
    }

    res.status(500).json({ 
      success: false, 
      error: 'Error creating student',
      message: error.message 
    });
  }
});

// PUT - Update student
app.put('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, rollNo, batch, course, contact } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid student ID' 
    });
  }

  if (!name || !rollNo || !batch || !course || !contact) {
    return res.status(400).json({ 
      success: false, 
      error: 'All fields are required' 
    });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'UPDATE students SET name=?, rollNo=?, batch=?, course=?, contact=? WHERE id=?',
      [name, rollNo, batch, course, contact, id]
    );
    connection.release();
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Student not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Student updated successfully',
      data: {
        id,
        name,
        rollNo,
        batch,
        course,
        contact
      }
    });
  } catch (error) {
    console.error('Error updating student:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ 
        success: false, 
        error: 'Roll number already exists' 
      });
    }

    res.status(500).json({ 
      success: false, 
      error: 'Error updating student',
      message: error.message 
    });
  }
});

// DELETE - Delete student
app.delete('/api/students/:id', async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid student ID' 
    });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('DELETE FROM students WHERE id=?', [id]);
    connection.release();
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Student not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Student deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error deleting student',
      message: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Endpoint not found' 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error',
    message: err.message 
  });
});

// Start server
const PORT = process.env.PORT || 3000;

initDatabase().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  Student Management Portal Server
  Running on http://0.0.0.0:${PORT}
  `);
});
  });
}).catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\nShutting down gracefully...');
  pool.end((err) => {
    if (err) console.error('Error closing connection pool:', err);
    process.exit(0);
  });
});
