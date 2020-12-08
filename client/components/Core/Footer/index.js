import Link from 'next/link';

const Footer = () => {
  return <div className="footer">
            <div className="row col container">
               <div className="col-md-3 footer-field">
                 <Link href="/about_us">
                   <a style={{ color: "white"}}>
                     About us
                   </a>
                 </Link>
               </div>
               <div className="col-md-3 footer-field">
                 <Link href="/contact_us">
                   <a style={{ color: "white"}}>
                     Contact us
                   </a>
                 </Link>
               </div>
               <div className="col-md-3 footer-field">
                 <Link href="/policy_privacy">
                   <a style={{ color: "white"}}>
                     Privacy policy
                   </a>
                 </Link>
               </div>
               <div className="col-md-3 footer-field">
                 <Link href="/terms_conditions">
                   <a style={{ color: "white"}}>
                    Terms & Conditions
                   </a>
                 </Link>
               </div>
            </div>
            <div className="row col">
               <div className="col-md-6 footer-field-left">
               Copyright © 2020 HiYatri
               </div>
               <div className="col-md-6 footer-field-right">
                 <img height={30} width={30} src="/images/facebook.svg" className="footer-icons"/>
                 <img height={30} width={30} src="/images/twitter.svg" className="footer-icons"/>
                 <img height={30} width={30} src="/images/linkedin.svg" style={{ backgroundColor:"white", borderRadius:"4px"}} className="footer-icons"/>
                 <img height={30} width={30} src="/images/instagram.svg" className="footer-icons"/>
               </div>
            </div>
         </div>
}

export default Footer;
