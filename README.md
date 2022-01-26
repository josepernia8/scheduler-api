# Scheduler API

> Asynchronous jobs API made for a hiring process.

# Installation

Run `yarn` to install dependencies

# Running the project
- Before runnign the project copy the contents from `.env.dist` in a new `.env` file

## with Docker
- The project use `make` you can run `make help` for usage
- Run `make init` to spin up your dev environment. The project will be running by default on: `http://localhost:4004/`.

## without Docker
- Run `yarn dev` in your console which handles both `dev:tsc` for watching changes and `dev:serve` to run the project using `lib` created folder. The project will be running by default on: `http://localhost:4004/`

# Documentation

## Tech Stack

> Nodejs, Hapijs

## Contributing

```
Commits should follow https://sparkbox.com/foundry/semantic_commit_messages
Branch example: chore/readme (Ticket numbers should probably be added in the near future)
Commit example: chore: adding readme

Checks should pass before committing and that should happen automatically thanks to husky pre-commit hook that runs lint/tests
```