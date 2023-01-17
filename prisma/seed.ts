import { faker } from "@faker-js/faker";
import { type PaymentStatus, type Status } from "@prisma/client";
import bcrypt from "bcrypt";
import { db } from "~/lib/db.server";

///  Users
const users = Array.from({ length: 50 }, () => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  personal_phone1: faker.phone.number("0### ### ###"),
  personal_phone2: faker.phone.number("0### ### ###"),
  email: faker.internet.exampleEmail(),
  otp: Number(faker.address.zipCode("#####")),
  dob: faker.date.past(),
  gender: faker.helpers.arrayElement(["male", "female"]),
  ghcard_img: faker.image.image(200, 600, true),

  ghcard_number: "GHA-0032443433-6",
  marital_status: faker.helpers.arrayElement(["single", "married"]),
  education: faker.helpers.arrayElement(["Shs", "jhs", "university"]),
  residential_address: faker.address.streetAddress(),
  religion: faker.helpers.arrayElement([
    "christian",
    "muslim",
    "traditionalist",
  ]),
  city: faker.address.state(),
  area: faker.address.county(),
  landmark: faker.helpers.arrayElement([
    "Central Mosque",
    "PostOffice",
    "Stadium",
    "CommercialBank",
  ]),
  company_name: faker.company.name(),
  company_phone: faker.phone.number("0### ### ###"),
  company_location: faker.address.state(),
  company_city: faker.address.state(),
  company_landmark: faker.helpers.arrayElement([
    "Central Mosque",
    "PostOffice",
    "Stadium",
    "CommercialBank",
  ]),
  monthly_income: "1000 - 2000",
  designation: faker.name.jobTitle(),
  fm1_fullname: faker.name.fullName(),
  fm1_phonenumber: faker.phone.number("0### ### ###"),
  fmm1_relationship: faker.helpers.arrayElement([
    "Mother",
    "Father",
    "Uncle",
    "Sister",
    "Brother",
    "Son",
  ]),
  fmm2_fullname: faker.name.fullName(),
  fmm2_phone_number: faker.phone.number("0### ### ###"),
  fmm2_relationship: faker.helpers.arrayElement([
    "Mother",
    "Father",
    "Uncle",
    "Sister",
    "Brother",
    "Son",
  ]),
  co_worker_fullname: faker.name.fullName(),
  co_worker_phone: faker.phone.number("0### ### ###"),
  co_worker_relationship: "friend",
  wallet_network: faker.helpers.arrayElement([
    "Mtn",
    "Airtel-Tigo",
    "Vodafone",
  ]),
  wallet_name: faker.name.fullName(),
  wallet_number: faker.phone.number("0### ### ###"),
}));

let applications = Array.from({ length: 100 }, () => ({
  amount: Number(faker.finance.amount()),
  period: faker.datatype.number({ min: 1, max: 8 }),
  interest: faker.datatype.number({ min: 0.01, max: 1, precision: 0.25 }),
  service_fee: faker.datatype.number({ min: 0.01, max: 1, precision: 0.25 }),
  total_amount: Number(faker.finance.amount()),
  selfie_img: faker.image.image(200, 600, true),
  application_status: faker.helpers.arrayElement(["PENDING"]) as Status,
  payment_status: faker.helpers.arrayElement(["DEFAULT"]) as PaymentStatus,
  //approved_by: faker.name.fullName(),
  //disbursed_date: faker.date.recent(),
  //repayment_date: faker.date.soon(),
  userId: "",
}));

async function seed() {
  const email = "junipercash@gmail.com";
  const hashedPassword = await bcrypt.hash("password", 10);

  await db.admin.create({
    data: {
      name: "Moses Aboyinga",
      email: email,
      avatar: null,
      password: hashedPassword,
      permission: [{ permission: "DEFAULT" }],
    },
  });
  //CREATE USER
  await db.user.createMany({
    data: users,
  });

  const getRegisteredUsersIds: { id: string }[] | [] = await db.user.findMany({
    select: {
      id: true,
    },
  });
  let userIds: string[] = [];
  for (let index = 0; index < getRegisteredUsersIds.length; index++) {
    userIds.push(getRegisteredUsersIds[index]["id"]);
  }

  for (let index = 0; index < applications.length; index++) {
    applications[index].userId = faker.helpers.arrayElement(userIds);
  }

  //CREATE APPLICATIONS
  await db.application.createMany({
    data: applications,
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
