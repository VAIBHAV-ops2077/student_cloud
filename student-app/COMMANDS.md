# 📝 Command Reference - Student Management Portal

## Installation & Setup

```bash
# Navigate to project
cd '/Users/vaibhav/Desktop/AWS vaibhav/student-app'

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit configuration (use your editor)
nano .env
# or
vim .env
# or
code .env
```

## Running the Server

```bash
# Start server
npm start

# Alternative
node server.js

# With nodemon (if installed globally)
npm install -g nodemon
nodemon server.js
```

## Database Configuration

Edit `.env` file:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=student_portal
PORT=3000
```

## Stopping the Server

```bash
# Press Ctrl+C in terminal
# or in another terminal:

# Find process on port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# macOS alternative
lsof -ti:3000 | xargs kill -9

# Linux alternative
fuser -k 3000/tcp
```

## Testing with cURL

### Get all students
```bash
curl http://localhost:3000/api/students
```

### Get single student
```bash
curl http://localhost:3000/api/students/1
```

### Create student
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

### Update student
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

### Delete student
```bash
curl -X DELETE http://localhost:3000/api/students/1
```

### Health check
```bash
curl http://localhost:3000/health
```

## NPM Commands

```bash
# Install dependencies
npm install

# Start server
npm start

# Save new package (example)
npm install express-validator --save

# Global installation
npm install -g pm2
npm install -g nodemon

# Check outdated packages
npm outdated

# Update packages
npm update

# Audit for vulnerabilities
npm audit
npm audit fix
```

## MySQL Commands

```bash
# Connect to MySQL
mysql -u root -p

# Inside MySQL:

# Show databases
SHOW DATABASES;

# Use database
USE student_portal;

# Show tables
SHOW TABLES;

# Describe table
DESCRIBE students;

# View students
SELECT * FROM students;

# Count students
SELECT COUNT(*) FROM students;

# Drop table
DROP TABLE students;

# Drop database
DROP DATABASE student_portal;
```

## AWS EC2 Deployment Commands

```bash
# Connect to EC2 instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install MySQL client
sudo yum install -y mysql

# Clone repository
git clone your-repo-url
cd student-app

# Install dependencies
npm install

# Run server
node server.js

# Using PM2 for production
npm install -g pm2
pm2 start server.js --name "student-portal"
pm2 startup
pm2 save

# View PM2 logs
pm2 logs student-portal

# Reload server without downtime
pm2 reload student-portal

# Stop server
pm2 stop student-portal

# Delete server from PM2
pm2 delete student-portal
```

## File Operations

```bash
# View file content
cat server.js
cat frontend/index.html
cat .env

# Edit file
nano server.js
vim server.js
code .

# Find files
find . -name "*.js"
find . -type f -name "package.json"

# Count lines in files
wc -l *.js
wc -l frontend/*.js

# Show directory structure
tree -L 2
ls -la
```

## Development Commands

```bash
# Check for syntax errors
node -c server.js

# Run linter (if installed)
npx eslint server.js
npx eslint frontend/script.js

# Format code (if prettier installed)
npx prettier --write server.js
npx prettier --write frontend/

# Watch for changes
nodemon server.js --exec "node server.js"
```

## Debugging

```bash
# Run with debug output
DEBUG=* node server.js

# Run with verbose logging
NODE_ENV=development node server.js

# Use Node Inspector
node --inspect server.js
# Then open chrome://inspect in Chrome

# View process info
ps aux | grep node
ps aux | grep npm
```

## Environment Setup

```bash
# Create .env from template
cp .env.example .env

# View .env (careful with passwords!)
cat .env

# Remove .env
rm .env

# Add to git ignore (already done)
echo ".env" >> .gitignore

# List environment variables
printenv | grep DB_
```

## Backup & Restore

```bash
# Backup database
mysqldump -u root -p student_portal > backup.sql

# Restore database
mysql -u root -p student_portal < backup.sql

# Backup project
tar -czf student-app-backup.tar.gz student-app/

# Extract backup
tar -xzf student-app-backup.tar.gz
```

## Troubleshooting Commands

```bash
# Check if port is in use
lsof -i :3000
netstat -an | grep 3000

# Test MySQL connection
mysql -h localhost -u root -p

# Ping MySQL server
mysql -h 127.0.0.1 -u root -p -e "SELECT 1"

# Check Node version
node --version
node -v

# Check npm version
npm --version
npm -v

# Check MySQL version
mysql --version

# View server logs
cat /var/log/mysql/mysql.log

# Monitor server
top -p $(pgrep -f "node server.js")
```

## Quick Restart

```bash
# Stop and restart server
# 1. Kill existing process
lsof -ti:3000 | xargs kill -9

# 2. Start new server
npm start
```

## Production Deployment Checklist

```bash
# 1. Test locally
npm start

# 2. Create production .env
cp .env.example .env
# Configure with production credentials

# 3. Install PM2
npm install -g pm2

# 4. Start with PM2
pm2 start server.js --name "student-portal"

# 5. Enable startup script
pm2 startup
pm2 save

# 6. Verify it's running
pm2 status
pm2 logs

# 7. Test endpoints
curl http://localhost:3000/health
```

## Clean Up

```bash
# Remove node_modules
rm -rf node_modules/

# Clear npm cache
npm cache clean --force

# Remove package-lock
rm package-lock.json

# Fresh install
npm install

# Remove log files
rm -f *.log
rm -f npm-debug.log
```

---

**Pro Tips:**
- Always use `.env` for sensitive data
- Never commit `.env` file to git
- Use `pm2` for production deployments
- Keep backups of your database
- Monitor server logs regularly
- Use SSH keys for EC2 access
- Enable HTTPS in production

---

For more information, see:
- README.md - Complete documentation
- QUICK_START.md - Quick setup guide
- PROJECT_SUMMARY.txt - Project overview
