import { Outlet, useLoaderData } from "@remix-run/react";
import React from "react";
import DashboardLayout from "~/components/DashboardLayout";
import { type LoaderFunction, type ActionFunction } from "@remix-run/node";
import { authenticator } from "~/lib/auth.server";
import { type Admin } from "@prisma/client";

const DashboardLayoutRoute = () => {
  const { user }: { user: Omit<Admin, "createdAt"> } = useLoaderData();

  return (
    <DashboardLayout>
      <Outlet context={user} />
    </DashboardLayout>
  );
};

export default DashboardLayoutRoute;

export const action: ActionFunction = async ({ request }) => {
  return await authenticator.logout(request, { redirectTo: "/" });
};

export const loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directly
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return { user: user };
};
