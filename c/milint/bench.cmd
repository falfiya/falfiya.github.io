@echo off

cd bin

if exist timeit.dat (
   del timeit.dat
)

for /f %%c in ('copy /z %~f0 nul') do (
   for /l %%i in (1, 1, 100) do (
      < nul set /p="Run: %%i/100%%c"
      timeit milint.exe > nul 2> nul
      timeit milint-cxx.exe > nul 2> nul
      < nul set /p=%%c
   )
)

timeit -t
