import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';

import ContactInfo from "./ContactInfo";
import Image from "next/image";
import Link from "next/link";
import Social from "../common/social/Social";

const MobileMenu = () => {

  return (
    <>
      <div className="pro-header d-flex align-items-center justify-between border-bottom-light">
        <Link href="/">
          <Image width={120} height={120} priority={true} src="/img/general/eurasia-global-logo.png" alt="logo icon" />
        </Link>

        <div
          className="fix-icon"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="icon icon-close"></i>
        </div>
      </div>
      <Sidebar style={{backgroundColor: "#ffffff",width: "100%"}}>
        <Menu
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}
        >
          <MenuItem component={<Link href="/home" />}> Home </MenuItem>

          <SubMenu label="Destinations"> 
            <MenuItem component={<Link href="/destination/turkey" />}>Turkey</MenuItem>
            <MenuItem component={<Link href="/destination/azerbaijan" />}>Azerbaijan</MenuItem>
            <MenuItem component={<Link href="/destination/kazakhstan" />}>Kazakhstan</MenuItem>
            <MenuItem component={<Link href="/destination/uzbekistan" />}>Uzbekistan</MenuItem>
            <MenuItem component={<Link href="/destination/russia" />}>Russia</MenuItem>
            <MenuItem component={<Link href="/destination/armenia" />}>Armenia</MenuItem>
            <MenuItem component={<Link href="/destination/georgia" />}>Georgia</MenuItem>
            <MenuItem component={<Link href="/destination/bishkek" />}>Bishkek</MenuItem>
          </SubMenu>

          <MenuItem component={<Link href="/testimonials" />}> Testimonials </MenuItem>
          <MenuItem component={<Link href="/about" />}> About Us </MenuItem>
          <MenuItem component={<Link href="https://blog.eurasiaglobal.net" />}> Blogs </MenuItem>
          <MenuItem component={<Link href="/contact" />}> Contact Us </MenuItem>
        </Menu>
      </Sidebar>

      
      <div className="mobile-footer px-20 py-5 border-top-light"></div>

      <div className="pro-footer">
        <ContactInfo />
        <div className="mt-10">
          <h5 className="text-16 fw-500 mb-10">Follow us on social media</h5>
          <div className="d-flex x-gap-20 items-center">
            <Social />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
