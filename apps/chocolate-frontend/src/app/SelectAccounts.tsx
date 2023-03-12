import { Button, Select } from '@mantine/core';
import { useState } from 'react';
import styled from 'styled-components';
import { KeyringMachineState } from '../services/machines/Keyring';
import { KeyringMachineSender } from '../services/machines/Keyring.schema';

interface SelectAccountsProps {
  send: KeyringMachineSender;
  state: KeyringMachineState;
  className?: string;
}
function SelectAccounts(props: SelectAccountsProps) {
  const { send, state, ...rest } = props;
  const accountItems = state.context.accounts.map((value) => {
    return {
      value: value.address,
      label: value.meta.name,
    };
  });
  const [selectedAddress, setSelected] = useState<string | null>(null);
  const selectedAccount = state.context.accounts.find((account) => {
    return account.address === selectedAddress;
  });
  return (
    <div {...rest}>
      <Select
        data={accountItems}
        value={selectedAddress}
        label="Account"
        placeholder="Select an account..."
        onChange={setSelected}
      />
      <Button
        onClick={() => {
          if (!selectedAccount) return;
          return send({
            type: 'SELECT-ACCOUNT',
            selectedAccount: selectedAccount,
          });
        }}
        disabled={!selectedAccount}
      >
        Confirm
      </Button>
    </div>
  );
}

export default styled(SelectAccounts)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 10px;
`;
