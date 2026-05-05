# ⚡ SETUP CHECKLIST - Follow Exactly

## ✅ Step-by-Step Execution

### 1️⃣ Navigate to Project
```bash
cd student-app
```

### 2️⃣ Install Dependencies
```bash
npm install
```
**Expected:** `added XX packages in XX seconds`

### 3️⃣ Create .env File
```bash
cp .env.example .env
```

### 4️⃣ Edit .env with Your AWS RDS Details
```bash
nano .env
```

Replace these values with your AWS RDS:
```env
DB_HOST=student-db.co784oci2aen.us-east-1.rds.amazonaws.com
DB_USER=admin
DB_PASSWORD=admin12345
DB_NAME=student_portal
PORT=3000
```

**Save:** Press `Ctrl+X`, then `Y`, then `Enter`

### 5️⃣ Start Server
```bash
npm start
```

**Expected Output:**
```
╔════════════════════════════════════════╗
║  Student Management Portal - Server   ║
║  Running on http://localhost:3000        ║
╚════════════════════════════════════════╝
```

### 6️⃣ Test Backend (New Terminal Tab)
```bash
curl http://localhost:3000/api/students
```

**Expected:** `[]` (empty array or list of students)

### 7️⃣ Open Frontend
Visit: `http://localhost:3000`

## 🧪 Test CRUD Operations

### Test 1: Add Student
```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Student",
    "rollNo": "TEST-001",
    "batch": "2023",
    "course": "B.Tech",
    "contact": "9999999999"
  }'
```

### Test 2: Get All Students
```bash
curl http://localhost:3000/api/students
```

### Test 3: Update Student (ID 1)
```bash
curl -X PUT http://localhost:3000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "rollNo": "TEST-001",
    "batch": "2023",
    "course": "B.Tech",
    "contact": "8888888888"
  }'
```

### Test 4: Delete Student (ID 1)
```bash
curl -X DELETE http://localhost:3000/api/students/1
```

## ❌ If Error Occurs

### ECONNREFUSED Error
```
Error: connect ECONNREFUSED
```
**Fix:**
- Check if RDS is running
- Check security group allows port 3306
- Verify .env credentials

### Access Denied Error
```
Error: Access denied for user 'admin'@'IP'
```
**Fix:**
- Double-check password in .env
- Check RDS security group settings

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Fix:**
```bash
lsof -ti:3000 | xargs kill -9
npm start
```

## 🎯 Success Indicators

✅ Server starts without errors  
✅ Can access http://localhost:3000  
✅ Can see form and student table  
✅ Can add students from web interface  
✅ Can edit students  
✅ Can delete students  
✅ Search functionality works  

## 🌐 AWS RDS Security Group Settings

Your EC2 security group must allow:
- **Inbound Rule:** MySQL/Aurora (Port 3306) from RDS security group
- **RDS Security Group:** Allow port 3306 from EC2 security group

## 📱 Test on EC2

1. Replace `localhost` with EC2 IP in script.js:
```javascript
const API_BASE_URL = 'http://YOUR_EC2_IP:3000/api';
```

2. Visit: `http://YOUR_EC2_IP:3000`

## 🔑 Important Files

| File | Purpose |
|------|---------|
| server.js | Express API server |
| .env | Database credentials (DON'T commit) |
| .env.example | Template (safe to commit) |
| frontend/index.html | Web interface |
| frontend/script.js | Frontend logic |
| frontend/style.css | Styling |

## ⚠️ Critical Points

1. **Do NOT** commit `.env` to git
2. **Do** commit `.env.example`
3. Change DB credentials from defaults
4. Use strong passwords
5. Keep RDS security group restrictive

## 🚀 You're Ready!

If all tests pass → **Project is working!**

Now you can:
- Manage students via web interface
- Integrate with other systems via API
- Deploy to AWS EC2
- Add authentication layer
- Extend features as needed

---

**Questions?** Check README.md for more details.
