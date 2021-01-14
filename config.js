module.exports = {
  serviceAccount: {
    type: "service_account",
    project_id: "cluster-a3ce9",
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: "firebase-adminsdk-o8z17@cluster-a3ce9.iam.gserviceaccount.com",
    client_id: "105002793898961649425",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-o8z17%40cluster-a3ce9.iam.gserviceaccount.com"
  },
	mode: "DEVELOPMENT",
	port: 8080
}