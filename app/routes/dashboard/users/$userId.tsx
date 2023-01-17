import Container from "@mui/material/Container";
import { type ActionFunction, type LoaderFunction } from "@remix-run/node";
import { SnackbarProvider } from "notistack";
import React from "react";
import EditDetails from "~/components/EditUserDetails";
import {
  getUser,
  updateUserDetails,
} from "~/controllers/userController.server";
import styles from "~/styles/global.css";

const UserDetails = () => {
  return (
    <SnackbarProvider>
      <Container maxWidth="lg">
        <EditDetails />
      </Container>
    </SnackbarProvider>
  );
};

export default UserDetails;
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.userId;
  return await getUser(id);
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const id = params.userId as string;
  const action = formData.get("subaction");

  switch (action) {
    case "personalInfo":
      const fname = formData.get("first_name") as string;
      const lname = formData.get("last_name") as string;
      const fon1 = formData.get("personal_phone1") as string;
      const fon2 = formData.get("personal_phone2") as string;
      const email = formData.get("email") as string;
      const dob = formData.get("dob") as string;
      const cnum = formData.get("ghcard_number") as string;
      const education = formData.get("education") as string;
      const resident = formData.get("residential_address") as string;
      const city = formData.get("city") as string;
      const landmark = formData.get("landmark") as string;
      const area = formData.get("area") as string;
      const mstat = formData.get("marital_status") as string;
      const gender = formData.get("gender") as string;
      let data = {
        first_name: fname,
        last_name: lname,
        personal_phone1: fon1,
        personal_phone2: fon2,
        email: email,
        dob: new Date(dob),
        ghcard_number: cnum,
        education: education,
        residential_address: resident,
        city: city,
        landmark: landmark,
        area: area,
        marital_status: mstat,
        gender: gender,
      };

      return await updateUserDetails(id, data);

    case "employmentInfo":
      const cname = formData.get("company_name") as string;
      const cphone = formData.get("company_phone") as string;
      const cloc = formData.get("company_location") as string;
      const ccity = formData.get("company_city") as string;
      const cland = formData.get("company_landmark") as string;
      const mincome = formData.get("monthly_income") as string;
      const desig = formData.get("designation") as string;
      let employmentdata = {
        company_name: cname,
        company_phone: cphone,
        company_location: cloc,
        company_city: ccity,
        company_landmark: cland,
        monthly_income: mincome,
        designation: desig,
      };

      return await updateUserDetails(id, employmentdata);

    case "contactInfo":
      const fm1name = formData.get("fm1_fullname") as string;
      const fm1phone = formData.get("fm1_phonenumber") as string;
      const fm1rel = formData.get("fmm1_relationship") as string;
      const fm2name = formData.get("fmm2_fullname") as string;
      const fm2phone = formData.get("fmm2_phone_number") as string;
      const fm2rel = formData.get("fmm2_relationship") as string;
      const cwrkname = formData.get("co_worker_fullname") as string;
      const cwrkphone = formData.get("co_worker_phone") as string;
      const cwrkrel = formData.get("co_worker_relationship") as string;

      const contactInfo = {
        fm1_fullname: fm1name,
        fm1_phonenumber: fm1phone,
        fmm1_relationship: fm1rel,
        fmm2_fullname: fm2name,
        fmm2_phone_number: fm2phone,
        fmm2_relationship: fm2rel,
        co_worker_fullname: cwrkname,
        co_worker_phone: cwrkphone,
        co_worker_relationship: cwrkrel,
      };

      return await updateUserDetails(id, contactInfo);

    case "walletInfo":
      const wnet = formData.get("wallet_network") as string;
      const wnum = formData.get("wallet_number") as string;
      const wname = formData.get("wallet_name") as string;
      const pin = formData.get("otp") as string;

      const walletInfo = {
        wallet_network: wnet,
        wallet_number: wnum,
        wallet_name: wname,
        otp: Number(pin),
      };

      return await updateUserDetails(id, walletInfo);
    default:
      return true;
  }
};
