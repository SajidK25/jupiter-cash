import { type LoaderFunction, type ActionFunction } from "@remix-run/node";
import { db } from "~/lib/db.server";
import formatNumber from "~/lib/formatCardNumber.server";

export const action: ActionFunction = async ({ request, context }) => {
  let formData: FormData = await request.formData();
  const cardNumber = formData.get("ghcard_number") as string;
  const cardnumber = formatNumber(cardNumber);
  const user = await db.user.create({
    data: {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      personal_phone1: formData.get("personal_phone1") as string,
      personal_phone2: formData.get("personal_phone2") as string,
      email: formData.get("email") as string,
      otp: Number(formData.get("otp") as string),
      dob: new Date(formData.get("dob") as string),
      gender: formData.get("gender") as string,
      ghcard_number: cardnumber,
      ghcard_img: formData.get("ghcard_image") as string,
      marital_status: formData.get("marital_status") as string,
      education: formData.get("education") as string,
      residential_address: formData.get("residential_address") as string,
      religion: formData.get("religion") as string,
      city: formData.get("city") as string,
      area: formData.get("area") as string,
      landmark: formData.get("landmark") as string,
      company_name: formData.get("company_name") as string,
      company_phone: formData.get("company_phone") as string,
      company_location: formData.get("company_location") as string,
      company_city: formData.get("company_city") as string,
      company_landmark: formData.get("company_landmark") as string,
      monthly_income: formData.get("monthly_income") as string,
      designation: formData.get("designation") as string,
      fm1_fullname: formData.get("fm1_fullname") as string,
      fmm1_relationship: formData.get("fm1_relationship") as string,
      fm1_phonenumber: formData.get("fm1_phonenumber") as string,
      fmm2_fullname: formData.get("fm2_fullname") as string,
      fmm2_phone_number: formData.get("fm2_phonenumber") as string,
      fmm2_relationship: formData.get("fm2_relationship") as string,
      co_worker_fullname: formData.get("co_worker_fullname") as string,
      co_worker_phone: formData.get("co_worker_phone") as string,
      co_worker_relationship: formData.get("co_worker_relationship") as string,
      wallet_network: formData.get("wallet_network") as string,
      wallet_name: formData.get("wallet_name") as string,
      wallet_number: formData.get("wallet_number") as string,
    },
    select: {
      otp: true,
      personal_phone1: true,
    },
  });
  return user;
};

export const loader: LoaderFunction = async ({ request }) => {
  /// return await verifyUser(request);
  return true;
};
