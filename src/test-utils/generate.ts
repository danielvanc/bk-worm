import faker from "faker";

function buildUser(overrides?: object) {
  return {
    id: Number(faker.datatype.uuid()),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    ...overrides,
  };
}

export { buildUser };
