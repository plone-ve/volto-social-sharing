### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-eu -o pipefail -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

CURRENT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

# Recipe snippets for reuse

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

GIT_FOLDER=$(CURRENT_DIR)/.git

PLONE_VERSION=6.1.5
# VOLTO_VERSION=18.35.1
DOCKER_IMAGE=plone/server-dev:${PLONE_VERSION}
DOCKER_IMAGE_ACCEPTANCE=plone/server-acceptance:${PLONE_VERSION}
API_PATH ?= http://127.0.0.1:55001/plone

ADDON_NAME='@codesyntax/volto-social-sharing'

# ADDON_NAME='volto-social-sharing'
# ADDON_PATH='volto-social-sharing'
# COMPOSE_FILE=dockerfiles/docker-compose.yml
# ACCEPTANCE_COMPOSE=acceptance/docker-compose.yml
# CMD=CURRENT_DIR=${CURRENT_DIR} ADDON_NAME=${ADDON_NAME} ADDON_PATH=${ADDON_PATH} VOLTO_VERSION=${VOLTO_VERSION} PLONE_VERSION=${PLONE_VERSION} docker compose
# DOCKER_COMPOSE=${CMD} -p ${ADDON_PATH} -f ${COMPOSE_FILE}
# DEV_COMPOSE=COMPOSE_PROFILES=dev ${DOCKER_COMPOSE}
# LIVE_COMPOSE=COMPOSE_PROFILES=dev ${DOCKER_COMPOSE}
# ACCEPTANCE=${CMD} -p ${ADDON_PATH}-acceptance -f ${ACCEPTANCE_COMPOSE}

.PHONY: help
help: ## Show this help
	@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m:\2/' | column -c2 -t -s :)"

# Dev Helpers

.PHONY: clean
clean: ## Clean environment
	@echo "$(RED)==> Cleaning Volto core and node_modules$(RESET)"
	rm -rf core node_modules

.PHONY: install
install: ## Installs the add-on in a development environment
	@echo "$(GREEN)Install$(RESET)"
	pnpm dlx mrs-developer missdev --no-config --fetch-https
	pnpm i
	make build-deps

.PHONY: start
start: ## Starts Volto, allowing reloading of the add-on during development
	pnpm start

.PHONY: build
build: ## Build a production bundle for distribution of the project with the add-on
	pnpm build

# .PHONY: install
# install: ## Installs the local environment, Cypress, build acceptance containers
# 	yarn
# 	make install-acceptance

# .PHONY: build-backend
# build-backend: ## Build
# 	@echo "$(GREEN)==> Build Backend Container $(RESET)"
# 	${DEV_COMPOSE} build backend

# .PHONY: start-backend
# start-backend: ## Starts Docker backend
# 	@echo "$(GREEN)==> Start Docker-based Plone Backend $(RESET)"
# 	${DEV_COMPOSE} up backend -d

core/packages/registry/dist: $(shell find core/packages/registry/src -type f)
	pnpm --filter @plone/registry build

core/packages/components/dist: $(shell find core/packages/components/src -type f)
	pnpm --filter @plone/components build

.PHONY: build-deps
build-deps: core/packages/registry/dist core/packages/components/dist ## Build dependencies

.PHONY: stop-backend
stop-backend: ## Stop Docker backend
	@echo "$(GREEN)==> Stop Docker-based Plone Backend $(RESET)"
	${DEV_COMPOSE} stop backend

.PHONY: build-live
build-live: ## Build Addon live
	@echo "$(GREEN)==> Build Addon development container $(RESET)"
	${LIVE_COMPOSE} build addon-live

.PHONY: build-addon
build-addon: ## Build Addon dev
	@echo "$(GREEN)==> Build Addon development container $(RESET)"
	${DEV_COMPOSE} build addon-dev

.PHONY: start-dev
start-dev: ## Starts Dev container
	@echo "$(GREEN)==> Start Addon Development container $(RESET)"
	${DEV_COMPOSE} up addon-dev

.PHONY: dev
dev: ## Develop the addon
	@echo "$(GREEN)==> Start Development Environment $(RESET)"
	make build-backend
	make start-backend
	make build-addon
	make start-dev

# Dev Helpers
.PHONY: i18n
i18n: ## Sync i18n
	@echo "$(YELLOW)==> Do not forget to setup the local environment (make install) $(RESET)"
	pnpm --filter $(ADDON_NAME) i18n

.PHONY: ci-i18n
ci-i18n: ## Check if i18n is not synced
	pnpm --filter $(ADDON_NAME) i18n && git diff -G'^[^\"POT]' --exit-code

.PHONY: format
format: ## Format codebase
	pnpm prettier:fix
	pnpm lint:fix
	pnpm stylelint:fix

# .PHONY: format
# format: ## Format codebase
# 	${DEV_COMPOSE} run --rm addon-dev prettier:fix
# 	${DEV_COMPOSE} run --rm addon-dev lint:fix
# 	${DEV_COMPOSE} run --rm addon-dev stylelint:fix

.PHONY: lint
lint: ## Lint, or catch and remove problems, in code base
	pnpm lint
	pnpm prettier
	pnpm stylelint --allow-empty-input

