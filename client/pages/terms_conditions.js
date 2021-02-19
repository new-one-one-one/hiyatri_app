import Layout from '../components/Core/Layout';
import Head from 'next/head';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";


const useStyle = makeStyles((theme) => ({
  body: {
    backgroundColor: "#f7f7f7",
  },
  banner: {
    marginTop: theme.spacing(5),
  },
  paper: {
    marginBottom: theme.spacing(5),
    boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.2) !important",
    padding: theme.spacing(3),
    fontSize: 16,
    letterSpacing: 0.63,
    color: "#000000",
    lineHeight: "28px",
  },
  paperHeading: {
    fontSize: 36,
    letterSpacing: 1.07,
    color: "#eb2c2d",
    fontWeight: 600,
  },
  subHeading: {
    fontSize: 18,
    lineHeight: "26px",
    letterSpacing: 0.53,
    color: "#000000",
    fontWeight: 600,
  },
  list: {
    marginLeft: 20,
    "& li": {
      listStyleType: "disc !important",
      marginTop: 10,
      marginBottom: 10,
    },
  },

}));


  const head = () => (
        <Head>
            <title>
               {"Conditions"} | {process.env.NEXT_PUBLIC_APP_NAME}
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


 const Terms_Condition = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyle();
  
  return <>
          {head()}
          <Layout>
          <Grid
            container
            component="div"
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={11} sm={11} md={11} lg={11} className={classes.banner}>
            <Typography>
          <h2>Terms And Conditions</h2>
        </Typography>  
            </Grid>
            
        
          <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.paper}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy.text ever since the 1500s, 
              when an unknown printer took a galley of type and  scrambled it to make a
              type specimen book. It has survived not only five centuries,
              but also the leap into electronic typesetting, remaining essentially unchanged. 
              It was popularised in the 1960s with the release of Letraset sheets <br /> <br />
                You are required to read our ‘Terms and Conditions’ and ‘Privacy
                Policy’ before starting using our services. By using BikeBazaar
                services, you agree to our ‘Terms and Conditions’ and ‘Privacy
                Policy’. If you don’t agree with our ‘Terms and Conditions’,
                please do not use our services and unsubscribe from BikeBazaar
                website.
                <br />
                <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy.text ever since the 1500s, 
              when an unknown printer took a galley of type and  scrambled it to make a
              type specimen book.
                <br />
                <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy.text ever since the 1500s, 
              when an unknown printer took a galley of type and  scrambled it to make a
              type specimen book.
                <br />
                <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy.text ever since the 1500s, 
              when an unknown printer took a galley of type and  scrambled it to make a
              type specimen book.
              </Paper>
            </Grid> 
          <Grid item xs={11} sm={11} md={11} lg={11} className={classes.banner}>
              <Paper className={classes.paper}>
                <h3>
                  Additional Terms and Conditions for specific user groups
                </h3>
                <br />
                <h4>PRIVACY</h4>
                <br />
                <ul>
                  <li>
                  Please review our Privacy Policy, 
                  which also governs your visit to this Site, 
                  to understand our practices.
                  </li>
                  <li>
                  Please review our Privacy Policy, 
                  which also governs your visit to this Site, 
                  to understand our practices.
                  </li>
                  <li>
                  Please review our Privacy Policy, 
                  which also governs your visit to this Site, 
                  to understand our practices.
                  </li>
                  <li>
                  Please review our Privacy Policy, 
                  which also governs your visit to this Site, 
                  to understand our practices.
                  </li>
                  <li>
                  Please review our Privacy Policy, 
                  which also governs your visit to this Site, 
                  to understand our practices.
                  </li>
                  <li>
                  Please review our Privacy Policy, 
                  which also governs your visit to this Site, 
                  to understand our practices.
                  </li>
                </ul>
                <br />
                <br />
                <h4>LINKED SITES</h4>
                <br />
                <ul>
                  <li>
                    “This Site may contain links to other independent third-party Web sites ("Linked Sites”).
                  </li>
                  <li>
                  This Site may contain links to other independent third-party Web sites ("Linked Sites”).
                  </li>
                  <li>
                  This Site may contain links to other independent third-party Web sites ("Linked Sites”).
                  </li>
                  <li>
                  This Site may contain links to other independent third-party Web sites ("Linked Sites”).
                   These Linked Sites are provided solely as a convenience to our visitors.
                  </li>
                  <li>
                  This Site may contain links to other independent third-party Web sites ("Linked Sites”).
                   These Linked Sites are provided solely as a convenience to our visitors.
                  </li>
                  <li>
                  This Site may contain links to other independent third-party Web sites ("Linked Sites”).
                   These Linked Sites are provided solely as a convenience to our visitors.
                  </li>
                </ul>
                <br />
                <br />
                <h4>FORWARD LOOKING STATEMENTS</h4>
                <br />
                <ul>
                  <li>
                    “All materials reproduced on this site speak as of the original date 
                    of publication or filing. The fact that a document is available on this
                    site does not mean that the information contained in such document 
                    has not been modified or superseded by events or by a subsequent document or filing
                  </li>
                  <li>
                  “All materials reproduced on this site speak as of the original date 
                    of publication or filing. The fact that a document is available on this
                    site does not mean that the information contained in such document 
                    has not been modified or superseded by events or by a subsequent document or filing
                  </li>
                  <li>
                  “All materials reproduced on this site speak as of the original date 
                    of publication or filing. The fact that a document is available on this
                    site does not mean that the information contained in such document 
                    has not been modified or superseded by events or by a subsequent document or filing
                  </li>
                  <li>
                  “All materials reproduced on this site speak as of the original date 
                    of publication or filing. The fact that a document is available on this
                    site does not mean that the information contained in such document 
                    has not been modified or superseded by events or by a subsequent document or filing
                  </li>
                </ul>
                <br />
              </Paper>
            </Grid> 
          </Grid>
          </Layout>
         </>
}

export default Terms_Condition;
