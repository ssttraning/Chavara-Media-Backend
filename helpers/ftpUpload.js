const ftp = require("basic-ftp");

async function uploadToFTP(localFilePath, remoteFileName) {

    const client = new ftp.Client();

    try {

        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            port: 21,
            secure: false
        });

        await client.ensureDir("uploads");

        await client.uploadFrom(localFilePath, remoteFileName);

        console.log("FTP Upload Successful");

        return remoteFileName;

    } catch (err) {

        console.log("FTP Error:", err);
        throw err;

    } finally {

        client.close();

    }

}

module.exports = uploadToFTP;