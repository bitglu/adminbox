import { faker } from "@faker-js/faker";

export const ProjectDataFaker = () => {
  const data: any = [];

  for (let index = 0; index < 20; index++) {
    data.push({
      _id: faker.datatype.uuid(),
      code: faker.random.numeric(10),
      project: faker.company.companyName(),
      client: faker.finance.accountName(),
      boxcode: faker.random.numeric(7),
      date: faker.date.birthdate(),
      status: faker.helpers.arrayElement(["Pending", "Delivery", "Cancel"]),
    });
  }

  return data;
};


export const UsersDataFaker = () => {
  const data: any = [];

  for (let index = 0; index < 20; index++) {
    data.push({
      _id: faker.datatype.uuid(),
      code: faker.random.numeric(10),
      email: faker.internet.email(),
      name: faker.name.fullName(),
      rol: faker.helpers.arrayElement(["User", "Admin", "Packer"]),
    });
  }

  return data;
};
