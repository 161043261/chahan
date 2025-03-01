find . \( -name "*.js" -o -name "*.ts" -o -name "*.vue" -o -name "*.css" -o -name "*.sass" \) \
  -and \( -not -path "./node_modules/*" -and -not -path "./dist/*" \) \
  -exec wc -l {} + | awk '{ sum += $1 } END { print sum }'
