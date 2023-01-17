import { Prisma } from "@prisma/client";
import { db } from "~/lib/db.server";

export const payAmount = async (
  userId: string,
  loanId: string,
  amount: number
) => {
  const payment = await db.application.update({
    where: {
      id: loanId,
    },
    data: {
      payments: {
        create: {
          amount: new Prisma.Decimal(amount),
          userId: userId,
        },
      },
      total_amount: { decrement: new Prisma.Decimal(amount) },
    },
  });

  return await db.application.update({
    where: {
      id: loanId,
    },
    data: {
      payment_status: Number(payment.total_amount) > 0 ? "OWEING" : "PAID",
    },
  });
};

export const addPenaltyAndPay = async (
  loanId: string,
  userId: string,
  amount: number,
  penalty: number
) => {
  //Add penalty
  await db.application.update({
    where: {
      id: loanId,
    },
    data: {
      total_amount: {
        increment: new Prisma.Decimal(penalty),
      },
    },
  });
  //Pay
  return await payAmount(userId, loanId, amount);
};
