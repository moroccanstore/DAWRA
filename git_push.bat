@echo off
cd /d c:\dawra\v2
"C:\Program Files\Git\cmd\git.exe" config user.email "moroccanstore@users.noreply.github.com"
"C:\Program Files\Git\cmd\git.exe" config user.name "moroccanstore"
"C:\Program Files\Git\cmd\git.exe" add -A
"C:\Program Files\Git\cmd\git.exe" commit -m "Phase 1+2: scaffold + collections"
"C:\Program Files\Git\cmd\git.exe" branch -M main
"C:\Program Files\Git\cmd\git.exe" remote add origin https://github.com/moroccanstore/DAWRA.git 2>nul
"C:\Program Files\Git\cmd\git.exe" push -u origin main
