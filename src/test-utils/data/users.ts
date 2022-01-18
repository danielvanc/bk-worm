let users: IUserProps[] = [];

function validateUserForm({ username, password }: IUserProps) {
  if (!username) {
    const error: IError = new Error("A username is required");
    error.status = 400;
    throw error;
  }
  if (!password) {
    const error: IError = new Error("A password is required");
    error.status = 400;
    throw error;
  }
}

async function authenticate({ username, password, email }: IUserProps) {
  validateUserForm({ username, password });
  const id = Number(hash(username || ""));
  const user: IUserProps = users[id];
  if (user.password === hash(password || "")) {
    return { ...sanitizeUser(user), token: btoa(String(user.id)), email };
  }
  const error: IError = new Error("Invalid username or password");
  error.status = 400;
  throw error;
}

async function create({ username, password }: IUserProps) {
  validateUserForm({ username, password });
  const id = Number(hash(username || ""));
  const passwordHash = hash(password || "");
  if (users[id]) {
    const error: IError = new Error(
      `Cannot create a new user with the username "${username}"`
    );
    error.status = 400;
    throw error;
  }
  users[id] = { id, username, password: passwordHash };
  // persist();
  return read(Number(id));
}

async function read(id: number) {
  validateUser(id);
  return sanitizeUser(users[id]);
}

function sanitizeUser(user: IUserProps) {
  const { password, ...rest } = user;
  return rest;
}

function validateUser(id: number) {
  if (!users[id]) {
    const error: IError = new Error(`No user with the id "${id}"`);
    error.status = 404;
    throw error;
  }
}

function hash(str: string) {
  var hash = 5381,
    i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return String(hash >>> 0);
}

async function reset() {
  users = [];
}

export { authenticate, create, read, reset };
