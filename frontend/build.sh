#!/bin/bash

# Build and run script for GestureAcademy

echo "Installing dependencies..."
npm install

echo "Building React components..."
npm run build:react

echo "Starting development server..."
npm run start 