import { useState } from "react";
import {
  FiUser,
  FiCalendar,
  FiHeart,
  FiGlobe,
  FiBriefcase,
  FiPhone,
  FiMail,
  FiMapPin,
  FiHome,
  FiUsers,
} from "react-icons/fi";
import Navbar from "../components/Navbar";

interface FormData {
  // Demographic Details
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  age: string;
  bloodGroup: string;
  nationality: string;
  occupation: string;

  // Contact Details
  mobileNumber: string;
  alternateMobile: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  state: string;
  country: string;
  pinCode: string;

  // Emergency Contact
  emergencyContactName: string;
  relationship: string;
  emergencyMobileNumber: string;
  emergencyAlternateNumber: string;
  emergencyAddress: string;
}

const PersonalDetailes = () => {
  const [formData, setFormData] = useState<FormData>({
    // Demographic Details
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    age: "",
    bloodGroup: "",
    nationality: "",
    occupation: "",

    // Contact Details
    mobileNumber: "",
    alternateMobile: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pinCode: "",

    // Emergency Contact
    emergencyContactName: "",
    relationship: "",
    emergencyMobileNumber: "",
    emergencyAlternateNumber: "",
    emergencyAddress: "",
  });

  // Calculate Age
  const calculateAge = (dob: string) => {
    if (!dob) return "";

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference =
      today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 0 ? age.toString() : "";
  };

  // Handle input/select changes
  const handleChange = (
      e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
  ) => {
    const { name, value } = e.target;

    if (name === "dateOfBirth") {
      setFormData((prev) => ({
        ...prev,
        dateOfBirth: value,
        age: calculateAge(value),
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Patient Data:", formData);
  };

  return (

    <div>
<Navbar/>
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      <div className="mx-auto max-w-5xl">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Patient Registration
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Enter patient demographic, contact and emergency details
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* ================================================= */}
          {/* DEMOGRAPHIC DETAILS */}
          {/* ================================================= */}

          <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            {/* Section Header */}
            <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <FiUser size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Demographic Details
                </h2>

                <p className="text-sm text-gray-500">
                  Enter the patient's personal information
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* First Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  First Name
                </label>

                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Middle Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Middle Name
                </label>

                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    placeholder="Enter middle name"
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Last Name
                </label>

                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Gender
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>

                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Age
                </label>

                <input
                  type="text"
                  value={
                    formData.age
                      ? `${formData.age} years`
                      : ""
                  }
                  readOnly
                  placeholder="Auto calculated"
                  className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-500 outline-none"
                />
              </div>

              {/* Blood Group */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Blood Group
                </label>

                <div className="relative">
                  <FiHeart className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              {/* Nationality */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Nationality
                </label>

                <div className="relative">
                  <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <select
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">
                      Select Nationality
                    </option>
                    <option value="indian">Indian</option>
                    <option value="american">American</option>
                    <option value="british">British</option>
                    <option value="canadian">Canadian</option>
                    <option value="australian">Australian</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Occupation */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Occupation
                </label>

                <div className="relative">
                  <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="Enter occupation"
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

            </div>
          </div>


          {/* ================================================= */}
          {/* CONTACT DETAILS */}
          {/* ================================================= */}

          <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            {/* Header */}
            <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <FiPhone size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Contact Details
                </h2>

                <p className="text-sm text-gray-500">
                  Enter patient's contact and address information
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Mobile Number */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Mobile Number <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    maxLength={10}
                    required
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Alternate Mobile */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Alternate Mobile
                </label>

                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="tel"
                    name="alternateMobile"
                    value={formData.alternateMobile}
                    onChange={handleChange}
                    placeholder="Enter alternate mobile"
                    maxLength={10}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>

                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Address Line 1 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Address Line 1
                </label>

                <div className="relative">
                  <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    placeholder="House no., street, locality"
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Address Line 2 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Address Line 2
                </label>

                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  placeholder="Apartment, landmark, area"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* City */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  City
                </label>

                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* District */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  District
                </label>

                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="Enter district"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* State */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  State
                </label>

                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select State</option>
                  <option value="uttar-pradesh">
                    Uttar Pradesh
                  </option>
                  <option value="delhi">Delhi</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="west-bengal">West Bengal</option>
                  <option value="bihar">Bihar</option>
                  <option value="rajasthan">Rajasthan</option>
                  <option value="madhya-pradesh">
                    Madhya Pradesh
                  </option>
                  <option value="gujarat">Gujarat</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="tamil-nadu">Tamil Nadu</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Country */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Country
                </label>

                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Country</option>
                  <option value="india">India</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="canada">Canada</option>
                  <option value="australia">Australia</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* PIN Code */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  PIN Code
                </label>

                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  placeholder="Enter PIN code"
                  maxLength={6}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

            </div>
          </div>


          {/* ================================================= */}
          {/* EMERGENCY CONTACT */}
          {/* ================================================= */}

          <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            {/* Header */}
            <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <FiUsers size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Emergency Contact
                </h2>

                <p className="text-sm text-gray-500">
                  Add a person to contact during an emergency
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Emergency Contact Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Emergency Contact Name
                </label>

                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    placeholder="Enter contact name"
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Relationship */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Relationship
                </label>

                <select
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Relationship</option>
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="spouse">Spouse</option>
                  <option value="son">Son</option>
                  <option value="daughter">Daughter</option>
                  <option value="brother">Brother</option>
                  <option value="sister">Sister</option>
                  <option value="friend">Friend</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Emergency Mobile */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>

                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="tel"
                    name="emergencyMobileNumber"
                    value={formData.emergencyMobileNumber}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    maxLength={10}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Emergency Alternate Number */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Alternate Number
                </label>

                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="tel"
                    name="emergencyAlternateNumber"
                    value={formData.emergencyAlternateNumber}
                    onChange={handleChange}
                    placeholder="Enter alternate number"
                    maxLength={10}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Emergency Address */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Address
                </label>

                <div className="relative">
                  <FiMapPin className="absolute left-3 top-3 text-gray-400" />

                  <textarea
                    name="emergencyAddress"
                    value={formData.emergencyAddress}
                    onChange={handleChange}
                    placeholder="Enter emergency contact address"
                    rows={3}
                    className="w-full resize-none rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

            </div>
          </div>


          {/* ================================================= */}
          {/* SUBMIT BUTTON */}
          {/* ================================================= */}

          <div className="flex justify-end">

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-[0.98]"
            >
              Save Patient Details
            </button>

          </div>

        </form>
      </div>
    </div>
    </div>

  );
};

export default PersonalDetailes;