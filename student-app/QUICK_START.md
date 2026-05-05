# 🚀 Quick Start Guide - Student Management Portal

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies
```bash
cd student-app
npm install
```

### Step 2: Configure Database
```bash
cp .env.example .env
# Edit .env with your MySQL credentials
```

**Example .env:**
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password123
DB_NAME=student_portal
PORT=3000
```

### Step 3: Start MySQL
```bash
# On macOS (if using Homebrew)
brew services start mysql

# On Linux
sudo systemctl start mysql

# On Windows
net start MySQL
```

### Step 4: Run the Server
```bash
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║   Student Management Portal Server     ║
║   Running on http://localhost:3000       ║
╚════════════════════════════════════════╝
```

### Step 5: Open in Browser
Visit: `http://localhost:3000`

## 📋 Project Files Overview

### Backend Files
- **server.js** - Express server with all API endpoints
- **package.json** - Dependencies configuration
- **.env.example** - Environment variables template

### Frontend Files
- **frontend/index.html** - Main UI page
- **frontend/style.css** - Beautiful styling with gradients
- **frontend/script.js** - Client-side JavaScript logic

## 🔌 Quick API Test

### Add a Student (cURL)
```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "rollNo": "CSE-001",
    "batch": "2023",
    "course": "B.Tech CSE",
    "contact": "9876543210"
  }'
```

### Get All Students
```bash
curl http://localhost:3000/api/students
```

### Update Student
```bash
curl -X PUT http://localhost:3000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "rollNo": "CSE-001",
    "batch": "2023",
    "course": "B.Tech CSE",
    "contact": "9876543211"
  }'
```

### Delete Student
```bash
curl -X DELETE http://localhost:3000/api/students/1
```

## 🎯 Features Checklist

✅ Create new students  
✅ View all students in a table  
✅ Search by name or roll number  
✅ Edit student information  
✅ Delete students with confirmation  
✅ Real-time success/error messages  
✅ Mobile responsive design  
✅ Beautiful gradient UI  

## 🐛 Common Issues & Fixes

### ❌ "Error: connect ECONNREFUSED"
**Fix:** MySQL is not running. Start the MySQL service.

### ❌ "Port 3000 already in use"
**Fix:** Change PORT in .env or run: `lsof -ti:3000 | xargs kill -9`

### ❌ "Cannot find module 'express'"
**Fix:** Run `npm install` in the student-app directory.

### ❌ "CORS error in browser"
**Fix:** API_BASE_URL in script.js should be `http://localhost:3000/api`

## 📱 Test on Different Devices

The application is fully responsive! Test on:
- Desktop browsers
- Tablets
- Mobile phones

## 🔐 Security Reminders

- Change default MySQL password in production
- Use environment variables for sensitive data
- Enable HTTPS in production
- Use AWS Security Groups for EC2 access control
- Implement authentication before production deployment

## 📚 Database Info

The table is automatically created on first run with:
- ID (auto-increment primary key)
- Name (100 chars)
- Roll Number (50 chars, unique)
- Batch (50 chars)
- Course (100 chars)
- Contact (20 chars)
- Timestamps (created/updated)

## 🚀 Deploy to AWS EC2

1. Upload project to EC2
2. Install Node.js: `curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash - && sudo yum install -y nodejs`
3. Install MySQL client: `sudo yum install -y mysql`
4. Configure .env with AWS RDS endpoint
5. Run: `npm install && node server.js`
6. Use PM2 for production: `npm install -g pm2 && pm2 start server.js`

## 💡 Pro Tips

- **Keyboard Shortcuts:**
  - `Esc` - Clear form
  - `Ctrl+R` (or `Cmd+R` on Mac) - Refresh students list

- **Search:** Type in the search box to filter by name or roll number

- **Edit:** Click the ✏️ edit button to populate the form

- **Delete:** Click 🗑️ delete for confirmation modal

## 📞 Support

All files are well-documented. Check README.md for:
- Complete API documentation
- Deployment instructions
- Troubleshooting guide
- Security best practices

---

**Ready to go!** Start managing students now! 🎓
