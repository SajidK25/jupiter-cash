import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormInputText from "~/components/Form/FormInputText";
import SubmitButton from "~/components/Form/SubmitButton";
//import Grid from "@mui/material/Grid";
import { ValidatedForm } from "remix-validated-form";
import { loginValidator } from "~/lib/Validators";
import { useLoaderData } from "@remix-run/react";
import Container from "@mui/material/Container";

function LoginForm() {
  const data = useLoaderData();
  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 15, mr: 12 }}>
      <CssBaseline />
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",

          padding: 3,

          alignItems: "center",
        }}
        elevation={0}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
          Sign in
        </Typography>
        {data?.error ? (
          <Typography variant="body2" sx={{ fontWeight: "bold" }} color="error">
            {data.error.message}
          </Typography>
        ) : (
          <Typography variant="caption" color="gray" gutterBottom={true}>
            Welome back! Please login to continue
          </Typography>
        )}

        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          component={ValidatedForm}
          validator={loginValidator}
          id="signIn"
          method="post"
          sx={{ mt: 1, pb: 3, width: "100%" }}
        >
          <FormInputText
            name="email"
            label="Email"
            data-test="email"
            sx={{ mb: 3 }}
            variant="standard"
          />

          <FormInputText
            name="password"
            type="password"
            data-test="password"
            label="Password"
            sx={{ mb: 3 }}
            variant="standard"
          />
          <SubmitButton
            formId="signIn"
            title="SignIn"
            sx={{ alignSelf: "center", width: "50%" }}
          />
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginForm;
