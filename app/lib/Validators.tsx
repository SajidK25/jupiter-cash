import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";

export const loginValidator = withZod(
  z.object({
    email: z
      .string()
      .min(1, "* This field is required")
      .email({ message: "Please enter a valid email address" }),
    password: z.string().min(1, " * This field is required"),
  })
);

export const userInfoValidator = withZod(
  z.object({
    first_name: z.string(),
    last_name: z.string(),
    personal_phone1: z.string(),
    personal_phone2: z.string(),
    email: z.string(),
    dob: z.string(),
    gender: z.string(),
    ghcard_number: z.string(),
    marital_status: z.string(),
    education: z.string(),
    residential_address: z.string(),
    city: z.string(),
    area: z.string(),
    landmark: z.string(),
  })
);
export const userEmploymentValidator = withZod(
  z.object({
    company_name: z.string(),
    company_phone: z.string(),
    company_location: z.string(),
    company_city: z.string(),
    company_landmark: z.string(),
    monthly_income: z.string(),
    designation: z.string(),
  })
);

export const userEmergencyContactValidator = withZod(
  z.object({
    fm1_fullname: z.string(),
    fm1_phonenumber: z.string(),
    fmm1_relationship: z.string(),
    fmm2_fullname: z.string(),
    fmm2_phone_number: z.string(),
    fmm2_relationship: z.string(),
    co_worker_fullname: z.string(),
    co_worker_phone: z.string(),
    co_worker_relationship: z.string(),
  })
);

export const walletInfoValidator = withZod(
  z.object({
    wallet_network: z.string(),
    wallet_number: z.string(),
    wallet_name: z.string(),
    otp: z.string(),
  })
);
