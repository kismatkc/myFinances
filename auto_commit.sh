#!/bin/bash
while true; do
    git pull
    if [ -n "$(git ls-files --modified --others --exclude-standard)" ]; then
        git add .
        git commit -m "Auto-commit"
        git push
    fi
    sleep 30
done
