import CategoriesMegaMenu from "./CategoriesMegaMenu";
import Link from "next/link";
import { useRouter } from "next/router";

const MainMenu = ({ style = "" }) => {
  const router = useRouter();

  return (
    <nav className="menu js-navList flex justify-content-center">
      <ul className={`menu__nav ${style} -is-active`}>
        <li
          className={router.pathname === "/" ? "current" : ""}
        >
          <Link href="/">Home</Link>
        </li>

        <li className="menu-item-has-children -has-mega-menu">
          <a href="#" >
            <span className="mr-10">Destinations</span>
            <i className="icon icon-chevron-sm-down" />
          </a>
          <div className="mega">
            <CategoriesMegaMenu />
          </div>
        </li>

        <li className={router.pathname === "/testimonials" ? "current" : ""}>
          <Link href="/testimonials">Testimonials</Link>
        </li>

        <li
          className={router.pathname === "/about" ? "current" : ""}
        >
          <Link href="/about">About Us</Link>
        </li>

        <li
          className={router.pathname === "/blog" ? "current" : ""}
        >
          <Link href="https://blog.eurasiaglobal.net">Blogs</Link>
        </li>

      </ul>
    </nav>
  );
};

export default MainMenu;
