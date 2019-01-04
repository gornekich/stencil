#!/usr/bin/env bash

rm -rf ../backend/core/static/core/*;
cp -a build/static/js/ ../backend/core/static/core/;
cp -a build/static/css/ ../backend/core/static/core/;

mv ../backend/core/static/core/main*.js ../backend/core/static/core/main.js;
mv ../backend/core/static/core/1*.js ../backend/core/static/core/1.js;
mv ../backend/core/static/core/main*.css ../backend/core/static/core/main.css;