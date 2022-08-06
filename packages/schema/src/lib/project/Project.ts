import { ResourceLink } from "../resource-link/ResourceLink";

export interface Project {
  Literature: Literature;
  Contact: ResourceLink[];
  Token?: Token[];
  Brand: Brand;
  Badge: Badge;
  'Admin Id': string;
  'Project Id': number;
  'Total rating': number;
  'Total Reviewers': number;
  Description: string;
}

export interface Badge {}

export interface Brand {
  name: string;
  logo: string;
}

export interface Literature {
  Papers?: ResourceLink[];
  Blogs?: ResourceLink[];
  Wiki?: ResourceLink[];
  Documentation?: ResourceLink[];
}

export interface Token {
  name: string;
  ticker: string;
  type: string;
  logo: ResourceLink;
}
