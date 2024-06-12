module.exports = {
    aws_table_name: 'pipedrive_telegram',
    aws_local_config: {
      //Provide details for local configuration
    },
    aws_remote_config: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.ACCESS_KEY_ID,
      region: process.env.REGION,
    },
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
};