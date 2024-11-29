const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
})

const s3 = new AWS.S3()

exports.uploadFile = (req, res) => {
    console.log("uploading file...");
    const file = req.file
    const filePath = path.join(__dirname, "..", "uploads", file.filename)

    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return res.status(500).json({message: 'ERRO!', error: err})
        }

        const params = {
            Bucket: "BUCKET_NAME",
            Key: "ROUTE/" + file.originalname,
            Body: fileData,
            ContentType: "file.mimetype"
        }

        s3.upload(params, (s3Err, data) => {
            if (s3Err) {
                console.log(s3Err)
                return res.status(500).json({message: 'Erro no upload pro S3!', error: s3Err})
            }

            fs.unlink(filePath, (err) => {
                res.status(200).json({message: "PARABENS ALUNO", data})
            })
        })
    })
}