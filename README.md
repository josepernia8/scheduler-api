# Scheduler API

> Asynchronous jobs API made for a hiring process.

This simple API doesn't handle perfectly all kind of errors or is fully organized since is test for a hiring process, there is also just only some simple Unit Testings (not e2e testing or integration testing) and code coverage isn't set up aswell.

- For the endpoints there is some error handling with `Boom` and handling http responses depending if there i a missing param or what not
- For Firebase only 1 simple database is created and there is some rules set up for not updating/creating non-allowed fields into the db but since this is a development environment it ignores the rules...

# Prerequisites
- Before runnign the project you need to create a `.env` file

# Running the project

## without Docker
- Run `yarn` to install dependencies
- Run `yarn dev` to spin up dev environment
## With Docker
- The project use `make` you can run `make help` for usage
- Run `make init` to spin up your dev environment. The project will be running by default on: `http://localhost:4004/`.


## Tech Stack

> Nodejs, Hapijs, Firebase, RabbitMQ, Heroku

## Contributing

```
Commits should follow https://sparkbox.com/foundry/semantic_commit_messages
Branch example: chore/readme (Ticket numbers should probably be added in the near future)
Commit example: chore: adding readme

Checks should pass before committing and that should happen automatically thanks to husky pre-commit hook that runs linter
```