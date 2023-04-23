import { makeTweetUrl } from '$chocolate-frontend/utils/makeTweetUrl';
import { Button, CopyButton, CopyButtonProps, Text } from '@mantine/core';
import styled from 'styled-components';
import { ActiveMap } from './types';

interface SecondStepProps {
  className?: string;
  verificationId: string;
  onValidChange: (map: ActiveMap) => void;
  index: number;
}
const verifiers = ['@chocNetwork'];
function SecondStep(props: SecondStepProps) {
  const { verificationId, index, onValidChange, ...rest } = props;

  const verifierPart = verifiers.join(' ');
  const copyValue = `${verifierPart} my verification Id is: ${verificationId}`;
  const tweetUrl = makeTweetUrl(copyValue);

  const onDone = () => {
    onValidChange({ [index]: true });
  };
  const copyFn: CopyButtonProps['children'] = ({ copied, copy }) => {
    let color = 'default';
    if (copied) color = 'green';
    const onClick = () => {
      onDone();
      copy();
    };
    return (
      <Button onClick={onClick} color={color}>
        Copy and tweet it yourself
      </Button>
    );
  };
  return (
    <div {...rest}>
      <div className="SecondStep_Body">
        <Text className="Message">
          {verifierPart} my verification Id is: {verificationId}
        </Text>
        <div className="SecondStep_TweetButtons">
          <Button
            component="a"
            href={tweetUrl}
            onClick={onDone}
            target="_blank"
          >
            Tweet
          </Button>
          <CopyButton value={copyValue}>{copyFn}</CopyButton>
        </div>
      </div>
    </div>
  );
}

export default styled(SecondStep)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  .SecondStep_Body {
    max-width: 658px;

    .Message {
      overflow-wrap: anywhere;
      padding: 20px;
      background-color: #fff;
      border-radius: var(--mantine-radius-md);

      margin-bottom: 20px;
    }

    .SecondStep_TweetButtons {
      display: flex;
      column-gap: 20px;
    }
  }
`;
