import aws from "aws-sdk";
import crypto from "crypto";
import { promisify } from "util";
import multer from "multer";
const randomBytes = promisify(crypto.randomBytes);

const bucketName = process.env.AWS_BUCKET_NAME!;
const prdbucketName = process.env.AWS_PRDBUCKET_NAME!;
const region = process.env.AWS_BUCKET_REGION!;
const accessKeyId = process.env.AWS_ACCESS_KEY!;
const secretAccessKey = process.env.AWS_SECRET_KEY!;

//BE Solution
const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

//FE Solution
export const generateUploadURL = async (folder: String, isPrivate: boolean) => {
  const rawBytes = await randomBytes(16);
  const fileName = rawBytes.toString("hex");
  let bucket;

  if (isPrivate == true) {
    bucket = prdbucketName;
  } else {
    bucket = bucketName;
  }
  // console.log(bucket);
  const params = {
    Bucket: bucket,
    Key: `${folder}/${fileName}`,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
};
