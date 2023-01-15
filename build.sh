#!/bin/sh

mkdir -p dist
cp -R .env src package.json package-lock.json public index.js Dockerfile dist
