import {
  Configuration,
  EmailsApi,
  EmailTransactionalMessageData,
} from "@elasticemail/elasticemail-client-ts-axios";

const config = new Configuration({
  apiKey: process.env.EMAIL_API_KEY,
});

const emailsApi = new EmailsApi(config);

export function getEmailTemplate(content: string) {
  return `
  <div style="margin: auto; padding: 2rem; background-color: aliceblue; min-height: 80vh; width:70%; text-align: left">
    <header style="margin-top: 1rem; margin-bottom: 1rem; text-align: center; display:block;">
      <h3 style="font-weight: bold; text-align: center; color: #2233D3">Parking Space</h3>
    </header>
    <div style="background-color: white; text-align: left; display:block; min-height:35vh; padding: 2rem">${content}</div>
    <footer style="display:block; margin-top: 1rem; margin-bottom: 1rem; background-color: grey; padding: 5rem 1rem; text-align: center">
      <a href="https://smart-parking-system-eta.vercel.app">Smart parking</a>
    </footer>
  </div>`;
}

export function sendTransactionalEmails(
  content: string,
  to: string[],
  subject: string
): boolean {
  let out = false;
  const emailTransactionalMessageData = {
    Recipients: {
      To: to, // list of recepient emails
    },
    Content: {
      Body: [
        {
          ContentType: "HTML",
          Charset: "utf-8",
          Content: getEmailTemplate(content),
        },
      ],
      From: "parkingqrcode@gmail.com",
      Subject: subject,
    },
  };
  emailsApi
    .emailsTransactionalPost(
      emailTransactionalMessageData as EmailTransactionalMessageData
    )
    .then((response) => {
      console.log("API called successfully.");
      console.log(response.data);
      out = true;
    })
    .catch((error) => {
      console.error(error);
      out = false;
    });
  return out;
}
