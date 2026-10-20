VERSION = $(shell jq -r '.version' package.json)

docker-build: docker-build-all-in-one docker-build-stand-alone

docker-build-all-in-one:
	docker build --tag zonemaster/all-in-one:local --build-arg version=$(VERSION) -f docker/Dockerfile .

docker-build-stand-alone:
	docker build --tag zonemaster/gui:local	--build-arg version=$(VERSION) -f docker/Dockerfile-gui .


docker-tag-version: docker-tag-version-all-in-one docker-tag-version-stand-alone

docker-tag-version-all-in-one:
	docker tag zonemaster/all-in-one:local zonemaster/all-in-one:$(VERSION)

docker-tag-version-stand-alone:
	docker tag zonemaster/gui:local zonemaster/gui:$(VERSION)


docker-tag-latest: docker-tag-latest-all-in-one docker-tag-latest-stand-alone

docker-tag-latest-all-in-one:
	docker tag zonemaster/all-in-one:local zonemaster/all-in-one:latest

docker-tag-latest-stand-alone:
	docker tag zonemaster/gui:local zonemaster/gui:latest

