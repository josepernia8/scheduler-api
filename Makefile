.DEFAULT_GOAL := help

print-description:
	@echo "\n\033[1;33m$(text)\033[0m"

exec:
	docker-compose exec api $(cmd)

shell:
	@make --no-print-directory print-description text="Opening a shell into the running container (press 'Ctrl-d' to leave)"
	@make --no-print-directory exec cmd="sh"

run:
	docker-compose run --rm api $(cmd)

lint:
	@make --no-print-directory print-description text="Running linter"
	@make --no-print-directory run cmd="yarn lint"

lint-fix:
	@make --no-print-directory print-description text="Lint and attempt to fix encountered issues"
	@make --no-print-directory run cmd="yarn lint-fix"

test:
	@make --no-print-directory print-description text="Running tests"
	@make --no-print-directory run cmd="yarn run test $(file)"

yarn-update:
	@make --no-print-directory print-description text="Updating dependencies"
	docker-compose run --rm --no-deps api yarn

logs:
ifdef tail
	docker-compose logs --tail $(tail) api | less -R
else
	docker-compose logs -f api
endif

init:
	docker-compose up -d

kill:
	docker-compose down

restart:
	docker-compose restart

start:
	docker-compose start

#############################################################
# "Help Documentation"
#############################################################

help:
	@echo "  Salesforce Middleware Commands"
	@echo "  |"
	@echo "  |_ help (default)              - Show this message"
	@echo "  |"
	@echo "  |_ Manage Environment:"
	@echo "  |  init                        - Spin up docker-compose environment"
	@echo "  |  kill                        - Stop/remove container and network associated with it"
	@echo "  |  restart                     - Restart container"
	@echo "  |  start                       - Starts container"
	@echo "  |"
	@echo "  |_ Useful Commands:"
	@echo "  |  print-description           - Utility command to print formatted description of currently executed make command"
	@echo "  |  exec                        - Execute an arbitrary command in the running api container. Ex usage: make exec cmd=\"your command\""
	@echo "  |  shell                       - Starts a shell in the api containerr"
	@echo "  |  run                         - Run an arbitrary command in a temporary api container. Ex usage: make run cmd=\"your command\""
	@echo "  |  lint                        - Run linter"
	@echo "  |  lint-fix                    - Run linter and attempt to fix encountered issues"
	@echo "  |  test                        - Run tests"
	@echo "  |                                To run tests from a single file: make test file=path/to/test/file.spec.ts"
	@echo "  |  yarn-update                  - Update dependencies"
	@echo "  |  logs                        - Show logs from container Ex usage: make logs"
	@echo "  |                                To see just latest N logs: make logs tail=N"
	@echo "  |________________________________________________________________________________________________________________________________________"
	@echo " "

.PHONY:
	print-description
	exec
	shell
	run
	lint
	lint-fix
	test
	yarn-update
	logs
	init
	kill
	restart
	start
