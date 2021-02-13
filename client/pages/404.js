import Head from 'next/head';
import Button from "@material-ui/core/Button";


export default function Error(){
  const head = () => (
        <Head>
            <title>
               {"Page not found"} | {process.env.NEXT_PUBLIC_APP_NAME}
            </title>
            <meta
             name="description"
             content={`India’s Only Meet & Greet Service.We ensure an easy, fast and hassle free journey throughout major Cities in India.
             Our Meet & Greet service will help bypass long lines, remove language barriers and make passing through the railway station easy.
             Our agents assist passengers through all the railway station formalities and helping complete procedures at security, baggage collection and drop off.`}
           />
           <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}`} />
           <meta property="og:title" content={`India’s Only Meet & Greet Service | ${process.env.NEXT_PUBLIC_APP_NAME}`} />
           <meta
            property="og:description"
            content={`India’s Only Meet & Greet Service.We ensure an easy, fast and hassle free journey throughout major Cities in India.
            Our Meet & Greet service will help bypass long lines, remove language barriers and make passing through the railway station easy.
            Our agents assist passengers through all the railway station formalities and helping complete procedures at security, baggage collection and drop off.`}
           />
           <meta property="og:type" content="website" />
           <meta property="og:url" content={`${process.env.NEXT_PUBLIC_DOMAIN}`} />
           <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_APP_NAME}`} />
           <meta property="og:image" content={`${process.env.NEXT_PUBLIC_DOMAIN}/images/logo.png`} />
           <meta property="og:image:secure_url" content={`${process.env.NEXT_PUBLIC_DOMAIN}/images/logo.png`} />
           <meta property="og:image:type" content="image/png" />
           <meta property="fb:app_id" content={`${process.env.NEXT_PUBLIC_FB_APP_ID}`} />
         </Head>
    );

  return <>
        {head()}
          <div className="container text-center pt-5">
             <img src="/images/logo.png" height="100%"/>
             <h1 className="error-title">Oops!  Error 404</h1>
            <Button size="large" href="/" color="primary" >Go Back to HiYatri</Button>
          </div>
         </>
}
