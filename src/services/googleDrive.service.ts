import env from '@/config/env'
import fs from 'fs'
import { google } from 'googleapis'

export class GoogleDriveService {
  private driveClient

  public constructor(clientId: string, clientSecret: string, redirectUri: string, refreshToken: string) {
    this.driveClient = this.createDriveClient(clientId, clientSecret, redirectUri, refreshToken)
  }

  createDriveClient(clientId: string, clientSecret: string, redirectUri: string, refreshToken: string) {
    const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri)

    client.setCredentials({ refresh_token: refreshToken })

    return google.drive({
      version: 'v3',
      auth: client
    })
  }

  async createFile(fileName: string, filePath: string, fileMimeType: string, folderId = env.GOOGLE_DRIVE_FORDER_ID) {
    try {
      const res = await this.driveClient.files.create({
        requestBody: {
          name: fileName,
          mimeType: fileMimeType,
          parents: folderId ? [folderId] : []
        },
        media: {
          mimeType: fileMimeType,
          body: fs.createReadStream(filePath)
        }
      })
      return res
    } catch (error) {
      throw error
    }
  }

  async publicFile(id: string) {
    try {
      const res = await this.driveClient.permissions.create({
        fileId: id || '',
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      })
      return res
    } catch (error) {
      throw error
    }
  }
  async getFile(id: string) {
    try {
      const getUrl = await this.driveClient.files.get({
        fileId: id,
        fields: 'thumbnailLink webContentLink webViewLink'
      })
      return getUrl
    } catch (error) {
      throw error
    }
  }
}

const driveClientId = env.GOOGLE_DRIVE_CLIENT_ID || ''
const driveClientSecret = env.GOOGLE_DRIVE_CLIENT_SECRET || ''
const driveRedirectUri = env.GOOGLE_DRIVE_REDIRECT_URI || ''
const driveRefreshToken = env.GOOGLE_DRIVE_REFRESH_TOKEN || ''

const googleDriveService = new GoogleDriveService(driveClientId, driveClientSecret, driveRedirectUri, driveRefreshToken)

export default googleDriveService
