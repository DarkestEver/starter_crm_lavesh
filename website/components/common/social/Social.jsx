import { BsPinterest } from "react-icons/bs"
const Social = () => {
  const socialContent = [
    { id: 1, icon: "icon-facebook", link: "https://www.facebook.com/EurasiaB2BGlobalDMC/", ariaLabel: "Facebook" },
    { id: 2, icon: "icon-twitter", link: "https://twitter.com/Eurasiab2bdmc", ariaLabel: "Twitter" },
    { id: 3, icon: "icon-instagram", link: "https://www.instagram.com/eurasia_global_dmc/?hl=en", ariaLabel: "Instagram" },
    { id: 4, icon: "icon-linkedin", link: "https://www.linkedin.com/company/eurasia-b2b-global-dmc-pvt-ltd/", ariaLabel: "Linkedin" },
    { id: 5, icon: "icon-pinterest", link: "https://www.pinterest.com/eurasiab2bglobaldmcpvtltd/", ariaLabel: "Pinterest" },
  ];
  return (
    <>
      {socialContent.map((item) => (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          key={item.id}
          aria-label={item.ariaLabel}
        >
          { item.icon === 'icon-pinterest' ?
            <BsPinterest className="d-flex items-center" size={14} /> :  
            <i className={`${item.icon} text-14`} />
          }
        </a>
      ))}
    </>
  );
};

export default Social;
