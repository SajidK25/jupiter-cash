import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  json,
  type ActionFunction,
  type LoaderFunction,
} from "@remix-run/node";
import LoginForm from "~/components/Form/LoginForm";
import { authenticator } from "~/lib/auth.server";
import { commitSession, getSession } from "~/lib/session.server";

export default function Login() {
  return (
    <Container maxWidth="xl" disableGutters sx={{ display: "flex" }}>
      <Box
        width="60%"
        sx={{
          height: "100vh",
          backgroundImage: "url(/loanbg3.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Box display="flex" flex={1}>
        <LoginForm />
      </Box>
    </Container>
  );
}

export const action: ActionFunction = async ({ request, context }) => {
  let formData: FormData = await request.formData();
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/dashboard/home/",
    failureRedirect: "/",
    context: { formData },
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directly
  await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard/home/",
  });

  let session = await getSession(request.headers.get("cookie"));
  let error = session.get(authenticator.sessionErrorKey);
  return json(
    { error },
    {
      headers: {
        // only necessary with cookieSessionStorage
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};
