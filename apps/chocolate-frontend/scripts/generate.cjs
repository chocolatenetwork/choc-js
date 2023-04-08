const { faker } = require('@faker-js/faker');
const { Keyring } = require('@polkadot/keyring');
// const { AccountType } = require('../../../packages/schema/src');

module.exports = () => {
  const keyring = new Keyring();

  /**
   * @type {{
   *  projects: import("../src/models/Project").IProjectDbApi[],
   *  reviews: import("../src/models/Review").IReviewDbApi[],
   *  users: import("../src/models/User").IUserDbApi[],
   * }}
   */
  const data = { projects: [], reviews: [], users: [] };
  // Create 10 projects, doesn't matter who owns fn.
  // projectId: number;
  // ratingSum: number;
  // reviewCount: number;
  // userOwnerId: string;
  // createdAt: Date;
  // updatedAt: Date;
  // name: string;
  // logo: string;
  let reviewIndex = 1;
  for (let projectId = 1; projectId < 11; projectId++) {
    const owner = keyring.createFromUri(`//Alice//hard${projectId}`);
    data.users.push({
      accountId: owner.address,
      // @ts-expect-error AccountType enum type
      accountType: 'project',
      points: 0,
      createdAt: faker.date.past().toJSON(),
      updatedAt: faker.date.recent().toJSON(),
    });
    data.projects.push({
      projectId: projectId,
      ratingSum: 0,
      reviewCount: 0,
      userOwnerId: owner.address,
      name: faker.company.name(),

      logo: `https://api.dicebear.com/6.x/shapes/svg?seed=Mia${projectId}&backgroundColor=transparent&backgroundType[]`,
      description: faker.lorem.sentences(),
      createdAt: faker.date.past().toJSON(),
      updatedAt: faker.date.recent().toJSON(),
    });
    // Create 10 reviews for it

    for (let i = 1; i < 11; i++) {
      const ownerReview = keyring.createFromUri(`//Alice//hard-reviewer-${i}`);
      const rating = faker.random.numeric(1, {
        bannedDigits: ['6', '7', '8', '9', '0'],
      });
      data.users.push({
        accountId: ownerReview.address,
        // @ts-expect-error AccountType enum type
        accountType: 'user',
        points: Number(faker.random.numeric(3, { allowLeadingZeros: true })),
        createdAt: faker.date.past().toJSON(),
        updatedAt: faker.date.recent().toJSON(),
      });
      data.reviews.push({
        reviewId: reviewIndex,
        rating: Number(rating),
        userAccountId: ownerReview.address,
        projectProjectId: projectId,
        createdAt: faker.date.past().toJSON(),
        updatedAt: faker.date.recent().toJSON(),
      });
      reviewIndex += 1;
    }
  }

  return data;
};
