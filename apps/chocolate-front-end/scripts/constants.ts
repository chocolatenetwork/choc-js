import { GenesisConfig } from './init-projects';

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
    ['Alice', 'Dot'],
    ['Bob', 'Dot'],
    ['Charlie', 'Dot'],
    ['Dave', 'Dot'],
    ['Eve', 'Dot'],
    ['Ferdie', 'Dot'],
    ['Alice//stash', 'Dot'],
    ['Bob//stash', 'Dot'],
    ['Charlie//stash', 'Dot'],
    ['Dave//stash', 'Dot'],
    ['Eve//stash', 'Dot'],
    ['Ferdie//stash', 'Dot'],
  ],
};
