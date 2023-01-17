import { json, type LoaderFunction } from "@remix-run/node";
import { db } from "~/lib/db.server";
import { verifyUser } from "../apply";

export const loader: LoaderFunction = async ({ params, request }) => {
  const token = await verifyUser(request);
  if (token) {
    const id = params.Id;
    const application = await db.application.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        total_amount: true,
        payment_status: true,
        application_status: true,
        amount: true,
        repayment_date: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return json(application);
  }
  return false;
};
