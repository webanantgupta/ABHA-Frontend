import { Link } from "react-router-dom";
import { FaIdCard, FaFingerprint } from "react-icons/fa";
import Navbar from "../components/Navbar";

const RegisterAbha = () => {
  const options = [
    {
      id: 1,
      title: "Create your ABHA number using",
      type: "Aadhaar",
      icon: <FaFingerprint className="text-6xl text-[#244B94]" />,
      path: "/register/aadhaar",
    },
    {
      id: 2,
      title: "Create your ABHA number using",
      type: "Driving Licence",
      icon: <FaIdCard className="text-6xl text-[#244B94]" />,
      path: "/register/driving-licence",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="bg-[#fdfdfd] min-h-screen py-5">
        <div className="max-w-5xl mx-auto px-5">

          {/* Heading */}

          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#244B94]">
              Create ABHA Number
            </h2>

            <p className="mt-3 text-gray-700 text-lg">
              Please choose one of the below options to start with the
              creation of your ABHA.
            </p>
          </div>

          {/* Cards */}

          <div className="grid md:grid-cols-2 gap-8 mt-8">

            {options.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="
                bg-white
                rounded-xl
                border
                border-gray-200
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-2
                transition-all
                duration-300
                h-72
                flex
                flex-col
                justify-center
                items-center
                cursor-pointer
                "
              >
                <div className="mb-6">{item.icon}</div>

                <p className="text-2xl font-medium text-[#244B94]">
                  {item.title}
                </p>

                <h3 className="mt-3 text-1xl font-semibold text-[#D66D2D]">
                  {item.type}
                </h3>
              </Link>
            ))}

          </div>

          {/* Divider */}

          <div className="border-t mt-10"></div>

          {/* Login */}

          <div className="text-center mt-8 text-xl">
            <span className="text-gray-800">
              Already have ABHA number?
            </span>

            <Link
              to="/login"
              className="ml-2 text-[#D66D2D] font-semibold hover:underline"
            >
              Login
            </Link>
          </div>

        </div>
      </section>
    </>
  );
};

export default RegisterAbha;