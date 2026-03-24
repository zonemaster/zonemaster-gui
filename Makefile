VERSION = $(shell jq -r '.version' package.json)

docker-build:
	echo $(VERSION)
	docker build --tag zonemaster/gui:local --build-arg version=$(VERSION) .

docker-tag-version:
	docker tag zonemaster/gui:local zonemaster/gui:$(VERSION)

docker-tag-latest:
	docker tag zonemaster/gui:local zonemaster/gui:latest

