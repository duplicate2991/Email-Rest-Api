#!/bin/bash

FILE="modules.txt"

if [ ! -f "$FILE" ]; then
  echo "❌ modules.txt not found!"
  exit 1
fi

echo "📦 Installing modules from $FILE..."
echo "-----------------------------------"

while IFS= read -r module || [ -n "$module" ]; do
  # trim whitespace
  module=$(echo "$module" | xargs)

  # skip empty lines or comments
  if [[ -z "$module" || "$module" == \#* ]]; then
    continue
  fi

  echo "👉 Installing: $module"
  npm install "$module"

  if [ $? -eq 0 ]; then
    echo "✅ Installed: $module"
  else
    echo "❌ Failed: $module"
  fi

  echo "-----------------------------------"

done < "$FILE"

echo "🎉 All done!"
