#!/bin/sh

# Start MongoDB in the background
echo "Starting MongoDB..."
mongod --fork --logpath /var/log/mongodb.log --dbpath /data/db

# Wait for MongoDB to be ready
echo "Waiting for MongoDB to be ready..."
until mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; do
  sleep 1
done

echo "MongoDB is ready!"

# Start the Node.js application
echo "Starting Node.js application..."
exec npm run dev-server
