@echo off
sfc /scannow

DISM.exe /Online /Cleanup-image /Scanhealth

DISM.exe /Online /Cleanup-image /Restorehealth