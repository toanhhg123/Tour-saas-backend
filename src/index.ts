import 'module-alias/register'
import env from '@/config/env'
import app from './app'

const port = env.PORT

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`)
})
