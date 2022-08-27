/* eslint-disable no-use-before-define */
// Generated by https://quicktype.io

import { Struct, u32 } from '@polkadot/types';
import { AccountId } from '@polkadot/types/interfaces';
import { ChocolatePrimitivesProjectsProject } from '@polkadot/types/lookup';
// eslint-disable-next-line import/no-unresolved
import { ProjectID, ReviewAl } from '../interfaces';

interface NewGenericProjectWithIndex<Num> {
  Id: Num;
  project: GenericNewProject<Num>;
}
export type HumanNewProjectWithIndex = NewGenericProjectWithIndex<string>;
export type JSONNewProjectWithIndex = NewGenericProjectWithIndex<number>;

export type ChainMetaData = string;
type UnExtend<T,Ext> = Omit<T,keyof Ext>;


type ProjectKeys = keyof UnExtend<ChocolatePrimitivesProjectsProject, Struct>;

interface GenericChainProject<Num> extends Record<ProjectKeys,unknown>{
  ownerId: string;
  badge: boolean;
  metadata: ChainMetaData;
  proposalStatus: ProposalStatus;
  reward: Num;
  totalUserScores: Num;
  totalReviewScore: Num;
  numberOfReviews: Num;
}
export type JSONChainProject = GenericChainProject<number>;
export type HumanChainProject = GenericChainProject<string>;
export interface ProposalStatus {
  status: Status['_enum'];
  reason: Reason['_enum'];
}

export interface Reason {
  _enum: Partial<ReasonEnum>;
}

export interface ReasonEnum {
  Other: string;
  InsufficientMetaData: null;
  Malicious: null;
  PassedRequirements: null;
}

type KeyofRev = keyof UnExtend<ReviewAl, Struct>;

interface GenericChainReview<Num> extends Map<KeyofRev,unknown> {
  // [T in KeyofRev]: unknown;
  
  proposalStatus: ProposalStatus;

  userId: string;
  content: string;
  projectId: Num;
  pointSnapshot: Num;
  reviewScore: Num;
  collateralCurrencyId: string;
}
export type JSONChainReview = GenericChainReview<number>;
export type HumanChainReview = GenericChainReview<string>;

export interface NewMetaData {
  /** If doesn't exist polyfill */
  Link?: string;
  name: string;
  description: string;
  /** @deprecated, use icon instead, only the first struct makes use of this, the rest use icon */
  image?: string;
  icon?: string;
  date: number;
}

interface GenericNewProject<Num> extends Omit<GenericChainProject<Num>, 'metadata'> {
  metadata: NewMetaData;
}
export type HumanNewProject = GenericNewProject<string>;
export type JSONNewProject = GenericNewProject<number>;
// store on ipfs fully
export interface ReviewContent {
  reviewText: string;
  rating: number;
}

interface NewGenericReview<Num> extends Omit<GenericChainReview<Num>, 'content'> {
  content: ReviewContent;
}
export type HumanNewReview = NewGenericReview<string>;
export type JSONNewReview = NewGenericReview<number>;
interface GenericTableSetReview<Num> extends NewGenericReview<Num> {
  project: GenericNewProject<Num>;
}
export type HumanTableSetReview = GenericTableSetReview<string>;
export type JSONTableSetReview = GenericTableSetReview<number>;

export interface Status {
  _enum: 'Proposed' | 'Accepted' | 'Rejected';
}

interface GenericUser<Num> {
  rankPoints: Num;
  projectId?: Num;
}
export type HumanUser = GenericUser<string>;
export type JSONUser = GenericUser<number>;

export type ReviewKeyAl = [AccountId, ProjectID];
