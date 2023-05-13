import { type Express } from 'express'
const useRoutes = (app: Express): void => {
  app.use('/user', async (req, res) => {
    res.json('ok')
  })
}

export default useRoutes
