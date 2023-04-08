import { IProjectDb } from '$chocolate-frontend/models/Project';
import { IReviewDb } from '$chocolate-frontend/models/Review';
import { Tabs } from '@mantine/core';
import {
  QueryObserverSuccessResult,
  UseQueryResult,
} from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Reviews } from '../Reviews/Reviews';
import { Submenu } from '../Submenu';
import { StyledHeader } from './ProjectBody.styles';
import { defaultPage, ProjectParams, TabOptions } from './ProjectBody.utils';

interface ProjectBodyProps {
  query: QueryObserverSuccessResult<IProjectDb, unknown>;
  reviewsQuery: UseQueryResult<IReviewDb[], unknown>;
}

export function ProjectBody(props: ProjectBodyProps) {
  const { reviewsQuery, query } = props;
  const [search, setSearchParams] = useSearchParams(defaultPage);
  const onChange = (tab: string | null) => {
    if (!tab) return;
    const newSearch = new URLSearchParams(search);
    newSearch.set(ProjectParams.tab, tab);
    setSearchParams(newSearch);
  };
  return (
    <Tabs
      onTabChange={onChange}
      keepMounted={false}
      defaultValue={search.get(ProjectParams.tab)}
    >
      <StyledHeader>
        <div className="profile"></div>
        <Submenu />
      </StyledHeader>
      <div className="tabs"></div>
      <div className="add-review"></div>

      <Tabs.Panel value={TabOptions.reviews}>
        <Reviews query={reviewsQuery} />
      </Tabs.Panel>
      <Tabs.Panel value={TabOptions.about}>
        <div className="about"></div>
      </Tabs.Panel>
    </Tabs>
  );
}
