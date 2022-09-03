import { HumanTableSetReview } from '../../typeSystem/jsonTypes';
import { useEffect, useReducer, useState } from 'react';
import {
  Button,
  Container,
  Dropdown,
  Icon,
  Image,
  Label,
  StrictDropdownProps,
  Table,
  Transition,
} from 'semantic-ui-react';
import { Rating } from '../../customComponents/Projects';
import { tableReducer } from './utils';

/**
 * A table with headers being our filter buttons
 * Cells are reviews
 * Props come from useYourReviews return val:
 * [HumanTableSetReview[], anyMetaErr,anyMetaInitiallyLoading,isEitherCompletelyIdle]
 * */
const Main: React.FC<{
  data: [HumanTableSetReview[], boolean, boolean, boolean];
}> = (props) => {
  const { data } = props;
  const [
    searchData,
    isAnyDataErr,
    isAnyDataInitiallyLoading,
    isEitherDataIdle,
  ] = data;
  const [activeIndex, setActiveIndex] = useState(-1);
  const [filterProjectName, setFilterProjectName] = useState(0);
  const [filterRating, setFilterRating] = useState(0);
  const [state, dispatch] = useReducer(tableReducer, searchData);
  // intialise reducer
  useEffect(() => {
    dispatch({ type: 'INITIALISE', payload: searchData });
  }, [searchData]);
  if (searchData.length === 0) {
    if (isAnyDataErr) {
      return <div>Error...</div>;
    }
    if (isEitherDataIdle) {
      // slower speed
      return <div>Idle...</div>;
    }
  }
  if (isAnyDataInitiallyLoading) {
    return <div>Loading...</div>;
  }

  const filterProjects = searchData.map((review) => ({
    name: 'project',
    key: review.projectId,
    text: review.project.metadata.name,
    value: review.projectId,
  }));
  type ChangeArgs = Parameters<NonNullable<StrictDropdownProps['onChange']>>;
  type ClickArgs = [e: unknown, titleProps: { index: number }];
  // filter reducer
  const handleProjectFilterChange = (...args: ChangeArgs) => {
    const [, _data] = args;

    setFilterProjectName(Number(_data.value));
    dispatch({ type: 'INITIALISE', payload: searchData });
    dispatch({ type: 'FILTER_PROJECT_NAME', projectID: Number(_data.value) });
  };

  const handleRatingFilterChange = (...args: ChangeArgs) => {
    const [, _data] = args;
    const val = Number(_data.value);
    setFilterRating(val);
    dispatch({ type: 'INITIALISE', payload: searchData });
    dispatch({ type: 'FILTER_REVIEW_RATING', rating: val });
  };

  // accordian index
  const handleClick = (...args: ClickArgs) => {
    const [, titleProps] = args;
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };
  return (
    <Container>
      <Button.Group color="purple">
        <Dropdown
          onChange={handleProjectFilterChange}
          text="Filter by project"
          icon="filter"
          floating
          labeled
          button
          options={filterProjects}
          value={filterProjectName}
          className="icon"
        />
        <Dropdown
          onChange={handleRatingFilterChange}
          text="Filter by rating"
          icon="filter"
          floating
          labeled
          button
          options={[1, 2, 3, 4].map((rating) => ({
            key: rating,
            text: rating,
            value: rating,
          }))}
          value={filterRating}
          className="icon"
        />
      </Button.Group>
      {/* only one active */}

      <Transition.Group animation="fadeIn" duration={500}>
        <Table verticalAlign="top" padded striped>
          <Table.Body>
            {state.map((review, i) => {
              let label;
              switch (review.proposalStatus.status) {
                case 'Accepted':
                  label = (
                    <Label color="green" horizontal>
                      Accepted
                    </Label>
                  );
                  break;
                case 'Proposed':
                  label = (
                    <Label color="orange" horizontal>
                      Proposed
                    </Label>
                  );
                  break;
                case 'Rejected':
                  label = (
                    <Label color="red" horizontal>
                      Rejected
                    </Label>
                  );
                  break;
                default:
                  label = (
                    <Label color="blue" horizontal>
                      Pending
                    </Label>
                  );
                  break;
              }
              return (
                <>
                  <Table.Row
                    key={review.projectId}
                    onClick={(e: unknown) => handleClick(e, { index: i })}
                  >
                    <Table.Cell>
                      <Image
                        src={`${review.project.metadata.icon}`}
                        size="mini"
                        rounded
                      />
                    </Table.Cell>
                    <Table.Cell>{review.project.metadata.name}</Table.Cell>
                    <Table.Cell textAlign="right">
                      <Rating fixed rating={review.content.rating} />
                    </Table.Cell>
                    <Table.Cell>{label}</Table.Cell>
                    <Table.Cell collapsing textAlign="right">
                      <Button
                        icon
                        onClick={(e) => handleClick(e, { index: i })}
                      >
                        <Icon
                          name={`chevron ${activeIndex === i ? 'up' : 'down'}`}
                        />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                  {activeIndex === i ? (
                    <Table.Row>
                      <Table.Cell colSpan={5}>
                        <p>{review.content.reviewText}</p>
                      </Table.Cell>
                    </Table.Row>
                  ) : null}
                </>
              );
            })}
          </Table.Body>
        </Table>
      </Transition.Group>
    </Container>
  );
};

export default Main;
