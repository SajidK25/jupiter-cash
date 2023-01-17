import { type Prisma, type Admin, type User } from "@prisma/client";
import { db } from "~/lib/db.server";
import bcrypt from "bcrypt";
import { Response } from "@remix-run/node";
import { bucket } from "~/lib/firebase.server";

type loginType = {
  email: string;
  password: string;
};
export const loginUser = async ({ email, password }: loginType) => {
  const admin: Admin | null = await db.admin.findFirst({
    where: {
      email: email,
    },
  });
  if (!admin) throw new Error("Invalid Username or Password");
  const crosscheckPassword = await bcrypt.compareSync(password, admin.password);
  if (crosscheckPassword) {
    const { password, ...rest } = admin;
    return rest;
  } else {
    throw new Error("Invalid Username or Password");
  }
};

export type RegisteredUsers = Prisma.PromiseReturnType<typeof getUsers>;
export const getUsers = async () => {
  const users = await db.user.findMany({
    select: {
      id: true,
      email: true,
      first_name: true,
      last_name: true,
      createdAt: true,
      personal_phone1: true,
      personal_phone2: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return users;
};

export type RegisteredUser = Prisma.PromiseReturnType<typeof getUser>;
export const getUser = async (id: string | undefined) => {
  const user = await db.user.findFirst({
    where: {
      id: id,
    },
  });
  if (!user) throw new Response("User not found");
  return user;
};

export const updateUserDetails = async (id: string, data: Partial<User>) => {
  const user = await db.user.update({
    where: { id: id },
    data,
  });
  return user;
};

export const deleteUser = async (id: string) => {
  const user = await db.user.findFirst({
    where: { id: id },
    select: { ghcard_img: true },
  });

  if (!user) {
    throw new Error("User not found");
  } else {
    const url = user.ghcard_img as string;
    //get the image id from the url
    const imag = url.split("2F").pop()?.split("?")[0];
    //delete ghcard image from storage
    await bucket.file(`ghCards/${imag}`).delete();
    //delete user form db
    await db.user.delete({
      where: { id: id },
    });
  }
};
