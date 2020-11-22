import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
      <Head>
      <link rel="icon" type="image/png"  href="/images/logo.png" />
      <script SameSite="None" src="https://checkout.razorpay.com/v1/checkout.js" />
      <script src="https://www.google.com/recaptcha/api.js" async defer></script>
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
