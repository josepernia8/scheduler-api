// Init the dotenv config
import { config } from 'dotenv'
config()

import { init, start } from './server' // eslint-disable-line sort-imports

init().then(() => start())
