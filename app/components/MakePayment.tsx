import React from "react";
import Grid from "@mui/material/Grid";
import { ValidatedForm } from "remix-validated-form";
import { z } from "zod";
import { type ApplicationWithDetailsType } from "~/controllers/application.server";
import { withZod } from "@remix-validated-form/with-zod";
import FormInputText from "./Form/FormInputText";
import SubmitButton from "./Form/SubmitButton";
import { intervalToDuration, isToday, startOfDay } from "date-fns";

type Props = {
  data: ApplicationWithDetailsType;
};

const validator = withZod(
  z.object({
    amount: z.preprocess((val) => {
      const processed = z
        .string()
        .regex(/^\d+$/)
        .transform(Number)
        .safeParse(val);
      return processed.success ? processed.data : val;
    }, z.number().min(1, { message: "Amount must be greater than or equal to 1" })),
    userId: z.string(),
    rpdate: z.string(),
    penalty: z.string(),
    paidToday: z.string().optional(),
  })
);

const MakePayment = ({ data }: Props) => {
  let { days } = intervalToDuration({
    start: startOfDay(new Date(data.repayment_date as Date)),
    end: new Date(),
  });

  let defaultAmt = 0.03 * Number(data.total_amount);
  let penalty = (days as number) * defaultAmt;
  let hasPaidToday = (): string => {
    for (const { createdAt } of data.payments) {
      if (isToday(new Date(createdAt))) {
        return JSON.stringify(true);
      }
    }
    return JSON.stringify(false);
  };
  return (
    <Grid
      container
      spacing={2}
      sx={{ mb: 3 }}
      component={ValidatedForm}
      defaultValues={{
        userId: data.owner.id,
        rpdate: data.repayment_date,
        penalty: penalty.toFixed(2),
        paidToday: hasPaidToday(),
      }}
      method="post"
      subaction={data.id}
      resetAfterSubmit={true}
      validator={validator}
    >
      <Grid item xs={12}>
        <FormInputText
          size="small"
          sx={{ width: "30%" }}
          InputLabelProps={{
            shrink: true,
          }}
          name="amount"
          type="number"
          label="Payment Amount"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4} sx={{ display: "none" }}>
        <FormInputText
          size="small"
          sx={{ width: "10%", display: "none" }}
          InputLabelProps={{
            shrink: true,
          }}
          name="userId"
          label="User Id"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4} sx={{ display: "none" }}>
        <FormInputText
          size="small"
          sx={{ width: "10%", display: "none" }}
          InputLabelProps={{
            shrink: true,
          }}
          name="rpdate"
          label="User Id"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4} sx={{ display: "none" }}>
        <FormInputText
          size="small"
          sx={{ width: "10%", display: "none" }}
          InputLabelProps={{
            shrink: true,
          }}
          name="penalty"
          label="User Id"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4} sx={{ display: "none" }}>
        <FormInputText
          size="small"
          sx={{ width: "10%", display: "none" }}
          InputLabelProps={{
            shrink: true,
          }}
          name="paidToday"
          label="User Id"
          variant="outlined"
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <SubmitButton title="Pay Amount" />
      </Grid>
    </Grid>
  );
};

export default MakePayment;
