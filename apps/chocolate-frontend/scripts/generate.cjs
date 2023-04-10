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
      id: owner.address,
      // @ts-expect-error AccountType enum type
      accountType: 'project',
      points: 0,
      createdAt: faker.date.past().toJSON(),
      updatedAt: faker.date.recent().toJSON(),
    });

    data.projects.push({
      id: projectId,
      ratingSum: 0,
      reviewCount: 0,
      userId: owner.address,
      name: faker.company.name(),

      logo: `https://api.dicebear.com/6.x/shapes/svg?seed=Mia${projectId}&backgroundColor=transparent&backgroundType[]`,
      description: faker.lorem.sentences(),
      createdAt: faker.date.past().toJSON(),
      updatedAt: faker.date.recent().toJSON(),
    });

    const project = data.projects.at(-1);
    const projectUser = data.users.at(-1);

    // Create 10 reviews for it

    for (let i = 1; i < 11; i++) {
      const ownerReview = keyring.createFromUri(`//Alice//hard-reviewer-${i}`);
      const rating = faker.random.numeric(1, {
        bannedDigits: ['6', '7', '8', '9', '0'],
      });

      const ratingNumber = Number(rating);
      data.reviews.push({
        id: reviewIndex,
        rating: ratingNumber,
        userId: ownerReview.address,
        projectId: projectId,
        createdAt: faker.date.past().toJSON(),
        updatedAt: faker.date.recent().toJSON(),
      });

      data.users.push({
        id: ownerReview.address,
        // @ts-expect-error AccountType enum type
        accountType: 'user',
        points:
          Number(faker.random.numeric(3, { allowLeadingZeros: true })) + 1, // one for this review.
        createdAt: faker.date.past().toJSON(),
        updatedAt: faker.date.recent().toJSON(),
      });
      reviewIndex += 1;

      if (project) {
        project.ratingSum += ratingNumber;
        project.reviewCount += 1;
      }
      if (projectUser) {
        projectUser.points += 1;
      }
    }
  }

  return data;
};
