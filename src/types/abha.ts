export interface RequestOtpRequest {
  aadhaar: string;
}

export interface RequestOtpResponse {
  success: boolean;
  txnId: string;
  message: string;
}

export interface VerifyOtpRequest {
  txnId: string;
  otp: string;
  mobile: string;
}

export interface AbhaProfile {
  preferredAddress: string | null;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  dob: string | null;
  gender: string | null;
  mobile: string | null;
  mobileVerified: boolean | null;
  phrAddress: string[];
  address: string | null;
  districtCode: string | null;
  stateCode: string | null;
  pinCode: string | null;
  stateName: string | null;
  districtName: string | null;
  ABHANumber: string | null;
  abhaStatus: string | null;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  txnId: string;
  isNew: boolean | null;
  ABHAProfile: AbhaProfile | null;
}