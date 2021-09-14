import { rest } from "msw";
import * as usersDB from "../test-utils/data/users";

const handlers = [
  rest.get("/api/auth/signin", async (req, res, ctx) => {
    const user = await getUser(req);
    const token = getToken(req);

    console.log("Yo!", user, token);
    // return res(ctx.json({ user: { ...user, token } }));
    // return res({});
  }),
];

const getToken = (req) =>
  req.headers.get("Authorization")?.replace("Bearer ", "");

async function getUser(req) {
  const token = getToken(req);
  if (!token) {
    const error = new Error("A token must be provided");
    error.status = 401;
    throw error;
  }
  let userId;
  try {
    userId = atob(token);
  } catch (e) {
    const error = new Error("Invalid token. Please login again.");
    error.status = 401;
    throw error;
  }
  const user = await usersDB.read(userId);
  return user;
}

export { handlers };
