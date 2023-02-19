import { Button, Modal, Select } from '@mantine/core';
import { useState } from 'react';
import { KeyringMachineState } from '../services/machines/Keyring';
import { KeyringMachineSender } from '../services/machines/Keyring.schema';

interface SelectAccountsProps {
  send: KeyringMachineSender;
  state: KeyringMachineState;
}
export function SelectAccounts({ send, state }: SelectAccountsProps) {
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
    <Modal opened onClose={() => send('CANCEL')}>
      <Select
        data={accountItems}
        value={selectedAddress}
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
    </Modal>
  );
}
