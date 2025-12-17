#!/bin/bash

# Script to create a clean deployment package for Epinio
# This uploads ONLY source code - Epinio's buildpack will build the app

echo "Creating Epinio deployment package..."

# Clean up any existing node_modules and build artifacts
echo "Step 1: Cleaning up node_modules and build folders..."
rm -rf node_modules server/node_modules build

# Create the tarball with ONLY source files
# Epinio will run 'npm install' and 'npm run build' during deployment
echo "Step 2: Creating tarball with source code only..."
tar -czf check-it-out.tar.gz \
  package.json \
  package-lock.json \
  Procfile \
  epinio.yml \
  public/ \
  src/ \
  server/package.json \
  server/package-lock.json \
  server/index.js \
  server/authenticateToken.js \
  server/models/ \
  config/ \
  init.sql

echo "✓ Deployment package created: check-it-out.tar.gz"
echo ""
echo "Package contents (source code only):"
echo "  - package.json (frontend dependencies)"
echo "  - src/ (React source code)"
echo "  - server/ (backend source code)"
echo "  - Procfile (startup command)"
echo "  - epinio.yml (Epinio config)"
echo ""
echo "What Epinio will do during build:"
echo "  1. Upload and extract check-it-out.tar.gz"
echo "  2. Run 'npm ci' to install dependencies"
echo "  3. Run 'npm run build' to build React app"
echo "  4. Start app with command from Procfile"
echo ""
echo "Next steps:"
echo "1. Go to your Epinio UI"
echo "2. Create a new application named 'check-it-out'"
echo "3. Upload the check-it-out.tar.gz file"
echo "4. Configure environment variables:"
echo "   - MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE"
echo "   - JWT_SECRET"
echo "5. Deploy and monitor the build logs!"
