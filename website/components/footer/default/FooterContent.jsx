import React from 'react';
import Link from 'next/link';
import footerDataContent from '../../../data/footerContent';
import { BsInstagram, BsPinterest, BsFacebook, BsTwitter, BsLinkedin } from 'react-icons/bs';

const getIconComponent = (name) => {
  switch (name) {
    case 'Facebook':
      return <i className="icon-facebook text-14 mr-10" />;
    case 'Twitter':
      return <i className="icon-twitter text-14 mr-10" />;
    case 'Instagram':
      return <i className="icon-instagram text-14 mr-10" />;
    case 'LinkedIn':
      return <i className="icon-linkedin text-14 mr-10" />;
    case 'Pinterest':
      return <BsPinterest className="mr-10" size={14} />; 
    default:
      return null;
  }
};

const FooterContent = () => {
  return (
    <>
       {footerDataContent.map((item) => (
        <div className="col-xl-2 col-lg-4 col-sm-6" key={item.id}>
          <h5 className="text-16 fw-500 mb-30">{item.title}</h5>
          <div className="d-flex y-gap-10 flex-column">
            {item.menuList.map((menu) => (
              <Link href={menu.routerPath} key={menu.name}>
                <div>
                  {getIconComponent(menu.name)}
                  {menu.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default FooterContent;
