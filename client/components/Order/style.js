import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(Theme =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    outerPass:{
    border:"2px solid #283593",
    borderRadius:"10px",
    margin:"10px 0px 20px 0px",
    padding:"20px 10px 20px 10px"
    },
    AppBarColor:{
      background:"#000066"
    },
    inputRoot: {
      color: 'inherit',
    },
    sectionDesktop: {
      display: 'none',
      [Theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [Theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    root: {
      flexGrow: 1,
      marginLeft:"5%",
      marginRight:"5%",
      marginTop:"5%",
    },
    paper: {
      padding: 20,
      textAlign: "center",
      color: Theme.palette.text.secondary,
      fontFamily: "Roboto",

    },
    allOrders:{
      overflow:"none",
      flexGrow: 1,
      borderRadius:"10px",
      width:"600px",
      minWidth:"400px",
      maxWidth:"1000px",
      WebkitBoxShadow:"2px 2px 2px 2px #9E9E9E",
      MozBoxShadow :"2px 2px 2px 2px #9E9E9E",
      boxShadow:"2px 2px 2px 2px #9E9E9E"
    },
    particularOrder: {
      flex:1,
      marginLeft:"2%",
      marginRight:"2%",
      marginBottom:"3%",
      paddingLeft:"5px",
      paddingRight:"5px",
    border:"2px solid #283593",
      borderWidth:"1.5px",
      paddingBottom:"10px",
      paddingTop:"10px"
    },
    innerDetails:{
      padding:"4px 8px 1px 5px",
      color:"grey",
    },
    promocode:{
      WebkitBoxShadow:"2px 2px 2px 2px #9E9E9E",
      MozBoxShadow :"2px 2px 2px 2px #9E9E9E",
      boxShadow:"2px 2px 2px 2px #9E9E9E",
      paddingTop:"10px",
      // maxHeight:"50px",
      minHeight:"50px",
      paddingLeft:"2px",

    },

    orderFull:{
      WebkitBoxShadow:"2px 2px 2px 2px #9E9E9E",
      MozBoxShadow :"2px 2px 2px 2px #9E9E9E",
      boxShadow:"2px 2px 2px 2px #9E9E9E",
      borderRadius:"10px",



    },
    Services :{
      WebkitBoxShadow:"2px 2px 2px 2px #9E9E9E",
      MozBoxShadow :"2px 2px 2px 2px #9E9E9E",
      boxShadow:"2px 2px 2px 2px #9E9E9E",
      paddingTop:"10px",
      paddingBottom:"5px",
      borderRadius:"10px",
    },

    outerDetails:{
      padding:"10px 8px 2px 5px",
      color:"#000066",
    },
    headingPart:{
      borderRadius:"4px 4px 0px 0px",
      marginLeft:"2%",
      marginRight:"2%",
      backgroundColor:"#2a306c",
      color:"white"
    },
    wholeList:{
      paddingBottom:"5px",
      borderColor:"#000066",
      borderWidth:"1.5px",
    },
    mobileButton:{
    maringBottom:"0%",
    width:"100%",
    backgroundColor:"#04bdbd",
    color:"white",
    fontWeight:"bold",
    marginTop:"10px",
    height:"40px"
    },
    buttonMobile:{
      padding:"5px!important",
      color:"white!important",
      fontWeight:800,
      background:"#04bdbd!important",
      top:'auto',
      bottom:0
    },

    porterDetails:{
      marginLeft:"20px",
      marginRight:"20px",
      marginTop:"10px"
    }
  }));

export default useStyles;
