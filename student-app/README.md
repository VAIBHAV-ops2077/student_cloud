# 🎓 Student Management Portal

A simple, full-stack student management system with Node.js backend and pure HTML/CSS/JavaScript frontend, integrated with AWS RDS MySQL.

## 📋 Features

✅ Create, Read, Update, Delete (CRUD) students  
✅ Real-time data synchronization  
✅ Search functionality  
✅ Beautiful responsive UI  
✅ AWS RDS MySQL integration  
✅ Error handling and validation  

## 🏗️ Project Structure

```
student-app/
├── server.js              # Express server & API endpoints
├── package.json           # Dependencies
├── .env                   # Database configuration (create from .env.example)
├── .env.example           # Template for environment variables
├── README.md              # This file
└── frontend/
    ├── index.html         # Main UI
    ├── style.css          # Styling
    └── script.js          # Client-side logic
```

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies

```bash
cd student-app
npm install
```

### Step 2: Configure Database

```bash
cp .env.example .env
```

Edit `.env` with your AWS RDS credentials:

```env
DB_HOST=student-db.co784oci2aen.us-east-1.rds.amazonaws.com
DB_USER=admin
DB_PASSWORD=admin12345
DB_NAME=student_portal
PORT=3000
```

⚠️ **Important:** Update these with your actual AWS RDS endpoint and credentials.

### Step 3: Start the Server

```bash
npm start
```

Expected output:
```
╔════════════════════════════════════════╗
║  Student Management Portal - Server   ║
║  Running on http://localhost:3000        ║
╚════════════════════════════════════════╝
```

### Step 4: Open in Browser

Visit: `http://localhost:3000`

## 📊 Database Schema

```sql
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  rollNo VARCHAR(50) NOT NULL UNIQUE,
  batch VARCHAR(50) NOT NULL,
  course VARCHAR(100) NOT NULL,
  contact VARCHAR(20) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

*Table is automatically created on first run.*

## 🔌 API Endpoints

### Get All Students
```bash
GET /api/students
```

### Create Student
```bash
POST /api/students
Content-Type: application/json

{
  "name": "John Doe",
  "rollNo": "CSE-001",
  "batch": "2023",
  "course": "B.Tech CSE",
  "contact": "9876543210"
}
```

### Update Student
```bash
PUT /api/students/:id
Content-Type: application/json

{
  "name": "Jane Doe",
  "rollNo": "CSE-001",
  "batch": "2023",
  "course": "B.Tech CSE",
  "contact": "9876543211"
}
```

### Delete Student
```bash
DELETE /api/students/:id
```

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | AWS RDS endpoint | `student-db.co784oci2aen.us-east-1.rds.amazonaws.com` |
| `DB_USER` | Database username | `admin` |
| `DB_PASSWORD` | Database password | `admin12345` |
| `DB_NAME` | Database name | `student_portal` |
| `PORT` | Server port | `3000` |

## 🐛 Troubleshooting

### ❌ Error: connect ECONNREFUSED

**Cause:** Cannot connect to MySQL  
**Fix:** 
- Check if RDS instance is running
- Verify security group allows inbound traffic on port 3306
- Confirm credentials in `.env` file

### ❌ Error: Port 3000 already in use

**Cause:** Another process is using port 3000  
**Fix:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or change PORT in .env file
```

### ❌ Error: Access denied for user

**Cause:** Wrong database credentials  
**Fix:**
- Verify username and password in `.env`
- Check RDS security group allows EC2 access

### ❌ CORS error in browser

**Cause:** Frontend cannot reach backend  
**Fix:**
- Check `API_BASE_URL` in `frontend/script.js`
- Ensure server is running on correct port
- Try accessing `http://localhost:3000/api/students` directly

## 📱 Frontend Usage

### Adding a Student
1. Fill in all form fields
2. Click "Add Student"
3. Student appears in table

### Editing a Student
1. Click "✏️ Edit" button on any student
2. Form auto-fills with data
3. Make changes and click "Update Student"

### Deleting a Student
1. Click "🗑️ Delete" button
2. Confirm deletion

### Searching
Type in search box to filter by name or roll number

## 🌐 Deploy to AWS EC2

### 1. Connect to EC2 Instance
```bash
ssh -i your-key.pem ec2-user@your-ec2-ip
```

### 2. Install Node.js
```bash
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
```

### 3. Upload Project
```bash
scp -i your-key.pem -r student-app/ ec2-user@your-ec2-ip:~/
```

### 4. Configure .env
```bash
cd ~/student-app
nano .env
# Update with RDS endpoint
```

### 5. Install Dependencies & Start
```bash
npm install
npm start
```

### 6. Use PM2 for Production
```bash
sudo npm install -g pm2
pm2 start server.js --name "student-portal"
pm2 startup
pm2 save
```

### 7. Access Portal
Visit: `http://your-ec2-ip:3000`

## 🔐 Security Checklist

- [ ] Change default MySQL password
- [ ] Use strong passwords
- [ ] Store `.env` file securely (never commit to git)
- [ ] Configure AWS Security Groups properly
- [ ] Use HTTPS in production
- [ ] Validate all inputs server-side
- [ ] Add authentication before production use

## 📦 Dependencies

- **express** ^4.18.2 - Web framework
- **mysql2** ^3.6.0 - MySQL driver
- **cors** ^2.8.5 - Cross-origin requests
- **dotenv** ^16.0.3 - Environment variables

## 💡 Development

### Add auto-restart during development
```bash
npm install --save-dev nodemon
npm run dev
```

### Test API with cURL
```bash
# Get all students
curl http://localhost:3000/api/students

# Add student
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","rollNo":"001","batch":"2023","course":"CSE","contact":"9999999999"}'
```

## 📞 Support

For issues:
1. Check `.env` configuration
2. Verify database connection
3. Check browser console for errors
4. Check server logs for API errors

## 📝 License

This project is open source and available under the MIT License.

---

**Ready to manage students efficiently!** 🎓
