
import logo from "../../assets/logo-baru.png";

import Navlist from "../../Component/Element/Navlist/Navlist";

const NavbarLogin = () => {
  return (
    <div className="sticky top-0 z-50 h-32 bg-white shadow-lg bg-opacity-80">
      <div className="container flex items-center justify-between px-4 py-2 mx-auto">
        <img className="w-36 md:w-40" src={logo} alt="logo" />

        <div className="items-center hidden space-x-6 md:flex">
          <Navlist />
        </div>

      <h1>Profile disini</h1>
      </div>
    </div>
  );
};

export default NavbarLogin;
