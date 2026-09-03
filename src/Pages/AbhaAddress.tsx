import { useState } from "react";
import {
  FiCheckCircle,
  FiEdit3,
  FiInfo,
  FiLoader,
  FiUser,
} from "react-icons/fi";
import Navbar from "../components/Navbar";

interface AbhaAddressProps {
  suggestions?: string[];
  onCreate?: (address: string) => Promise<void> | void;
}

const AbhaAddress = ({
  suggestions = ["anant123", "anant.123", "anant_gupta"],
  onCreate,
}: AbhaAddressProps) => {
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<string>("");

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9._]/g, "");

    if (value.length <= 18) {
      setAddress(value);
      setSelectedSuggestion("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setAddress(suggestion);
    setSelectedSuggestion(suggestion);
  };

  const handleCreate = async () => {
    if (address.length < 8) {
      return;
    }

    if (address.length > 18) {
      return;
    }

    try {
      setLoading(true);

      const fullAddress = `${address}@abdm`;

      if (onCreate) {
        await onCreate(fullAddress);
      } else {
        console.log("ABHA Address:", fullAddress);
      }
    } catch (error) {
      console.error("ABHA address creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const isValid =
    address.length >= 8 && address.length <= 18;

  return (
    <div>
        <Navbar/>
<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg sm:p-8">

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
            <FiUser className="text-3xl text-blue-600" />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            Create Your Unique ABHA Address
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Create a unique address that can be used to access
            and share your health records.
          </p>
        </div>

        {/* ABHA Address Input */}
        <div className="mt-7">
          <label
            htmlFor="abha-address"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            ABHA Address
          </label>

          <div
            className={`flex overflow-hidden rounded-lg border bg-white transition ${
              address.length > 0
                ? isValid
                  ? "border-green-500 ring-2 ring-green-100"
                  : "border-red-400 ring-2 ring-red-100"
                : "border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
            }`}
          >
            <div className="flex flex-1 items-center">
              <FiEdit3 className="ml-3 text-gray-400" />

              <input
                id="abha-address"
                type="text"
                value={address}
                onChange={handleAddressChange}
                placeholder="Enter your ABHA address"
                maxLength={18}
                className="w-full px-3 py-3 outline-none"
              />
            </div>

            <div className="flex items-center bg-gray-100 px-4 text-sm font-semibold text-gray-600">
              @abdm
            </div>
          </div>

          {/* Character count */}
          <div className="mt-2 flex items-center justify-between">
            <p
              className={`text-xs ${
                address.length > 0 && !isValid
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              {address.length < 8
                ? "Minimum 8 characters required"
                : "Address format looks good"}
            </p>

            <span className="text-xs text-gray-400">
              {address.length}/18
            </span>
          </div>
        </div>

        {/* Rules */}
        <div className="mt-5 rounded-lg bg-blue-50 p-4">
          <div className="flex gap-3">
            <FiInfo className="mt-0.5 shrink-0 text-blue-600" />

            <div>
              <p className="text-sm font-semibold text-blue-800">
                ABHA Address Rules
              </p>

              <ul className="mt-2 space-y-1 text-xs text-blue-700">
                <li>• Must contain 8–18 characters</li>
                <li>• Letters and numbers are allowed</li>
                <li>• Dot (.) and underscore (_) are allowed</li>
                <li>• Your address will end with @abdm</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-7">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">
              Suggested ABHA Addresses
            </h2>

            <span className="text-xs text-gray-400">
              Choose one
            </span>
          </div>

          <div className="space-y-2">
            {suggestions.map((suggestion) => {
              const isSelected =
                selectedSuggestion === suggestion;

              return (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() =>
                    handleSuggestionClick(suggestion)
                  }
                  className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FiUser className="text-gray-400" />

                    <span className="text-sm font-medium">
                      {suggestion}
                      <span className="text-gray-400">
                        @abdm
                      </span>
                    </span>
                  </div>

                  {isSelected && (
                    <FiCheckCircle className="text-lg text-blue-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Create Button */}
        <button
          type="button"
          onClick={handleCreate}
          disabled={!isValid || loading}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin text-lg" />
              Creating ABHA Address...
            </>
          ) : (
            <>
              <FiCheckCircle className="text-lg" />
              Create ABHA
            </>
          )}
        </button>

        {/* Selected Address */}
        {isValid && (
          <div className="mt-4 rounded-lg bg-gray-50 p-3 text-center">
            <p className="text-xs text-gray-400">
              Your ABHA Address
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-700">
              {address}@abdm
            </p>
          </div>
        )}
      </div>
    </div>
    </div>
    
  );
};

export default AbhaAddress;