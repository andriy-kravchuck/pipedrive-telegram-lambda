require("dotenv").config();

module.exports = {
    aws_table_name: 'pipedrive_telegram',
    aws_local_config: {
      //Provide details for local configuration
    },
    aws_remote_config: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      region: process.env.REGION,
    },
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    apiAuthUrl: process.env.API_AUTH_URL,
    apiUrl: process.env.API_URL
};