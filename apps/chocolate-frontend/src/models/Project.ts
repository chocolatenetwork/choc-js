export interface IProjectDb {
  projectId: number;
  ratingSum: number;
  reviewCount: number;
  userOwnerId: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  logo: string;
  description: string;
}
