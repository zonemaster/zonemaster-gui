VERSION = $(shell jq -r '.version' package.json)

docker-build:
	docker build --tag zonemaster/gui:local --build-arg version=$(VERSION) -f docker/Dockerfile .

docker-tag-version:
	docker tag zonemaster/gui:local zonemaster/gui:$(VERSION)

docker-tag-latest:
	docker tag zonemaster/gui:local zonemaster/gui:latest

