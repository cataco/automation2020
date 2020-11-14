# ------------------------------------------------------------------------------
# development environments -----------------------------------------------------
# ------------------------------------------------------------------------------

environment = $(ENVIRONMENT)

build-environment:
	rm -rf temp
	mkdir temp
	cp -R backend temp/backend
	cp -R deployenv/bin temp/bin
	cp -R cypress temp
	cp -R cypress_feature temp
	cp -R requirements.txt temp/requirements.txt
	cp deployenv/Dockerfile temp/Dockerfile
	COMMIT_HASH="$$(git rev-parse HEAD)" && \
	CURRENT_BRANCH="$$(git rev-parse --abbrev-ref HEAD)" && \
	BUILD_COMMAND="docker build -t backend-$(environment)-$${CURRENT_BRANCH}-$${COMMIT_HASH} ." && \
	cd temp && \
	eval $$BUILD_COMMAND
	rm -rf temp

start-environment-compose:
	make build-environment
	rm -rf temp
	mkdir temp
	cp -R deployenv/bin temp
	COMMIT_HASH="$$(git rev-parse HEAD)" && \
	CURRENT_BRANCH="$$(git rev-parse --abbrev-ref HEAD)" && \
	cd temp/bin && \
	echo "COMMIT_HASH="$$COMMIT_HASH >> .env && \
	echo "CURRENT_BRANCH="$$CURRENT_BRANCH >> .env && \
	echo "ENVIRONMENT=$(environment)" >> .env && \
	docker-compose config && \
	docker-compose -f docker-compose.yml -f env-compose.yml -p backend-$(environment) up -d --force-recreate
	rm -rf temp

clear-environment-containers:
	docker stop backend-$(environment) && docker rm backend-$(environment) || true
	docker stop backend-$(environment)-celery && docker rm backend-$(environment)-celery || true
	docker stop rabbit-$(environment) && docker rm rabbit-$(environment) || true
	docker stop backend-$(environment)-flower && docker rm backend-$(environment)-flower || true
# 	docker stop postgres-$(environment) && docker rm postgres-$(environment) || true
	docker stop backend-$(environment)_selenium_hub_1  && docker rm backend-$(environment)_selenium_hub_1  || true
	docker stop backend-$(environment)_samsung_galaxy_web_7.1.1_1  && docker rm backend-$(environment)_samsung_galaxy_web_7.1.1_1  || true
	docker stop backend-$(environment)_real_device_1   && docker rm backend-$(environment)_real_device_1   || true
	docker stop backend-$(environment)_samsung_galaxy_web_5.1.1_1   && docker rm backend-$(environment)_samsung_galaxy_web_5.1.1_1  || true
	docker stop backend-$(environment)_nexus_7.1.1_1     && docker rm backend-$(environment)_nexus_7.1.1_1   || true