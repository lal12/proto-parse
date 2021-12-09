check:
	npx eslint "*/*.js"
	npx prettier --ignore-path ".prettierignore" --check "*/*.{js,json}"

fix:
	npx eslint --fix "*/*.js"
	npx prettier --ignore-path ".prettierignore" --write "*/*.{js,json}"
