import { type ActionFunction } from "@remix-run/node";
import { unauthorized } from "remix-utils";
//import invariant from "tiny-invariant";
import { db } from "~/lib/db.server";

export const action: ActionFunction = async ({ request, context }) => {
  let formData: FormData = await request.formData();
  //let phone = formData.get("phone") as string;
  let pin = formData.get("pin") as string;
  let phone = formData.get("phone") as string;
  const user = await db.user.findFirst({
    where: {
      AND: [{ otp: Number(pin) }, { personal_phone1: phone }],
    },
    select: {
      id: true,
      email: true,
      personal_phone1: true,
      first_name: true,
      last_name: true,
      otp: true,
    },
  });
  if (!user)
    throw unauthorized({ message: "User credentials do not exist..!" });

  return user;
};
