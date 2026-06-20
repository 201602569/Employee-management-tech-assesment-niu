#!/bin/sh
set -e

echo "Waiting for MySQL..."
until npx sequelize-cli db:migrate --config config/config.js 2>/dev/null; do
  echo "DB not ready, retrying in 3s..."
  sleep 3
done

echo "Running seeds..."
npx sequelize-cli db:seed:all --config config/config.js 2>/dev/null || true

echo "Starting API..."
exec node src/app.js
