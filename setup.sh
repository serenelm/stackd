#!/bin/bash

# stackd - Quick Setup Script for macOS/Linux

echo ""
echo "========================================"
echo "  stackd - Wealth Wellness Dashboard"
echo "  Quick Setup"
echo "========================================"
echo ""

echo "[1/4] Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing backend dependencies"
    exit 1
fi
cd ..

echo "[2/4] Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing frontend dependencies"
    exit 1
fi
cd ..

echo ""
echo "========================================"
echo "  Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo ""
echo "Open TWO terminal windows:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend"
echo "  npm run dev"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Dashboard will open at http://localhost:3000"
echo ""
