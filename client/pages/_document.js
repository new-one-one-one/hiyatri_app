import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles';
import {ColorModeScript} from '@chakra-ui/react'



class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
      <Head>
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="yes"/>
      <meta name="apple-mobile-web-app-title" content="Hiyatri"/>
      <link rel="icon" type="image/png"  href="/images/main-img.png" />
      <link rel="alternate" href="https://hiyatri.com" hrefLang="en-us" />
      <link defer rel="dns-prefetch" href="https://hiyatri.com" />
      <script samesite="None" src="https://checkout.razorpay.com/v1/checkout.js" />
      </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}


MyDocument.getInitialProps = async (ctx) => {
 const sheets = new ServerStyleSheets();
 const originalRenderPage = ctx.renderPage;

 ctx.renderPage = () =>
   originalRenderPage({
     enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
   });

 const initialProps = await Document.getInitialProps(ctx);

 return {
   ...initialProps,
   styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
 };
};


export default MyDocument;
