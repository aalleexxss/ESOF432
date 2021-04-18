@echo off
FOR /l %%x in (1, 1, 4) do (
	npx cypress run --config baseUrl=%1 --spec %2
	echo %%x run completed
)
