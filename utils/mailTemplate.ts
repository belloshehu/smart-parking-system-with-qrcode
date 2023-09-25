export const getEmailTemplate = (textBody: string, textHeading: string) => {
  return `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>title</title>
            <style>
            .container {
                display: flex;
                flex-direction: column;
                gap: 20;
                justify-content: center;
                align-items: center;
            }
            body {
                background-color: white;
                color: black;
                padding: 20px;
                font-size: 1.2rem;
                text-align: center;
            }
            .heading {
                font-size: 1.5rem;
                text-align: center;
            }
            .header {
                text-align: center;
                background-color: rgb(59, 7, 100);
                color: white;
                padding: 5px;
                border-radius: 20px 20px 0px 0px;
            }
            .footer {
                font-size: small;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 5px;
                background-color: aliceblue;
                color: black;
                border-top: 1px dashed gray;
                padding: 10px;
            }
            main {
                background-color: aliceblue;
                min-height: 50vh;
                padding: 20px;
                color: black;
            }
            ul {
                list-style: none;
                display: flex;
                justify-content: space-around;
                align-items: center;
                gap: 20px;
                padding: 0%;
                margin: 0%;
            }
            ul a {
                text-decoration: none;
            }
            ul a:hover {
                text-decoration: underline;
            }
            @media screen and (min-width: 578px) {
                body {
                padding: 20px;
                text-align: center;
                max-width: 60vw;
                margin: auto;
                }
                .heading {
                font-size: 2.5rem;
                text-align: center;
                }
            }
            </style>
        </head>
        <body>
            <header class="header">
            <h3 class="heading">${textHeading}</h3>
            </header>
            <main>${textBody}</main>
            <footer class="footer">
            <p>shop 2, pti shopping complex, pti road, effurun</p>
            <ul>
                <li><a href="/unsubscribe">Unsubscribe</a></li>
                <li><a href="/unsubscribe">Privacy policy</a></li>
                <li><a href="/unsubscribe">Terms of service</a></li>
            </ul>
            </footer>
        </body>
        </html>

  `;
};
