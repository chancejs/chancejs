.PHONY: build generator lint package test

build:
	yarn build

generator:
	yarn run generator:create

lint:
	yarn workspaces foreach run lint

package:
	yarn run package:create

test:
	yarn workspaces foreach test
