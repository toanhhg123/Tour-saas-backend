import env from '@/config/env'
import { google } from 'googleapis'
import { Stream } from 'stream'

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

  async createFile(fileName: string, fileObject: Express.Multer.File, folderId = env.GOOGLE_DRIVE_FORDER_ID) {
    try {
      const bufferStream = new Stream.PassThrough()
      bufferStream.end(fileObject.buffer)
      const res = await this.driveClient.files.create({
        requestBody: {
          name: fileName,

          parents: folderId ? [folderId] : []
        },
        media: {
          mimeType: 'image/jpeg',
          body: bufferStream
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

  async deleteFile(id: string) {
    try {
      const res = await this.driveClient.files.delete({
        fileId: id
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
        fields: 'thumbnailLink , webContentLink , webViewLink'
      })

      console.log(getUrl)

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
