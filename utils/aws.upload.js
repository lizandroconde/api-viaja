//# DEPENDENCYS
import dotenv from "dotenv";
import AWS from "aws-sdk";
dotenv.config();
const { AWS_BUCKET, AWS_ID, AWS_SECRET_KEY } = process.env;

//# CONNECTION TO AWS S3
const s3 = new AWS.S3({
  accessKeyId: AWS_ID,
  secretAccessKey: AWS_SECRET_KEY,
});

//# METHODS
export const awsUploadImage = async (file, filePath) => {
  const params = {
    Bucket: AWS_BUCKET,
    Key: `${filePath}`,
    Body: file,
  };

  try {
    const { Location } = await s3.upload(params).promise();
    return Location;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const awsDeleteImage = async (filePath) => {
  const params = {
    Bucket: AWS_BUCKET,
    Key: `${filePath}`,
  };

  try {
    const res = await s3.deleteObject(params).promise();
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
