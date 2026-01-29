# Stop on any error
$ErrorActionPreference = "Stop"

Write-Host "=== Git: committing source changes ==="
git add -A
git commit -m "new commit"
git push origin main

Write-Host "=== Building project ==="
npm run build

Write-Host "=== Replacing docs with build output ==="
Remove-Item -Recurse -Force docs -ErrorAction SilentlyContinue
robocopy .\dist .\docs /MIR | Out-Null

Write-Host "=== Git: committing build output ==="
git add docs
git commit -m "Deploy: update docs (build output)"
git push origin main

Write-Host "=== Done ✅ ==="
