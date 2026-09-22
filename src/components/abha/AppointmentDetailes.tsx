import type { Appointment } from "../../types/appointment";

interface AppointmentDetailsProps {
  appointment: Appointment;
}

const AppointmentDetails = ({
  appointment,
}: AppointmentDetailsProps) => {

  // =====================================================
  // Calculate Total
  // =====================================================

  const totalAmount = appointment.fees
    .filter((fee) => fee.selected)
    .reduce(
      (total, fee) => total + fee.amount,
      0
    );

  const finalAmount =
    totalAmount - appointment.discount;

  return (
    <section className="mt-8 border-t border-gray-200 pt-8">

      {/* =====================================================
          Header
      ===================================================== */}

      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-900">
          Appointment Details
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Details of your booked appointment.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">

        {/* =====================================================
            Patient Information
        ===================================================== */}

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-blue-600">
            Patient Information
          </h4>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <InfoItem
              label="Patient Name"
              value={appointment.patientName}
            />

            <InfoItem
              label="MRN"
              value={appointment.mrn}
            />

            <InfoItem
              label="Age"
              value={String(appointment.age)}
            />

            <InfoItem
              label="Gender"
              value={appointment.gender}
            />

            <InfoItem
              label="Phone"
              value={appointment.phone}
            />

          </div>
        </div>


        {/* =====================================================
            Appointment Information
        ===================================================== */}

        <div className="mt-8">

          <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-blue-600">
            Appointment Information
          </h4>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <InfoItem
              label="Doctor"
              value={appointment.doctor}
            />

            <InfoItem
              label="Appointment Date"
              value={appointment.appointmentDate}
            />

            <InfoItem
              label="Time Slot"
              value={appointment.timeSlot}
            />

            <InfoItem
              label="Priority"
              value={appointment.priority}
            />

            <InfoItem
              label="Authorized By"
              value={appointment.authorizedBy}
            />

          </div>
        </div>


        {/* =====================================================
            Fee Details
        ===================================================== */}

        <div className="mt-8">

          <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-blue-600">
            Fee Details
          </h4>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

            {appointment.fees.map((fee) => (
              <div
                key={fee.name}
                className="flex items-center justify-between border-b border-gray-100 px-4 py-4 last:border-b-0"
              >

                <div>
                  <p className="font-medium text-gray-800">
                    {fee.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {fee.selected
                      ? "Selected"
                      : "Not selected"}
                  </p>
                </div>

                <p className="font-semibold text-gray-900">
                  ₹{fee.amount}
                </p>

              </div>
            ))}


            {/* Discount */}

            <div className="flex justify-between border-t border-gray-200 px-4 py-3">
              <span className="text-sm text-gray-600">
                Discount
              </span>

              <span className="text-sm font-semibold text-green-600">
                - ₹{appointment.discount}
              </span>
            </div>


            {/* Total */}

            <div className="flex justify-between bg-gray-50 px-4 py-4">

              <span className="font-bold text-gray-900">
                Total Amount
              </span>

              <span className="text-lg font-bold text-blue-600">
                ₹{finalAmount}
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


// =====================================================
// Info Item
// =====================================================

interface InfoItemProps {
  label: string;
  value: string;
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

export default AppointmentDetails;