env:
	cp example.env .env

update-example:
	npm run build:prod && cp -rf ./build/ ../vanilla-spa-example 