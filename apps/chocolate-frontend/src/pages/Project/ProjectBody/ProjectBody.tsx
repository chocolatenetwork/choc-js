import { Rating } from '$chocolate-frontend/components/Rating';
import { IProjectDb } from '$chocolate-frontend/models/Project';
import { IReviewDb } from '$chocolate-frontend/models/Review';
import { IUserDb } from '$chocolate-frontend/models/User';
import { H2 } from '$chocolate-frontend/pages/Projects/Project/ProjectCard.styles';
import { getAverage } from '$chocolate-frontend/utils/getAverage';
import { Image, Tabs } from '@mantine/core';
import {
  QueryObserverSuccessResult,
  UseQueryResult,
} from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Reviews } from '../Reviews/Reviews';
import { Submenu } from '../Submenu';
import {
  Banner,
  H1,
  HeaderBanner,
  ImageWrapper,
  NameSection,
  NameWrapper,
  ProfileRow,
  PROFILE_IMAGE_SIZE,
  RatingCircle,
  StyledHeader,
} from './ProjectBody.styles';
import { defaultPage, ProjectParams, TabOptions } from './ProjectBody.utils';

interface ProjectBodyProps {
  query: QueryObserverSuccessResult<IProjectDb, unknown>;
  reviewsQuery: UseQueryResult<IReviewDb[], unknown>;
  users: Record<string, IUserDb | undefined>;
}

export function ProjectBody(props: ProjectBodyProps) {
  const { reviewsQuery, query, users } = props;
  const [search, setSearchParams] = useSearchParams(defaultPage);
  const onChange = (tab: string | null) => {
    if (!tab) return;
    const newSearch = new URLSearchParams(search);
    newSearch.set(ProjectParams.tab, tab);
    setSearchParams(newSearch);
  };

  const { data } = query;
  console.log(data);
  const { ratingSum, reviewCount, name, logo } = data;
  return (
    <Tabs
      onTabChange={onChange}
      keepMounted={false}
      defaultValue={search.get(ProjectParams.tab)}
    >
      <StyledHeader>
        <HeaderBanner>
          <Banner />
          <ProfileRow>
            <NameSection>
              <ImageWrapper>
                <Image src={logo} height={PROFILE_IMAGE_SIZE} />
              </ImageWrapper>
              <NameWrapper>
                <H1>{name}</H1>
                <Rating value={getAverage(ratingSum, reviewCount)} readOnly />
              </NameWrapper>
            </NameSection>
            <RatingCircle>
              <H2>
                {getAverage(data.ratingSum, data.reviewCount).toPrecision(3)}
              </H2>
            </RatingCircle>
          </ProfileRow>
        </HeaderBanner>
        <Submenu />
      </StyledHeader>
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
