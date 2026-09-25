import { useState, type ChangeEvent, type FormEvent } from "react";

import {
  FaCalendarDays,
  FaClock,
  FaUserDoctor,
} from "react-icons/fa6";

import axios from "axios";

import type { Appointment } from "../../types/appointment";

interface AppointmentFormProps {
  onBookAppointment: (appointment: Appointment) => void;
}

// Initial/empty form values
const initialFormData = {
  patientName: "",
  mrn: "",
  age: "",
  gender: "",
  phone: "",
  doctor: "",
  appointmentDate: "",
  timeSlot: "",
  discount: "",
  authorizedBy: "",
  priority: "",
};

const AppointmentForm = ({
  onBookAppointment,
}: AppointmentFormProps) => {
  const [formData, setFormData] = useState(initialFormData);

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Convert 15:21:00 -> 03:21 PM
  const formatTime = (time: string) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":");

    const hour = Number(hours);

    const period = hour >= 12 ? "PM" : "AM";

    const formattedHour = hour % 12 || 12;

    return `${String(formattedHour).padStart(2, "0")}:${minutes} ${period}`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.appointmentDate) {
      alert("Please select appointment date");
      return;
    }

    if (!formData.timeSlot) {
      alert("Please select appointment time");
      return;
    }

    if (!formData.gender) {
      alert("Please select gender");
      return;
    }

    try {
      setLoading(true);

      const appointmentData = {
        patient_name: formData.patientName.trim(),
        mrn: formData.mrn.trim(),
        age: Number(formData.age),
        gender: formData.gender,
        phone: formData.phone.trim(),
        doctor_name: formData.doctor,
        authorized_by: formData.authorizedBy.trim(),
        appointment_date: formData.appointmentDate,
        time_slot: formData.timeSlot,
        priority: formData.priority,
        discount: Number(formData.discount || 0),
      };

      console.log(
        "Data being sent to backend:",
        appointmentData
      );

      const response = await axios.post(
        "http://localhost:8080/api/v3/appointment/create",
        appointmentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Backend response:", response.data);

      const result = response.data?.result;

      if (!result) {
        throw new Error(
          "Appointment created but backend result is missing."
        );
      }

      // Convert backend response to frontend Appointment type
    const createdAppointment: Appointment = {
  appointment_id: Number(result.appointment_id),

  patient_name: result.patient_name,
  mrn: result.mrn,
  age: Number(result.age),
  gender: result.gender,
  phone: result.phone,

  doctor_name: result.doctor_name,

  appointment_date: result.appointment_date,

  time_slot: formatTime(result.time_slot),

  fees: [
    {
      name: "OPD Follow Up Fee",
      amount: 0,
      selected: false,
    },
    {
      name: "Appointment Fee",
      amount: 0,
      selected: false,
    },
    {
      name: "Doctor Consultation Fee",
      amount: 600,
      selected: true,
    },
  ],

  discount: Number(result.discount || 0),

  authorized_by: result.authorized_by,

  priority: result.priority,

  created_at: result.created_at,
  updated_at: result.updated_at,
};

      console.log(
        "Final appointment object:",
        createdAppointment
      );

      // Send appointment to parent
      onBookAppointment(createdAppointment);

      // ⭐ RESET FORM AFTER SUCCESS
      setFormData(initialFormData);

      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Create appointment error:", error);

      if (axios.isAxiosError(error)) {
        console.error(
          "Server error:",
          error.response?.data
        );

        alert(
          error.response?.data?.message ||
            "Failed to create appointment"
        );
      } else {
        alert("Failed to create appointment");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-8 border-t border-gray-200 pt-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Book Appointment
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Enter patient appointment details
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
      >
        {/* Patient Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Patient Name
          </label>

          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* MRN */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            MRN
          </label>

          <input
            type="text"
            name="mrn"
            value={formData.mrn}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Age */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Age
          </label>

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            required
          />
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
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Phone
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Doctor */}
       <div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Doctor
  </label>

  <div className="relative">
    <FaUserDoctor className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

    <select
      name="doctor"
      value={formData.doctor}
      onChange={handleChange}
      className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
      required
    >
      <option value="">Select Doctor</option>

      <option value="Dr Ashay Rathore">
        Dr Ashay Rathore
      </option>

      <option value="Dr Sunil Mishra">
        Dr Sunil Mishra
      </option>

      <option value="Dr Surbhi Tiwari">
        Dr Surbhi Tiwari
      </option>

     
    </select>
  </div>
</div>

        {/* Appointment Date */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Appointment Date
          </label>

          <div className="relative">
            <FaCalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Time */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Time Slot
          </label>

          <div className="relative">
            <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="time"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Discount */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Discount
          </label>

          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            min="0"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Authorized By */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Authorized By
          </label>

          <input
            type="text"
            name="authorizedBy"
            value={formData.authorizedBy}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Priority */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Priority
          </label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            required
          >
            <option value="">Select Priority</option>
            <option value="Routine">Routine</option>
            <option value="Urgent">Urgent</option>
            <option value="Emergency">Emergency</option>
          </select>
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Booking Appointment..."
              : "Book Appointment"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AppointmentForm;