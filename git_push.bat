@echo off
cd /d c:\dawra\v2
"C:\Program Files\Git\cmd\git.exe" add -A
"C:\Program Files\Git\cmd\git.exe" commit -m "fix(frontend): update notFound import for Next.js 15"
"C:\Program Files\Git\cmd\git.exe" push -u origin main
