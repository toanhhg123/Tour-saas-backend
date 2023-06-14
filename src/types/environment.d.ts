declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string
      NODE_ENV: 'development' | 'production'
      PORT?: string
      PWD: string
      MYSQL_DATABASE: string
      GOOGLE_DRIVE_REFRESH_TOKEN: string
      GOOGLE_DRIVE_REDIRECT_URI: string
      GOOGLE_DRIVE_CLIENT_SECRET: string
      GOOGLE_DRIVE_CLIENT_ID: string
      GOOGLE_DRIVE_FORDER_ID: string
      KEY_SESSION: string
      AUTH_SECRET_KEY_ACCESS_TOKEN: string
      AUTH_SECRET_KEY_REFRESH_TOKEN: string
      AUTH_SECRET_KEY_EXPIRES: string
      REDIS_HOST: string
      REDIS_PORT: number
      AUTH_REFRESH_KEY_EXPIRES: number
    }
  }
}

export {}
