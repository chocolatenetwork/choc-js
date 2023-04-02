const { faker } = require('@faker-js/faker');
const { Keyring } = require('@polkadot/keyring');
module.exports = () => {
  const keyring = new Keyring();
  const data = { projects: [] };
  // Create 10 projects, doesn't matter who owns fn.
  // projectId: number;
  // ratingSum: number;
  // reviewCount: number;
  // userOwnerId: string;
  // createdAt: Date;
  // updatedAt: Date;
  // name: string;
  // logo: string;
  for (let i = 1; i < 11; i++) {
    const owner = keyring.createFromUri(`//Alice//hard${i}`);
    data.projects.push({
      projectId: i,
      ratingSum: 0,
      reviewCount: 0,
      userOwnerId: owner.address,
      name: faker.company.name(),

      logo: `https://api.dicebear.com/6.x/shapes/svg?seed=Mia${i}&backgroundColor=transparent&backgroundType[]`,
      description: faker.lorem.sentences(),
    });
  }
  return data;
};
