import fs from 'node:fs'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import type { Fields, Files } from 'formidable'
import formidable from 'formidable'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const { s3: { ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION, BUCKET_NAME, ENDPOINT_URL, UPLOAD_KEY, FILE_PREFIX_URL } } = useRuntimeConfig()

  const form = formidable({
    multiples: true,
    keepExtensions: true,
    filename: (name: string, ext: string) => {
      return `${name}-${new Date().getTime()}${ext}`
    },
  })

  const { files }: { fields: Fields, files: Files } = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        reject(err)
        return
      }
      resolve({ fields, files })
    })
  })

  const s3Client = new S3Client({
    region: REGION,
    endpoint: ENDPOINT_URL,
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
  })

  const uploadedFilesUrls: string[] = []
  const uploadPromises = Object.values(files).flat().map(async (file) => {
    if (file) {
      const key = `${UPLOAD_KEY}/${file.newFilename}`
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: fs.createReadStream(file.filepath),
        ContentType: file.mimetype!,
      })

      try {
        await s3Client.send(command)
        uploadedFilesUrls.push(`${FILE_PREFIX_URL}/${key}`)
      }
      catch (error) {
        console.error('Error uploading file:', error)
        throw new Error(`Error uploading file: ${file.newFilename}`)
      }
    }
  })
  try {
    await Promise.all(uploadPromises)
    return { success: true, message: 'Files uploaded successfully!', data: uploadedFilesUrls }
  }
  catch (error) {
    return { success: false, message: 'Error uploading files', error }
  }
})
