@echo off
cd /d c:\dawra\v2
"C:\Program Files\Git\cmd\git.exe" add -A
"C:\Program Files\Git\cmd\git.exe" commit -m "feat(seo): implement dynamic sitemap and json-ld schema (Phase 4)"
"C:\Program Files\Git\cmd\git.exe" push -u origin main
