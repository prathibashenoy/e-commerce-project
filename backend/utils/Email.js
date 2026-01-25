import Mailjet from "node-mailjet";
const MAILJET_API_KEY="942f67a7e6070a98a4e81d69b59cc152"
const MAILJET_SECRET_KEY="755bc9113eb1b24a508c73962ce7db40"

const mailjet = Mailjet.apiConnect(
  MAILJET_API_KEY,
  MAILJET_SECRET_KEY
);

export const sendMail = async () => {
  await mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "manojmanu08051987@gmail.com",
          Name: "Pudava",
        },
        To: [{ Email: "prathibashenoy10@gmail.com" }],
        Subject: "Test Mail",
        TextPart: "Mail sent successfully from Render",
      },
    ],
  });
};
sendMail()
