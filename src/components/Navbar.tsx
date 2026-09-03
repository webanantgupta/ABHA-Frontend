import {
  FaChevronDown,
  FaUserCircle,
  FaHospital,
  FaAddressCard,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const leftMenus = [
    {
      name: "Home",
      active: true,
      dropdown: false,
      path: "/",
    },
    {
      name: "About Us",
      dropdown: true,
      path: "/about",
    },
    {
      name: "Resource Center",
      dropdown: true,
      path: "/resources",
    },
    {
      name: "Support",
      dropdown: true,
      path: "/support",
    },
  ];

  const rightMenus = [
    {
      name: "ABHA Login",
      icon: <FaUserCircle />,
      path: "/abha-login",
    },
    {
      name: "Facility Login",
      icon: <FaHospital />,
      path: "/facility-login",
    },
    {
      name: "ABHA Address",
      icon: <FaAddressCard />,
      path: "/abha-address",
    },
  ];

  return (
    <header className="w-full shadow-sm">

      {/* Top Header */}
      <div className="flex items-center justify-between bg-white px-10 py-3">

        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-5">
            <img
              src="/logo.png"
              alt="logo"
              className="h-14 object-contain"
            />
          </div>
        </Link>

        {/* Create ABHA */}
        <Link
          to="/create-abha"
          className="cursor-pointer rounded bg-[#D9742B] px-7 py-3 font-semibold text-white transition hover:bg-[#c76620]"
        >
          Create ABHA Number
        </Link>
      </div>

      {/* Bottom Navbar */}
      <nav className="bg-[#22448C] text-white">

        <div className="flex justify-between">

          {/* Left Menu */}
          <div className="flex">

            {leftMenus.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex h-14 items-center gap-2 border-r border-blue-500 px-5 transition hover:bg-[#2c56ab] ${
                  item.active
                    ? "after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-orange-500"
                    : ""
                }`}
              >
                <span>{item.name}</span>

                {item.dropdown && (
                  <FaChevronDown size={12} />
                )}
              </Link>
            ))}

          </div>

          {/* Right Menu */}
          <div className="flex">

            {rightMenus.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex h-14 items-center gap-2 border-l border-blue-500 px-6 transition hover:bg-[#2c56ab]"
              >
                {item.icon}

                <span>{item.name}</span>
              </Link>
            ))}

          </div>

        </div>

      </nav>
    </header>
  );
};

export default Navbar;
