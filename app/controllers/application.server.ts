// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Application, Prisma } from "@prisma/client";
import { add, format, lastDayOfISOWeek, startOfISOWeek } from "date-fns";
import { db } from "~/lib/db.server";
import crypto from "crypto";
import { payAmount } from "./functions.server";
//import  cron  from 'node-cron';
//import invariant from "tiny-invariant";

export const addPenalty = async () => {
  const defaultingApplications = await db.application.findMany({
    where: {
      AND: [
        { application_status: "DISBURSED" },
        { payment_status: { not: "PAID" } },
        { repayment_date: { lte: new Date().toISOString() } },
      ],
    },
    select: {
      total_amount: true,
      id: true,
      payment_status: true,
    },
  });

  if (defaultingApplications.length > 0) {
    for (const { id, total_amount } of defaultingApplications) {
      const penalty = 0.03 * Number(total_amount);
      await db.application.update({
        where: { id: id },
        data: {
          total_amount: {
            increment: new Prisma.Decimal(penalty),
          },
        },
        select: {
          id: true,
          total_amount: true,
        },
      });
    }
    return true;
  }
  return true;
};

export type newApplicationType = Pick<
  Application,
  | "userId"
  | "amount"
  | "interest"
  | "service_fee"
  | "period"
  | "selfie_img"
  | "total_amount"
>;
export const newApplication = async (data: newApplicationType) => {
  //save selfie to firebase and get the image url
  const application = await db.application.create({
    data,
  });
  return application;
};

export type ApplicationTableType = Prisma.PromiseReturnType<
  typeof getPendingApplications
