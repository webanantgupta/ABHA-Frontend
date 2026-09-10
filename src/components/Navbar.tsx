import {
  FaChevronDown,
  FaUserCircle,
  FaHospital,
  FaAddressCard,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


const Navbar = () => {

  const {
    user,
    logout,
  } = useAuth();


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
    // {
    //   name: "ABHA Login",
    //   icon: <FaUserCircle />,
    //   path: "/abha-login",
    // },
    {
      name: "Patient Login",
      icon: <FaHospital />,
      path: "/patient-login",
    },
    // {
    //   name: "ABHA Address",
    //   icon: <FaAddressCard />,
    //   path: "/abha-address",
    // },
  ];


  return (

    <header className="w-full shadow-sm">

      {/* =====================================
          TOP HEADER
      ===================================== */}

      <div className="
        flex
        items-center
        justify-between
        bg-white
        px-10
        py-3
      ">

        {/* LOGO */}

        <Link to="/">

          <div className="flex items-center gap-5">

            <img
              src="/logo.png"
              alt="logo"
              className="h-14 object-contain"
            />

          </div>

        </Link>


        {/* =====================================
            RIGHT TOP SECTION
        ===================================== */}

        <div className="
          flex
          items-center
          gap-4
        ">


          {/* =====================================
              LOGGED-IN USER
          ===================================== */}

          {user && (

            <div className="
              flex
              items-center
              gap-2
              rounded-lg
              bg-blue-50
              px-4
              py-2
              text-blue-700
            ">

              <FaUserCircle />

              <span className="
                font-semibold
              ">

                {user.name}

              </span>

            </div>

          )}


          {/* =====================================
              GET ABHA PROFILE
          ===================================== */}

          <Link
            to="/patient-form"
            className="
              cursor-pointer
              rounded
              bg-[#D9742B]
              px-7
              py-3
              font-semibold
              text-white
              transition
              hover:bg-[#c76620]
            "
          >

            Get ABHA Profile

          </Link>

        </div>

      </div>


      {/* =====================================
          BOTTOM NAVBAR
      ===================================== */}

      <nav className="
        bg-[#22448C]
        text-white
      ">

        <div className="
          flex
          justify-between
        ">


          {/* =====================================
              LEFT MENU
          ===================================== */}

          <div className="flex">

            {leftMenus.map((item) => (

              <Link
                key={item.name}
                to={item.path}
                className={`
                  relative
                  flex
                  h-14
                  items-center
                  gap-2
                  border-r
                  border-blue-500
                  px-5
                  transition
                  hover:bg-[#2c56ab]

                  ${
                    item.active
                      ? "after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-orange-500"
                      : ""
                  }
                `}
              >

                <span>
                  {item.name}
                </span>


                {item.dropdown && (

                  <FaChevronDown
                    size={12}
                  />

                )}

              </Link>

            ))}

          </div>


          {/* =====================================
              RIGHT MENU
          ===================================== */}

          <div className="flex">


            {/* =====================================
                PAYMENT HISTORY
            ===================================== */}

            {user && (

              <Link
                to="/payment-history"
                className="
                  flex
                  h-14
                  items-center
                  gap-2
                  border-l
                  border-blue-500
                  px-6
                  transition
                  hover:bg-[#2c56ab]
                "
              >

                <FaHistory />

                <span>
                  Payment History
                </span>

              </Link>

            )}


            {/* =====================================
                ORIGINAL RIGHT MENUS
            ===================================== */}

            {rightMenus.map((item) => (

              <Link
                key={item.name}
                to={item.path}
                className="
                  flex
                  h-14
                  items-center
                  gap-2
                  border-l
                  border-blue-500
                  px-6
                  transition
                  hover:bg-[#2c56ab]
                "
              >

                {item.icon}

                <span>
                  {item.name}
                </span>

              </Link>

            ))}


            {/* =====================================
                LOGOUT
            ===================================== */}

            {user && (

              <button
                onClick={logout}
                className="
                  flex
                  h-14
                  items-center
                  gap-2
                  border-l
                  border-blue-500
                  px-6
                  transition
                  hover:bg-red-600
                "
              >

                <FaSignOutAlt />

                <span>
                  Logout
                </span>

              </button>

            )}

          </div>

        </div>

      </nav>

    </header>

  );

};


export default Navbar;