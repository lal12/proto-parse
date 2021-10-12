check:
	npx eslint "src/**/*.js"
	npx prettier --ignore-path "../.prettierignore" --check "src/**/*.{js,json,css}"

fix:
	npx eslint --fix "src/**/*.js"
	npx prettier --ignore-path "../.prettierignore" --write "src/**/*.{js,json,css}"
