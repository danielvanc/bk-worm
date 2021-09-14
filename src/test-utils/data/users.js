const usersKey = "__bkworm_users__";
let users = {};
const persist = () =>
  window.localStorage.setItem(usersKey, JSON.stringify(users));
const load = () =>
  Object.assign(users, JSON.parse(window.localStorage.getItem(usersKey)));

// initialize
try {
  load();
} catch (error) {
  persist();
  // ignore json parse error
}

window.__bookshelf = window.__bookshelf || {};
window.__bookshelf.purgeUsers = () => {
  Object.keys(users).forEach((key) => {
    delete users[key];
  });
  persist();
};

function validateUserForm({ username, password }) {
  if (!username) {
    const error = new Error("A username is required");
    error.status = 400;
    throw error;
  }
  if (!password) {
    const error = new Error("A password is required");
    error.status = 400;
    throw error;
  }
}

async function authenticate({ username, password, email }) {
  validateUserForm({ username, password });
  const id = hash(username);
  const user = users[id] || {};
  if (user.passwordHash === hash(password)) {
    return { ...sanitizeUser(user), token: btoa(user.id), email };
  }
  const error = new Error("Invalid username or password");
  error.status = 400;
  throw error;
}

async function create({ username, password }) {
  validateUserForm({ username, password });
  const id = hash(username);
  const passwordHash = hash(password);
  if (users[id]) {
    const error = new Error(
      `Cannot create a new user with the username "${username}"`
    );
    error.status = 400;
    throw error;
  }
  users[id] = { id, username, passwordHash };
  persist();
  return read(id);
}

async function read(id) {
  validateUser(id);
  return sanitizeUser(users[id]);
}

function sanitizeUser(user) {
  const { passwordHash, ...rest } = user;
  return rest;
}

function validateUser(id) {
  load();
  if (!users[id]) {
    const error = new Error(`No user with the id "${id}"`);
    error.status = 404;
    throw error;
  }
}

function hash(str) {
  var hash = 5381,
    i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return String(hash >>> 0);
}

export { authenticate, create, read };
