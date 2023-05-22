import 'module-alias/register'
import env from '@/config/env'
import createApp from './app'
import winstonLogger from './utils/logger.utils'
const port = env.PORT

const runningApp = async () => {
  try {
    const app = await createApp()

    app.listen(port, async () => {
      console.log(`Server is running at http://localhost:${port}`)
    })
  } catch (error) {
    winstonLogger.error({
      errorServer: error
    })
  }
}

runningApp()
