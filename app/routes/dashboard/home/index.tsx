import { type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import DueLoans from "~/components/DueLoans";
import {
  getRepaymentsDueThisWeek,
  type RepaymentsDueType,
} from "~/controllers/application.server";

const AlmostDueRoute = () => {
  const data: RepaymentsDueType = useLoaderData<typeof loader>();
  return <DueLoans data={data} />;
};

export default AlmostDueRoute;
export const loader: LoaderFunction = async ({ request, context }) => {
  return await getRepaymentsDueThisWeek();
};
