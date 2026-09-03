import type { AbhaProfile as AbhaProfileType } from "../../types/abha";
import PayButton from "../PayButton";

interface AbhaProfileProps {
  profile?: AbhaProfileType | null;
  isNew?: boolean | null;
}

const AbhaProfile = ({
  profile,
  isNew,
}: AbhaProfileProps) => {

  // -----------------------------------------------------
  // Safety check
  // -----------------------------------------------------

  if (!profile) {
    return (
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <span className="text-2xl">!</span>
        </div>

        <h2 className="text-xl font-bold text-gray-800">
          Profile Data Not Available
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          ABHA profile information was not received from the server.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">

      {/* =====================================================
          Profile Header
      ===================================================== */}

      <div className="border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-7 text-white md:px-8">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            {/* Profile Icon */}

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-xl font-bold">
              AB
            </div>

            <div>
              <p className="text-sm font-medium text-blue-100">
                Ayushman Bharat Health Account
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                ABHA Profile
              </h2>

              <p className="mt-1 text-sm text-blue-100">
                {isNew
                  ? "New ABHA profile created successfully"
                  : "Existing ABHA profile"}
              </p>
            </div>

          </div>

          {/* Status */}

          <div className="w-fit rounded-full bg-white px-4 py-2 text-sm font-semibold text-green-600 shadow-sm">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500"></span>
            {profile.abhaStatus || "ACTIVE"}
          </div>

        </div>

      </div>


      {/* =====================================================
          Main Content
      ===================================================== */}

      <div className="p-6 md:p-8">


        {/* =====================================================
            ABHA Identification
        ===================================================== */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* ABHA Number */}

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">

            <div className="mb-3 flex items-center justify-between">

              <p className="text-sm font-semibold text-blue-600">
                ABHA Number
              </p>

              <span className="rounded-lg bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600">
                ID
              </span>

            </div>

            <p className="text-2xl font-bold tracking-wider text-blue-950">
              {profile.ABHANumber || "N/A"}
            </p>

            <p className="mt-2 text-xs text-blue-600">
              Your unique 14-digit ABHA identifier
            </p>

          </div>


          {/* ABHA Address */}

          <div className="rounded-2xl border border-purple-100 bg-purple-50 p-6">

            <div className="mb-3 flex items-center justify-between">

              <p className="text-sm font-semibold text-purple-600">
                ABHA Address
              </p>

              <span className="rounded-lg bg-purple-100 px-2 py-1 text-xs font-medium text-purple-600">
                ADDRESS
              </span>

            </div>

            <p className="break-all text-xl font-bold text-purple-950">
              {profile.preferredAddress || "N/A"}
            </p>

            <p className="mt-2 text-xs text-purple-600">
              Your health-record address
            </p>

          </div>

        </div>


        {/* =====================================================
            Personal Information
        ===================================================== */}

        <div className="mt-8">

          <div className="mb-4">

            <h3 className="text-xl font-bold text-gray-900">
              Personal Information
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Information associated with your ABHA profile
            </p>

          </div>


          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <InfoItem
              label="First Name"
              value={profile.firstName}
            />

            <InfoItem
              label="Middle Name"
              value={profile.middleName}
            />

            <InfoItem
              label="Last Name"
              value={profile.lastName}
            />

            <InfoItem
              label="Date of Birth"
              value={profile.dob}
            />

            <InfoItem
              label="Gender"
              value={
                profile.gender === "M"
                  ? "Male"
                  : profile.gender === "F"
                  ? "Female"
                  : profile.gender
              }
            />

            <InfoItem
              label="Mobile"
              value={profile.mobile}
            />

            <InfoItem
              label="District"
              value={profile.districtName}
            />

            <InfoItem
              label="State"
              value={profile.stateName}
            />

            <InfoItem
              label="PIN Code"
              value={profile.pinCode}
            />

          </div>


          {/* Mobile Verification */}

          <div className="mt-4 flex items-center justify-between rounded-xl border border-green-100 bg-green-50 px-5 py-4">

            <div>

              <p className="text-sm font-semibold text-gray-800">
                Mobile Verification
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Status of the mobile number associated with ABHA
              </p>

            </div>

            <span
              className={`rounded-full px-4 py-2 text-xs font-bold ${
                profile.mobileVerified
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {profile.mobileVerified
                ? "Verified"
                : "Not Verified"}
            </span>

          </div>

        </div>


        {/* =====================================================
            Address
        ===================================================== */}

        <div className="mt-8">

          <div className="mb-4">

            <h3 className="text-xl font-bold text-gray-900">
              Address
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Registered address information
            </p>

          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">

            <p className="text-sm leading-7 text-gray-700">
              {profile.address || "N/A"}
            </p>

          </div>

        </div>


        {/* =====================================================
            PHR Addresses
        ===================================================== */}

        {profile.phrAddress?.length > 0 && (

          <div className="mt-8">

            <div className="mb-4">

              <h3 className="text-xl font-bold text-gray-900">
                PHR Addresses
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Health-record addresses associated with this profile
              </p>

            </div>

            <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5">

              <div className="flex flex-wrap gap-3">

                {profile.phrAddress.map(
                  (address) => (

                    <span
                      key={address}
                      className="rounded-full border border-purple-200 bg-white px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm"
                    >
                      {address}
                    </span>

                  )
                )}

              </div>

            </div>

          </div>

        )}


        {/* =====================================================
            Payment
        ===================================================== */}

        <div className=" border-t border-gray-200 pt-8">

          <div className="mb-5">

            <h3 className="text-xl font-bold text-gray-900">
              Payment
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Complete your payment securely using PhonePe.
            </p>

          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50">

            <PayButton />

          </div>

        </div>

      </div>

    </div>
  );
};


// =====================================================
// Info Item
// =====================================================

interface InfoItemProps {
  label: string;
  value: string | null | undefined;
}

const InfoItem = ({
  label,
  value,
}: InfoItemProps) => {

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm">

      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-gray-900">
        {value || "N/A"}
      </p>

    </div>
  );
};


export default AbhaProfile;
