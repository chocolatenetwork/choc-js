import '@choc-js/types';

import type { ChocolatePrimitivesProjectsStatus } from '@polkadot/types/lookup';
import { AllIds } from '../src/customComponents/ProjectProfile/hooks/useReviewSend';
// Define aliases to make impl easier
// type AccountId = string;

export interface GenesisConfig {
  // Status of projects to create. if accept is included, accept after
  //   Rejected is depr
  initProjects: [Omit<ChocolatePrimitivesProjectsStatus['type'], 'Rejected'>][];
  // Users to create those projects with, and currencies to pay in.
  // Since this is after genesis, this can be any supported genesos
  initUsers: [string, AllIds][];
}
export const METADATA = [
  'QmPAVb28J73KjzcjTQ85oJLyftmm4kEgTTptRssPnKjKZD',
  'QmQLVGKfigHsnguvK8X2kiYX4o7tp2Zm5k14Gr928bpcPE',
  'QmUBtn48fKxGSzxGQsz4h3kxUqJMd2ZpKo7MUhrxCFq3Sd',
  'QmfLaEuVr6kZqyEeHRBZqEfvGTEL5x85YsNfEriDDxGPd1',
  'QmVzxGUaVF4HVfvtoaVqXBcVGqyEq72TAp8s9u9pmH5Vra',
];

export const REVS = [
  [3, 'QmdKx4pmnJUP5GdjtpJE2ei4xeaRKQWYwvXGuVY1AbAwDM/review1.json'],
  [5, 'QmdKx4pmnJUP5GdjtpJE2ei4xeaRKQWYwvXGuVY1AbAwDM/review2.json'],
  [5, 'QmdKx4pmnJUP5GdjtpJE2ei4xeaRKQWYwvXGuVY1AbAwDM/review3.json'],
  [3, 'QmdKx4pmnJUP5GdjtpJE2ei4xeaRKQWYwvXGuVY1AbAwDM/review4.json'],
] as [number, string][];

export const genesis: GenesisConfig = {
  initProjects: [
    ['Accepted'],
    ['Proposed'],
    ['Accepted'],
    ['Accepted'],
    ['Proposed'],
    ['Accepted'],
    ['Accepted'],
    ['Accepted'],
  ],
  initUsers: [
    ['//Alice', 'DOT'],
    ['//Bob', 'DOT'],
    ['//Charlie', 'DOT'],
    ['//Dave', 'DOT'],
    ['//Eve', 'DOT'],
    ['//Ferdie', 'DOT'],
    ['//Alice//stash', 'DOT'],
    ['//Bob//stash', 'DOT'],
    ['//Charlie//stash', 'DOT'],
    ['//Dave//stash', 'DOT'],
    ['//Eve//stash', 'DOT'],
    ['//Ferdie//stash', 'DOT'],
  ],
};
export const BLOCKTIME = 22000;
