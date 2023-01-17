import { Prisma } from "@prisma/client";
import { type ActionFunction } from "@remix-run/node";
//import { json, type ActionFunction } from "@remix-run/node";
import { auth } from "firebase-admin";
import { unauthorized } from "remix-utils";
import {
  newApplication,
  type newApplicationType,
} from "~/controllers/application.server";

export async function verifyUser(request: Request) {
  const authToken = request.headers.get("authorization");
  if (authToken) {
    let res = await auth().verifyIdToken(authToken);
    return res;
  } else {
    throw unauthorized({ message: "You are not authorized" });
  }
}

export const action: ActionFunction = async ({ request, context }) => {
  let token = await verifyUser(request);
  if (token) {
    const formData = await request.formData();
    const amount = formData.get("amount") as string;
    const period = formData.get("period") as string;
    const userId = formData.get("userId") as string;
    const selfie_img = formData.get("selfie") as string;
    const interest = formData.get("interest") as string;
    const svfee = formData.get("service_fee") as string;
    const total_amt = formData.get("total") as string;

    const data: newApplicationType = {
      userId: userId,
      amount: new Prisma.Decimal(amount),
      period: Number(period),
      interest: new Prisma.Decimal(interest),
      service_fee: new Prisma.Decimal(svfee),
      total_amount: new Prisma.Decimal(total_amt),
      selfie_img: selfie_img,
    };

    return await newApplication(data);
  }

  return true;
};
