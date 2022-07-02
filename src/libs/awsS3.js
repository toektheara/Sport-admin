import S3 from 'react-aws-s3';

export const aws_config = {
  bucketName: 'ruppbakeryspace',
  region: 'us-west-2',
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
}

const awsS3Client = new S3(aws_config)

export default awsS3Client;