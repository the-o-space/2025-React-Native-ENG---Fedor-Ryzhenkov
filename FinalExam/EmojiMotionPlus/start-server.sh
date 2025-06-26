#!/bin/bash

echo "Starting JSON server for mood quotes..."
echo "Server will be available at: http://192.168.171.99:8080"
echo "Make sure to update the IP address in utils/api.js if needed!"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd json-server
npx http-server . -p 8080 --cors 