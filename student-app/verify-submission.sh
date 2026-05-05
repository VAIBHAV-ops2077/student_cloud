#!/bin/bash

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔍 Git Submission Verification${NC}\n"

# Check 1: .gitignore exists
if [ -f .gitignore ]; then
    echo -e "${GREEN}✓${NC} .gitignore file exists"
else
    echo -e "${RED}✗${NC} .gitignore file NOT found"
    exit 1
fi

# Check 2: .env is in .gitignore
if grep -q "^\.env$" .gitignore; then
    echo -e "${GREEN}✓${NC} .env is in .gitignore (credentials protected)"
else
    echo -e "${RED}✗${NC} .env is NOT in .gitignore"
    exit 1
fi

# Check 3: .env.example exists
if [ -f .env.example ]; then
    echo -e "${GREEN}✓${NC} .env.example exists (template for setup)"
else
    echo -e "${RED}✗${NC} .env.example NOT found"
    exit 1
fi

# Check 4: Node_modules is in .gitignore
if grep -q "node_modules/" .gitignore; then
    echo -e "${GREEN}✓${NC} node_modules/ is in .gitignore"
else
    echo -e "${RED}✗${NC} node_modules/ is NOT in .gitignore"
    exit 1
fi

# Check 5: Required files exist
required_files=("server.js" "package.json" "README.md" "frontend/index.html" "frontend/style.css" "frontend/script.js")
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file exists"
    else
        echo -e "${RED}✗${NC} $file NOT found"
        exit 1
    fi
done

echo -e "\n${GREEN}✓ All checks passed! Ready to submit.${NC}\n"

echo "Summary of what will be submitted:"
echo "  - Source code files (.js, .html, .css)"
echo "  - Configuration (package.json, .env.example)"
echo "  - Documentation (README.md, guides)"
echo ""
echo "Protected from submission (by .gitignore):"
echo "  - .env (database credentials)"
echo "  - node_modules/ (auto-installed)"
echo "  - Temporary/log files"
echo ""
echo -e "${YELLOW}Next step:${NC} git add . && git commit -m 'Student Management Portal' && git push"
