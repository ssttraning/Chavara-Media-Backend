const ftp = require("basic-ftp");

async function uploadToFTP(localFilePath, remoteFileName) {

    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {

        console.log("Connecting to FTP...");
        console.log("Host:", process.env.FTP_HOST);
        console.log("User:", process.env.FTP_USER);

        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            port: 21,
            secure: false
        });

        console.log("Connected Successfully");

        await client.ensureDir("uploads");
        console.log("Directory Ready");

        await client.uploadFrom(localFilePath, remoteFileName);

        console.log("Upload Successful");

        return remoteFileName;

    } catch (err) {

        console.log("FTP ERROR");
        console.log(err);

        throw err;

    } finally {

        client.close();

    }

}

module.exports = uploadToFTP;