>;
export const getPendingApplications = async () => {
  const loans = await db.application.findMany({
    where: {
      application_status: "PENDING",
    },
    include: {
      owner: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          personal_phone1: true,
          personal_phone2: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  //get the right fields for the table
  let serializedLoans = [];
  for (const item of loans) {
    let newObject = {
      id: item.id,
      name: `${item.owner.first_name} ${item.owner.last_name}`,
      repayment_date:
        item.disbursed_date &&
        add(new Date(item.disbursed_date), { days: item.period }),
      created_at: item.createdAt,
      amount: new Prisma.Decimal(item.amount),
      total_amount: new Prisma.Decimal(item.total_amount),
      approved_on: item.approved_on ? item.approved_on : new Date(),
      contact1: item.owner.personal_phone1,
      contact2: item.owner.personal_phone2,
    };
    serializedLoans.push(newObject);
  }

  return serializedLoans;
};

export const getApprovedApplications = async () => {
  const loans = await db.application.findMany({
    where: {
      application_status: "APPROVED",
    },
    include: {
      owner: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          personal_phone1: true,
          personal_phone2: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  //get the right fields for the table
  let serializedLoans = [];
  for (const item of loans) {
    let newObject = {
      id: item.id,
      name: `${item.owner.first_name} ${item.owner.last_name}`,
      created_at: item.createdAt,
      amount: new Prisma.Decimal(item.amount),
      repayment_date:
        item.disbursed_date &&
        add(new Date(item.disbursed_date), { days: item.period }),
      approved_on: item.approved_on ? item.approved_on : new Date(),
      total_amount: new Prisma.Decimal(item.total_amount),
      contact1: item.owner.personal_phone1,
      contact2: item.owner.personal_phone2,
    };
    serializedLoans.push(newObject);
  }

  return serializedLoans;
};

export const getDisbursedApplications = async () => {
  const loans = await db.application.findMany({
    where: {
      application_status: "DISBURSED",
    },
    include: {
      owner: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          personal_phone1: true,
          personal_phone2: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  //get the right fields for the table
  let serializedLoans = [];
  for (const item of loans) {
    let newObject = {
      id: item.id,
      name: `${item.owner.first_name} ${item.owner.last_name}`,
      created_at: item.createdAt,
      amount: new Prisma.Decimal(item.amount),
      total_amount: new Prisma.Decimal(item.total_amount),
      approved_on: item.approved_on ? item.approved_on : new Date(),
      repayment_date:
        item.disbursed_date &&
        add(new Date(item.disbursed_date), { days: item.period }),
      contact1: item.owner.personal_phone1,
      contact2: item.owner.personal_phone2,
    };
    serializedLoans.push(newObject);
  }

  return serializedLoans;
};

export const getRejectedApplications = async () => {
  const loans = await db.application.findMany({
    where: {
      application_status: "DECLINED",
    },
    include: {
      owner: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          personal_phone1: true,
          personal_phone2: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  //get the right fields for the table
  let serializedLoans = [];
  for (const item of loans) {
    let newObject = {
      id: item.id,
      name: `${item.owner.first_name} ${item.owner.last_name}`,
      created_at: item.createdAt,
      amount: new Prisma.Decimal(item.amount),
      total_amount: new Prisma.Decimal(item.total_amount),
      approved_on: item.approved_on ? item.approved_on : new Date(),
      repayment_date:
        item.disbursed_date &&
        add(new Date(item.disbursed_date), { days: item.period }),
      contact1: item.owner.personal_phone1,
      contact2: item.owner.personal_phone2,
    };
    serializedLoans.push(newObject);
  }

  return serializedLoans;
};

export type ApplicationWithDetailsType = Prisma.PromiseReturnType<
  typeof getAllDetails
>;
export const getAllDetails = async (id: string) => {
  const application = await db.application.findFirstOrThrow({
    where: {
      id: id,
    },
    include: {
      owner: {
        include: {
          loans: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      },
      payments: true,
    },
  });

  return application;
};

export const verifyApplication = async (id: string, name: string) => {
  let verified = await db.application.update({
    where: {
      id: id,
    },
    data: {
      application_status: "APPROVED",
      approved_on: new Date(),
      approved_by: name,
    },
  });
  return verified;
};

export const disburseApplication = async (id: string, period: number) => {
  let disbursed = await db.application.update({
    where: {
      id: id,
    },
    data: {
      application_status: "DISBURSED",
      disbursed_date: new Date(),
      repayment_date: add(new Date(), { days: period }),
    },
  });

  return disbursed;
};

export const checkBalance = async () => {
  let secret =
    "l0O6GsbNpBVp1Zx7eVfOA5k79zQdnD5Ikyftf2eKgg+mAskxRl7RMGZpbbgMIItM1BTbVZBSD/przrOM4GpMXA==";
  let signature = crypto.createHmac("SHA256", secret);
  signature.update(
    JSON.stringify({
      service_id: 1907,
      trans_type: "BLC",
      ts: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    })
  );
  //console.log(signature.digest("hex"));
  const request = await fetch(
    "https://orchard-api.anmgw.com/check_wallet_balance",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `kVUIKMcYof/MBWwtVfdXdIys5rtPSbzt8aUyhhl1CdxHLLh+gpdsw3ZjNAbW6ZoRoK579ea5SciYPetklzUNtQ==':${signature.digest(
          "hex"
        )}`,
      },
      body: JSON.stringify({
        service_id: 1907,
        trans_type: "BLC",
        ts: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      }),
    }
  );
  let res = await request.json();
  console.log(res);
};

export const payLoan = async (
  loanId: string,
  amount: number,
  userId: string,
  rpDate: string,
  penalty: number,
  isPaidToday: boolean
) => {
  try {
    return await payAmount(userId, loanId, amount);
  } catch (error) {
    console.log(error);
  }
};

export const closeApplication = async (id: string) => {
  return await db.application.update({
    where: {
      id: id,
    },
    data: {
      application_status: "CLOSED",
    },
  });
};

export type ApplicationStatusType = Prisma.PromiseReturnType<
  typeof getAllApplications
>;
export const getAllApplications = async () => {
  return await db.application.findMany({
    select: {
      application_status: true,
    },
  });
};

export type RepaymentsDueType = Prisma.PromiseReturnType<
  typeof getRepaymentsDueThisWeek
>;
export const getRepaymentsDueThisWeek = async () => {
  return await db.application.findMany({
    where: {
      application_status: "DISBURSED",
      repayment_date: {
        gte: startOfISOWeek(new Date()), //format(new Date(), "yyyy-MM-dd HH:mm:ss")
        lte: lastDayOfISOWeek(new Date()),
      },
    },
    include: {
      owner: {
        select: {
          personal_phone1: true,
          first_name: true,
          last_name: true,
        },
      },
    },
  });
};
