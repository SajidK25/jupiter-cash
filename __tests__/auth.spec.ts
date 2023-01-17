//import { truncateDB } from "./helpers/db";
//import bcrypt from "bcrypt";
//import { db } from "~/lib/db.server";
import { rest } from "msw";
import { assert, expect } from "vitest";

describe("Integration", () => {
  beforeAll(async () => {
    // await truncateDB();
    //await db.$connect();
  });
  // In our test, we can use `app.navigate` to navigate to our path
  test.only("userIds are attached", async () => {
    let dummyUserIds = [
      { id: "fdaadfad" },
      { id: "faef334" },
      { id: "ffdadf344" },
    ];
    let applicationsWithoutIds = [
      { name: "eddy", userId: "" },
      { name: "eddy", userId: "" },
      { name: "rere", userId: "" },
    ];
    let ids = [];
    for (const { id } of dummyUserIds) {
      ids.push(id);
    }
    expect(ids.length).toBe(3);
    for (let index = 0; index < applicationsWithoutIds.length; index++) {
      applicationsWithoutIds[index].userId = dummyUserIds[0].id;
    }
    expect(applicationsWithoutIds[0].userId).toEqual("fdaadfad");
  });

  test("unauthorized user is redirected", async () => {});
  // And after all E2E tests in this file, we stop the app
  afterAll(async () => {
    //await db.user.deleteMany();
    //await db.$disconnect();
  });
});

export {};
