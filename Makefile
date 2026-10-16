VERSION = $(shell jq -r '.version' package.json)

docker-build:
	docker build --tag zonemaster/all-in-one:local --build-arg version=$(VERSION) -f docker/Dockerfile .
	docker build --tag zonemaster/gui:local	--build-arg version=$(VERSION) -f docker/Dockerfile-gui .

docker-tag-version:
	docker tag zonemaster/all-in-one:local zonemaster/all-in-one:$(VERSION)

docker-tag-latest:
	docker tag zonemaster/all-in-one:local zonemaster/all-in-one:latest

