import {
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "node:crypto";

const bucket = process.env.UPLOADS_BUCKET_NAME;
const region = process.env.AWS_REGION;

const s3 =
  bucket && region
    ? new S3Client({
        region,
        credentials: process.env.AWS_ACCESS_KEY_ID
          ? {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            }
          : undefined,
      })
    : null;

export async function createPresignedUpload(type: string) {
  if (!s3 || !bucket) {
    throw new Error("S3 is not configured");
  }

  const key = `uploads/${crypto.randomUUID()}`;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: type,
    ACL: "public-read",
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 60 });

  return { url, key };
}

