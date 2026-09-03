
import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  FaUser,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaLocationArrow,
  FaArrowRight,
} from "react-icons/fa";

interface FormData {
  name: string;
  yearOfBirth: string;
  dateOfBirth: string;
  gender: string;
  state: string;
  district: string;
  address: string;
  email: string;
  mobile: string;
  abhaNumber: string;

}

const CreateAbhaNumber = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    yearOfBirth: "",
    dateOfBirth: "",
    gender: "",
    state: "",
    district: "",
    address: "",
    email: "",
    mobile: "",
    abhaNumber: ""
  });

//   const [locationLoading, setLocationLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mandatory field validation
    if (!formData.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!formData.yearOfBirth) {
      alert("Please enter your year of birth.");
      return;
    }

    if (!formData.gender) {
      alert("Please select your gender.");
      return;
    }

    if (!formData.state) {
      alert("Please select your state.");
      return;
    }

    if (!formData.district) {
      alert("Please select your district.");
      return;
    }

    if (!formData.email.trim()) {
      alert("Please enter your email address.");
      return;
    }

  

    console.log("ABHA Registration Data:", formData);

    // Connect your ABDM/backend API here
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex justify-center px-4 py-10">
        <div className="w-full max-w-4xl">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mb-4">
              <FaIdCard size={28} />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              Create ABHA Number
            </h1>

            <p className="mt-2 text-slate-500">
              Enter your details to create your Ayushman Bharat Health Account
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">

            {/* Card Header */}
            <div className="bg-blue-600 px-6 py-5 text-white">
              <h2 className="text-xl font-semibold">
                Personal Information
              </h2>

              <p className="text-sm text-blue-100 mt-1">
                Fields marked with * are mandatory
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-8 space-y-8"
            >

              {/* =====================================
                  PERSONAL INFORMATION
              ====================================== */}

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-5">
                  Personal Details
                </h3>

                <div className="grid md:grid-cols-2 gap-5">

                  {/* Name */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Full Name *
                    </label>

                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>

                  {/* Year of Birth */}
                  <div>
                    <label
                      htmlFor="yearOfBirth"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Year of Birth *
                    </label>

                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        id="yearOfBirth"
                        name="yearOfBirth"
                        type="number"
                        value={formData.yearOfBirth}
                        onChange={handleChange}
                        placeholder="YYYY"
                        min="1900"
                        max={new Date().getFullYear()}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>

                  {/* Date / Month of Birth */}
                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Date / Month of Birth
                      <span className="font-normal text-slate-400">
                        {" "}
                        (Optional)
                      </span>
                    </label>

                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Gender *
                    </label>

                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200" />

              {/* =====================================
                  LOCATION INFORMATION
              ====================================== */}

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-5">
                  Location Details
                </h3>

                <div className="grid md:grid-cols-2 gap-5">

                  {/* State */}
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      State *
                    </label>

                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option value="">Select State</option>
                      <option value="uttar_pradesh">
                        Uttar Pradesh
                      </option>
                      <option value="delhi">Delhi</option>
                      <option value="maharashtra">
                        Maharashtra
                      </option>
                      <option value="west_bengal">
                        West Bengal
                      </option>
                      <option value="karnataka">
                        Karnataka
                      </option>
                      <option value="tamil_nadu">
                        Tamil Nadu
                      </option>
                      <option value="rajasthan">
                        Rajasthan
                      </option>
                      <option value="gujarat">
                        Gujarat
                      </option>
                      <option value="bihar">Bihar</option>
                      <option value="madhya_pradesh">
                        Madhya Pradesh
                      </option>
                    </select>
                  </div>

                  {/* District */}
                  <div>
                    <label
                      htmlFor="district"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      District *
                    </label>

                    <select
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option value="">Select District</option>
                      <option value="lucknow">Lucknow</option>
                      <option value="kanpur_nagar">
                        Kanpur Nagar
                      </option>
                      <option value="varanasi">Varanasi</option>
                      <option value="prayagraj">Prayagraj</option>
                      <option value="agra">Agra</option>
                      <option value="gorakhpur">Gorakhpur</option>
                    </select>
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Address
                      <span className="font-normal text-slate-400">
                        {" "}
                        (Optional)
                      </span>
                    </label>

                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-4 text-slate-400" />

                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your complete address"
                        rows={3}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200" />

              {/* =====================================
                  CONTACT INFORMATION
              ====================================== */}

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-5">
                  Contact Details
                </h3>

                <div className="grid md:grid-cols-2 gap-5">

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Email Address *
                    </label>

                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>

                  {/* Mobile */}
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Mobile Number
                      <span className="font-normal text-slate-400">
                        {" "}
                        (Optional)
                      </span>
                    </label>

                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="10 digit mobile number"
                        maxLength={10}
                        inputMode="numeric"
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200" />

              {/* =====================================
                  ABHA INFORMATION
              ====================================== */}

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-5">
                  ABHA Details
                </h3>

                <div>
                  <label
                    htmlFor="abhaNumber"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    ABHA Number
                    <span className="font-normal text-slate-400">
                      {" "}
                      (Optional)
                    </span>
                  </label>

                  <div className="relative">
                    <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      id="abhaNumber"
                      name="abhaNumber"
                      type="text"
                      value={formData.abhaNumber}
                      onChange={handleChange}
                      placeholder="Enter ABHA Number if already available"
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>

                  <p className="text-xs text-slate-400 mt-2">
                    Leave this field empty if you are creating a new ABHA
                    Number.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200" />

              {/* =====================================
                  GEO COORDINATES
              ====================================== */}


              {/* =====================================
                  CONSENT
              ====================================== */}

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <label className="flex items-start gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 accent-blue-600"
                  />

                  <span className="text-sm text-slate-600 leading-6">
                    I confirm that the information provided by me is accurate
                    and I consent to its processing for the purpose of
                    creating and managing my ABHA account.
                  </span>

                </label>
              </div>

              {/* Submit */}
              <div className="flex justify-end">

                <button
                  type="submit"
                  className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
                >
                  Continue
                  <FaArrowRight />
                </button>

              </div>

            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-slate-400 mt-6">
            ABHA registration • Please provide accurate information
          </p>

        </div>
      </div>
    </div>
  );
};

export default CreateAbhaNumber;