# lint: ## Lint, or catch and remove problems, in code base
# 	${DEV_COMPOSE} run --rm addon-dev lint
# 	${DEV_COMPOSE} run --rm addon-dev prettier
# 	${DEV_COMPOSE} run --rm addon-dev stylelint --allow-empty-input

.PHONY: release
release: ## Release the add-on on npmjs.org
	pnpm release

.PHONY: release-dry-run
release-dry-run: ## Dry-run the release of the add-on on npmjs.org
	pnpm release

.PHONY: test
test: ## Run unit tests
	pnpm test

.PHONY: ci-test
ci-test: ## Run unit tests in CI
	# Unit Tests need the i18n to be built
	VOLTOCONFIG=$(CURRENT_DIR)/volto.config.js pnpm --filter @plone/volto i18n
	CI=1 RAZZLE_JEST_CONFIG=$(CURRENT_DIR)/jest-addon.config.js pnpm run --filter @plone/volto test --passWithNoTests

# ci-test: ## Run unit tests in CI
# 	${DEV_COMPOSE} run -e CI=1 addon-dev test

.PHONY: backend-docker-start
backend-docker-start:	## Starts a Docker-based backend for development
	@echo "$(GREEN)==> Start Docker-based Plone Backend$(RESET)"
	docker run -it --rm --name=backend -p 8080:8080 -e SITE=Plone $(DOCKER_IMAGE)

## Storybook
.PHONY: storybook-start
storybook-start: ## Start Storybook server on port 6006
	@echo "$(GREEN)==> Start Storybook$(RESET)"
	pnpm run storybook

.PHONY: storybook-build
storybook-build: ## Build Storybook
	@echo "$(GREEN)==> Build Storybook$(RESET)"
	mkdir -p $(CURRENT_DIR)/.storybook-build
	pnpm run storybook-build -o $(CURRENT_DIR)/.storybook-build

## Acceptance
.PHONY: acceptance-frontend-dev-start
acceptance-frontend-dev-start: ## Start acceptance frontend in development mode
	RAZZLE_API_PATH=http://127.0.0.1:55001/plone pnpm start

.PHONY: acceptance-frontend-prod-start
acceptance-frontend-prod-start: ## Start acceptance frontend in production mode
	RAZZLE_API_PATH=$(API_PATH) pnpm build && pnpm start:prod

.PHONY: acceptance-backend-start
acceptance-backend-start: ## Start backend acceptance server
	docker run -it --rm -p 55001:55001 $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: ci-acceptance-backend-start
ci-acceptance-backend-start: ## Start backend acceptance server in headless mode for CI
	docker run -i --rm -p 55001:55001 $(DOCKER_IMAGE_ACCEPTANCE)

.PHONY: acceptance-test
acceptance-test: ## Start Cypress in interactive mode
	pnpm --filter @plone/volto exec cypress open --config-file $(CURRENT_DIR)/cypress.config.js --config specPattern=$(CURRENT_DIR)'/cypress/tests/**/*.{js,jsx,ts,tsx}'

.PHONY: ci-acceptance-test
ci-acceptance-test: ## Run cypress tests in headless mode for CI
	pnpm --filter @plone/volto exec cypress run --config-file $(CURRENT_DIR)/cypress.config.js --config specPattern=$(CURRENT_DIR)'/cypress/tests/**/*.{js,jsx,ts,tsx}' --env API_PATH="$(API_PATH)"

# .PHONY: install-acceptance
# install-acceptance: ## Install Cypress, build acceptance containers
# 	(cd acceptance && yarn)
# 	${ACCEPTANCE} --profile dev --profile prod build

# .PHONY: start-test-acceptance-server
# start-test-acceptance-server: ## Start acceptance server (for use it in while developing)
# 	${ACCEPTANCE} --profile dev up

# .PHONY: start-test-acceptance-server-prod
# start-test-acceptance-server-prod: ## Start acceptance server in prod (used by CI)
# 	${ACCEPTANCE} --profile prod up -d

# .PHONY: test-acceptance
# test-acceptance: ## Start Cypress (for use it while developing)
# 	(cd acceptance && ./node_modules/.bin/cypress open)

# .PHONY: test-acceptance-headless
# test-acceptance-headless: ## Run cypress tests in CI
# 	(cd acceptance && ./node_modules/.bin/cypress run)

# .PHONY: stop-test-acceptance-server
# stop-test-acceptance-server: ## Stop acceptance server (for use it while finished developing)
# 	${ACCEPTANCE} --profile dev down

# .PHONY: status-test-acceptance-server
# status-test-acceptance-server: ## Status of Acceptance Server (for use it while developing)
# 	${ACCEPTANCE} ps

# .PHONY: debug-frontend
# debug-frontend:  ## Run bash in the Frontend container (for debug infrastructure purposes)
# 	${DEV_COMPOSE} run --entrypoint bash addon-dev

# .PHONY: pull-backend-image
# pull-backend-image:  ## Pulls and updates the backend image (for use it while developing)
# 	docker pull ghcr.io/voltosocialsharing:latest
