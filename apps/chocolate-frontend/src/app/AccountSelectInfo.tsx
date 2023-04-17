import { ReactComponent as InfoCircle } from '$chocolate-frontend/assets/svg/info-circle.svg';
import { Tooltip } from '@mantine/core';
import { StyledText } from './AccountSelectInfo.styles';

export function AccountSelectInfo() {
  return (
    <Tooltip
      label={
        <StyledText inherit maw={300}>
          You have attempted an action that requires wallet connection such as
          creating a review or project, or signing a message.
          <br />
          Please select the account you would like to use for signatures from
          the following list, this will only grant us the ability to prompt you
          to sign messages.
        </StyledText>
      }
    >
      <div>
        <InfoCircle width={16} />
      </div>
    </Tooltip>
  );
}
