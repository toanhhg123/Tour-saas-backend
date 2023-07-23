import 'module-alias/register'
import env from '@/config/env'
import winstonLogger from './utils/logger.utils'
import App from './app'
const port = env.PORT

class Boostrap {
    public static async runningApp() {
        try {
            const app = await App.createApp()

            app.listen(port, async () => {
                console.log(
                    `Server is running at http://localhost:${port}`
                )
            })
        } catch (error) {
            winstonLogger.error({
                errorServer: error
            })
        }
    }
}

Boostrap.runningApp()
