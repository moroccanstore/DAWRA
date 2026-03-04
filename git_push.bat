@echo off
cd /d c:\dawra\v2
"C:\Program Files\Git\cmd\git.exe" add -A
"C:\Program Files\Git\cmd\git.exe" commit -m "fix(build): provide fallback PAYLOAD_SECRET for deployment prerendering"
"C:\Program Files\Git\cmd\git.exe" push -u origin main
