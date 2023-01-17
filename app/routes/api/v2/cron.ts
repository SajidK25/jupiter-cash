import { type ActionFunction } from "@remix-run/node";
import { addPenalty } from "~/controllers/application.server";

export const action: ActionFunction = async ({ request }) => {
  return await addPenalty();
};
