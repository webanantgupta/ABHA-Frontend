import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="w-full bg-white border-b-4 border-[#1F4E95]">
      <div className="max-w-7xl mx-auto px-8 lg:px-4 py-4 ">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left Content */}

          <div>

            <h3 className="text-4xl lg:text-4xl font-bold text-[#244B94] leading-tight">
              Create Ayushman Bharat Health
              <br />
              Account - ABHA Number
            </h3>

            <h4 className="mt-5 text-xl font-semibold text-[#244B94]">
              Creating India's Digital Health Mission
            </h4>

            <p className="mt-4 text-gray-700 text-lg">
              ABHA - Ayushman Bharat Health Account - Key to your
              digital healthcare journey.
            </p>

            <Link
            to="/patient-form"
              className="
                mt-8
                bg-[#D66D2D]
                hover:bg-[#bf5f25]
                text-white
                px-8
                py-4
                rounded-md
                font-semibold
                flex
                items-center
                gap-3
                transition-all
                duration-300
                hover:gap-5
                cursor-pointer
                w-70
              "
            >
              Login ABHA Number
              <FaArrowRight />
            </Link>

            <div className="mt-4 ">
              <span className="text-gray-700">
                Already have ABHA number?
              </span>

              <button className="ml-2 text-[#D66D2D] font-semibold hover:underline">
                Login
              </button>

              <span className="mx-2 text-gray-400">|</span>

              <button className="text-[#D66D2D] font-semibold hover:underline">
                Find ABHA using mobile number
              </button>
            </div>

          </div>

          {/* Right Image */}

          <div className="flex justify-center lg:justify-end">

            <img
              src="/hero-image.png"
              alt="ABHA Illustration"
              className="w-full max-w-xl object-contain"
            />

          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;