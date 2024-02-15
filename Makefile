env:
	cp example.env .env

update-pages:
	npm run build:prod && cp -rf ./build/ ../chess-pages