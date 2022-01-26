// Init the dotenv config
import { config } from 'dotenv'
config()

import { init, start } from './server'

init().then(() => start())
