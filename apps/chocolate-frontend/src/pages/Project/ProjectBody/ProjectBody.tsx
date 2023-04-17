import { Rating } from '$chocolate-frontend/components/Rating';
import { IProjectDb } from '$chocolate-frontend/models/Project';
import { IReviewDb } from '$chocolate-frontend/models/Review';
import { IUserDb } from '$chocolate-frontend/models/User';
import { H2 } from '$chocolate-frontend/pages/Projects/Project/ProjectCard.styles';
import { getAverage } from '$chocolate-frontend/utils/getAverage';
import { makeModalFns } from '$chocolate-frontend/utils/makeModalFns';
import { parseUrlArray } from '$chocolate-frontend/utils/parseUrlArray';
import { toAverageValue } from '$chocolate-frontend/utils/toAverageValue';
import { Button, Image, Tabs } from '@mantine/core';
import {
  QueryObserverSuccessResult,
  UseQueryResult,
} from '@tanstack/react-query';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AddReviewModal } from '../AddReviewModal';
import { Reviews } from '../Reviews/Reviews';
import { Submenu } from '../Submenu';
import {
  AddReviewSection,
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
import {
  defaultPage,
  ProjectModals,
  ProjectParams,
  TabOptions,
} from './ProjectBody.utils';

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

  const modalParam = search.get(ProjectParams.modals) || '';

  const modals = useMemo(() => parseUrlArray(modalParam), [modalParam]);
  const addReviewOpen = modals.includes(ProjectModals.addReview);
  const { openModal, closeModal } = makeModalFns(
    modalParam,
    search,
    setSearchParams,
    ProjectParams.modals
  );

  const { data } = query;

  const { ratingSum, reviewCount, name, logo } = data;
  const ratingValue = getAverage(ratingSum, reviewCount);
  const averageValue = toAverageValue(ratingValue);
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
                <Rating value={averageValue} readOnly />
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

      <Tabs.Panel value={TabOptions.reviews}>
        <AddReviewSection>
          <Button onClick={() => openModal(ProjectModals.addReview)}>
            Add Review
          </Button>
        </AddReviewSection>
        <Reviews query={reviewsQuery} users={users} />
      </Tabs.Panel>
      <Tabs.Panel value={TabOptions.about}>
        <div className="about"></div>
      </Tabs.Panel>

      <AddReviewModal
        project={data}
        opened={addReviewOpen}
        onClose={() => closeModal(ProjectModals.addReview)}
      />
    </Tabs>
  );
}
