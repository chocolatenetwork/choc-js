/* eslint-disable import/no-unresolved */
import { AddressOrPair } from '@polkadot/api/types';
import { PalletChocolateCall } from '@polkadot/types/lookup';
import { useContext, useState } from 'react';
import config from '../../../config';
import { SubstrateReadyCTX } from '../../../Layouts/app/InnerAppProvider';
const isDebug = config.REACT_APP_DEBUG;
type CurId = PalletChocolateCall['asCreateReview']['collateralCurrencyId'];
type Generics = Exclude<CurId['type'], 'Native'>;
export type AllIds = Uppercase<Generics> | 'Native';

type TxData = {
  id: string;
  cid: string;
  rating: number;
  CurrencyId: CurId | AllIds;
};

/** Send the actual review to chain along with cid */
function useReviewSend(
  txData: TxData,
  account: AddressOrPair
): { data: string } {
  const { id, cid, rating, CurrencyId } = txData;
  const { api } = useContext(SubstrateReadyCTX);
  const [fee, setFee] = useState('..loading fee..');
  const getPaymentInfo = async function () {
    // Todo: Accept different methods
    const paymentInfo = await api.tx.chocolateModule
      .createReview([rating, cid], id, CurrencyId)
      .paymentInfo(account);
    const retFee = paymentInfo.partialFee.toHuman();
    setFee(retFee);
  };
  if (account) getPaymentInfo().catch((e) => isDebug && console.error(e));
  return { data: fee };
}
export { useReviewSend };
