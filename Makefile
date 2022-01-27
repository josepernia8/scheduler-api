.DEFAULT_GOAL := help

print-description:
	@echo "\n\033[1;33m$(text)\033[0m"

exec:
ifdef s # service name
	docker-compose exec $(s) $(cmd)
else
	docker-compose exec api $(cmd)
endif

shell:
	@make --no-print-directory print-description text="Opening a shell into the running container (press 'Ctrl-d' to leave)"
ifdef s # service name
	@make --no-print-directory exec s=$(s) cmd="sh"
else
	@make --no-print-directory exec s=api cmd="sh"
endif

queues-info:
	@make --no-print-directory print-description text="Retrieving queues information"
ifdef s # service name
	@make --no-print-directory exec s=rabbit cmd="rabbitmqctl list_queues"
else
	@make --no-print-directory exec s=rabbit cmd="rabbitmqctl list_queues"
endif

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

yarn:
	@make --no-print-directory print-description text="Installing dependencies"
	docker-compose run --rm --no-deps api yarn

logs:
ifdef s # service name
	docker-compose logs -f $(s)
else
	docker-compose logs -f api
endif

init:
	docker-compose up -d

kill:
	docker-compose down

restart:
ifdef s # service name
	docker-compose restart $(s)
else
	docker-compose restart
endif

start:
ifdef s # service name
	docker-compose start $(s)
else
	docker-compose start
endif

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
	@echo "  |                                To select which service start/restart pass param 's=serviceName'"
	@echo "  |"
	@echo "  |_ Useful Commands:"
	@echo "  |  exec                        - Execute an arbitrary command in the running api container. Ex usage: make exec cmd=\"your command\""
	@echo "  |  shell                       - Starts a shell in the api container"
	@echo "  |  logs                        - Show logs from container Ex usage: make logs"
	@echo "  |                                To select which service for exec/shell/logs pass param 's=serviceName'"
	@echo "  |_ Node Commands:"
	@echo "  |  run                         - Run an arbitrary command in a temporary api container. Ex usage: make run cmd=\"your command\""
	@echo "  |  yarn                        - Install dependencies"
	@echo "  |  lint                        - Run linter"
	@echo "  |  lint-fix                    - Run linter and attempt to fix encountered issues"
	@echo "  |  test                        - Run tests"
	@echo "  |                                To run tests from a single file: make test file=path/to/test/file.spec.ts"
	@echo "  |_ AMQP Commands:"
	@echo "  |  queues-info                - List information about existing queues (name/messages)"
	@echo "  |________________________________________________________________________________________________________________________________________"
	@echo " "

.PHONY:
	print-description
	exec
	shell
	queues-info
	run
	lint
	lint-fix
	test
	yarn
	logs
	init
	kill
	restart
	start
