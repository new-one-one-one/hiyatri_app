import BulkBookings from "../components/BulkBooking/BulkBooking";
import Head from "next/head";
import Layout from "../components/Core/Layout";

const head = () => (
  <Head>
    <title>
      {"Bulk Booking"} | {process.env.NEXT_PUBLIC_APP_NAME}
    </title>
    <meta
      name="description"
      content={`India’s Only Meet & Greet Service.We ensure an easy, fast and hassle free journey throughout major Cities in India.
         Our Meet & Greet service will help bypass long lines, remove language barriers and make passing through the railway station easy.
         Our agents assist passengers through all the railway station formalities and helping complete procedures at security, baggage collection and drop off.`}
    />
    <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}`} />
    <meta
      property="og:title"
      content={`India’s Only Meet & Greet Service | ${process.env.NEXT_PUBLIC_APP_NAME}`}
    />
    <meta
      property="og:description"
      content={`India’s Only Meet & Greet Service.We ensure an easy, fast and hassle free journey throughout major Cities in India.
        Our Meet & Greet service will help bypass long lines, remove language barriers and make passing through the railway station easy.
        Our agents assist passengers through all the railway station formalities and helping complete procedures at security, baggage collection and drop off.`}
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`${process.env.NEXT_PUBLIC_DOMAIN}`} />
    <meta
      property="og:site_name"
      content={`${process.env.NEXT_PUBLIC_APP_NAME}`}
    />
    <meta
      property="og:image"
      content={`${process.env.NEXT_PUBLIC_DOMAIN}/images/logo.png`}
    />
    <meta
      property="og:image:secure_url"
      content={`${process.env.NEXT_PUBLIC_DOMAIN}/images/logo.png`}
    />
    <meta property="og:image:type" content="image/png" />
    <meta
      property="fb:app_id"
      content={`${process.env.NEXT_PUBLIC_FB_APP_ID}`}
    />
  </Head>
);

const BulkBooking = () => {
  return (
    <>
      {head()}
      <Layout>
        <BulkBookings />
      </Layout>
    </>
  );
};

export default BulkBooking;
