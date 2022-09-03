// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/events';

import type { ApiTypes, AugmentedEvent } from '@polkadot/api-base/types';
import type {
  Bytes,
  Null,
  Option,
  Result,
  U8aFixed,
  Vec,
  bool,
  u128,
  u32,
  u64,
  u8,
} from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, H256 } from '@polkadot/types/interfaces/runtime';
import type {
  FrameSupportTokensMiscBalanceStatus,
  FrameSupportWeightsDispatchInfo,
  ParachainTemplateRuntimeCurrencyId,
  SpRuntimeDispatchError,
  XcmV1MultiLocation,
  XcmV2Response,
  XcmV2TraitsError,
  XcmV2TraitsOutcome,
  XcmV2Xcm,
  XcmVersionedMultiAssets,
  XcmVersionedMultiLocation,
} from '@polkadot/types/lookup';

export type __AugmentedEvent<ApiType extends ApiTypes> =
  AugmentedEvent<ApiType>;

declare module '@polkadot/api-base/types/events' {
  interface AugmentedEvents<ApiType extends ApiTypes> {
    balances: {
      /**
       * A balance was set by root.
       **/
      BalanceSet: AugmentedEvent<
        ApiType,
        [who: AccountId32, free: u128, reserved: u128],
        { who: AccountId32; free: u128; reserved: u128 }
      >;
      /**
       * Some amount was deposited (e.g. for transaction fees).
       **/
      Deposit: AugmentedEvent<
        ApiType,
        [who: AccountId32, amount: u128],
        { who: AccountId32; amount: u128 }
      >;
      /**
       * An account was removed whose balance was non-zero but below ExistentialDeposit,
       * resulting in an outright loss.
       **/
      DustLost: AugmentedEvent<
        ApiType,
        [account: AccountId32, amount: u128],
        { account: AccountId32; amount: u128 }
      >;
      /**
       * An account was created with some free balance.
       **/
      Endowed: AugmentedEvent<
        ApiType,
        [account: AccountId32, freeBalance: u128],
        { account: AccountId32; freeBalance: u128 }
      >;
      /**
       * Some balance was reserved (moved from free to reserved).
       **/
      Reserved: AugmentedEvent<
        ApiType,
        [who: AccountId32, amount: u128],
        { who: AccountId32; amount: u128 }
      >;
      /**
       * Some balance was moved from the reserve of the first account to the second account.
       * Final argument indicates the destination balance type.
       **/
      ReserveRepatriated: AugmentedEvent<
        ApiType,
        [
          from: AccountId32,
          to: AccountId32,
          amount: u128,
          destinationStatus: FrameSupportTokensMiscBalanceStatus
        ],
        {
          from: AccountId32;
          to: AccountId32;
          amount: u128;
          destinationStatus: FrameSupportTokensMiscBalanceStatus;
        }
      >;
      /**
       * Some amount was removed from the account (e.g. for misbehavior).
       **/
      Slashed: AugmentedEvent<
        ApiType,
        [who: AccountId32, amount: u128],
        { who: AccountId32; amount: u128 }
      >;
      /**
       * Transfer succeeded.
       **/
      Transfer: AugmentedEvent<
        ApiType,
        [from: AccountId32, to: AccountId32, amount: u128],
        { from: AccountId32; to: AccountId32; amount: u128 }
      >;
      /**
       * Some balance was unreserved (moved from reserved to free).
       **/
      Unreserved: AugmentedEvent<
        ApiType,
        [who: AccountId32, amount: u128],
        { who: AccountId32; amount: u128 }
      >;
      /**
       * Some amount was withdrawn from the account (e.g. for transaction fees).
       **/
      Withdraw: AugmentedEvent<
        ApiType,
        [who: AccountId32, amount: u128],
        { who: AccountId32; amount: u128 }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    chocolateModule: {
      /**
       * Parameters [project_id]
       **/
      ProjectAccepted: AugmentedEvent<ApiType, [u32]>;
      /**
       * parameters. [owner, cid, project_id]
       **/
      ProjectCreated: AugmentedEvent<ApiType, [AccountId32, Bytes, u32]>;
      /**
       * parameters [owner, project_id]
       **/
      ReviewAccepted: AugmentedEvent<ApiType, [AccountId32, u32]>;
      /**
       * parameters. [owner, project_id]
       **/
      ReviewCreated: AugmentedEvent<ApiType, [AccountId32, u32]>;
      /**
       * Event documentation should end with an array that provides descriptive names for event
       * parameters. [something, who]
       **/
      SomethingStored: AugmentedEvent<ApiType, [u32, AccountId32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    collatorSelection: {
      CandidateAdded: AugmentedEvent<
        ApiType,
        [accountId: AccountId32, deposit: u128],
        { accountId: AccountId32; deposit: u128 }
      >;
      CandidateRemoved: AugmentedEvent<
        ApiType,
        [accountId: AccountId32],
        { accountId: AccountId32 }
      >;
      NewCandidacyBond: AugmentedEvent<
        ApiType,
        [bondAmount: u128],
        { bondAmount: u128 }
      >;
      NewDesiredCandidates: AugmentedEvent<
        ApiType,
        [desiredCandidates: u32],
        { desiredCandidates: u32 }
      >;
      NewInvulnerables: AugmentedEvent<
        ApiType,
        [invulnerables: Vec<AccountId32>],
        { invulnerables: Vec<AccountId32> }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    council: {
      /**
       * A motion was approved by the required threshold.
       **/
      Approved: AugmentedEvent<
        ApiType,
        [proposalHash: H256],
        { proposalHash: H256 }
      >;
      /**
       * A proposal was closed because its threshold was reached or after its duration was up.
       **/
      Closed: AugmentedEvent<
        ApiType,
        [proposalHash: H256, yes: u32, no: u32],
        { proposalHash: H256; yes: u32; no: u32 }
      >;
      /**
       * A motion was not approved by the required threshold.
       **/
      Disapproved: AugmentedEvent<
        ApiType,
        [proposalHash: H256],
        { proposalHash: H256 }
      >;
      /**
       * A motion was executed; result will be `Ok` if it returned without error.
       **/
      Executed: AugmentedEvent<
        ApiType,
        [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>],
        { proposalHash: H256; result: Result<Null, SpRuntimeDispatchError> }
      >;
      /**
       * A single member did some action; result will be `Ok` if it returned without error.
       **/
      MemberExecuted: AugmentedEvent<
        ApiType,
        [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>],
        { proposalHash: H256; result: Result<Null, SpRuntimeDispatchError> }
      >;
      /**
       * A motion (given hash) has been proposed (by given account) with a threshold (given
       * `MemberCount`).
       **/
      Proposed: AugmentedEvent<
        ApiType,
        [
          account: AccountId32,
          proposalIndex: u32,
          proposalHash: H256,
          threshold: u32
        ],
        {
          account: AccountId32;
          proposalIndex: u32;
          proposalHash: H256;
          threshold: u32;
        }
      >;
      /**
       * A motion (given hash) has been voted on by given account, leaving
       * a tally (yes votes and no votes given respectively as `MemberCount`).
       **/
      Voted: AugmentedEvent<
        ApiType,
        [
          account: AccountId32,
          proposalHash: H256,
          voted: bool,
          yes: u32,
          no: u32
        ],
        {
          account: AccountId32;
          proposalHash: H256;
          voted: bool;
          yes: u32;
          no: u32;
        }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    cumulusXcm: {
      /**
       * Downward message executed with the given outcome.
       * \[ id, outcome \]
       **/
      ExecutedDownward: AugmentedEvent<ApiType, [U8aFixed, XcmV2TraitsOutcome]>;
      /**
       * Downward message is invalid XCM.
       * \[ id \]
       **/
      InvalidFormat: AugmentedEvent<ApiType, [U8aFixed]>;
      /**
       * Downward message is unsupported version of XCM.
       * \[ id \]
       **/
      UnsupportedVersion: AugmentedEvent<ApiType, [U8aFixed]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    dmpQueue: {
      /**
       * Downward message executed with the given outcome.
       **/
      ExecutedDownward: AugmentedEvent<
        ApiType,
        [messageId: U8aFixed, outcome: XcmV2TraitsOutcome],
        { messageId: U8aFixed; outcome: XcmV2TraitsOutcome }
      >;
      /**
       * Downward message is invalid XCM.
       **/
      InvalidFormat: AugmentedEvent<
        ApiType,
        [messageId: U8aFixed],
        { messageId: U8aFixed }
      >;
      /**
       * Downward message is overweight and was placed in the overweight queue.
       **/
      OverweightEnqueued: AugmentedEvent<
        ApiType,
        [messageId: U8aFixed, overweightIndex: u64, requiredWeight: u64],
        { messageId: U8aFixed; overweightIndex: u64; requiredWeight: u64 }
      >;
      /**
       * Downward message from the overweight queue was executed.
       **/
      OverweightServiced: AugmentedEvent<
        ApiType,
        [overweightIndex: u64, weightUsed: u64],
        { overweightIndex: u64; weightUsed: u64 }
      >;
      /**
       * Downward message is unsupported version of XCM.
       **/
      UnsupportedVersion: AugmentedEvent<
        ApiType,
        [messageId: U8aFixed],
        { messageId: U8aFixed }
      >;
      /**
       * The weight limit for handling downward messages was reached.
       **/
      WeightExhausted: AugmentedEvent<
        ApiType,
        [messageId: U8aFixed, remainingWeight: u64, requiredWeight: u64],
        { messageId: U8aFixed; remainingWeight: u64; requiredWeight: u64 }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    mintingModule: {
      /**
       * Parameters. [Amount]
       **/
      Minted: AugmentedEvent<ApiType, [u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    parachainSystem: {
      /**
       * Downward messages were processed using the given weight.
       **/
      DownwardMessagesProcessed: AugmentedEvent<
        ApiType,
        [weightUsed: u64, dmqHead: H256],
        { weightUsed: u64; dmqHead: H256 }
      >;
      /**
       * Some downward messages have been received and will be processed.
       **/
      DownwardMessagesReceived: AugmentedEvent<
        ApiType,
        [count: u32],
        { count: u32 }
      >;
      /**
       * An upgrade has been authorized.
       **/
      UpgradeAuthorized: AugmentedEvent<
        ApiType,
        [codeHash: H256],
        { codeHash: H256 }
      >;
      /**
       * The validation function was applied as of the contained relay chain block number.
       **/
      ValidationFunctionApplied: AugmentedEvent<
        ApiType,
        [relayChainBlockNum: u32],
        { relayChainBlockNum: u32 }
      >;
      /**
       * The relay-chain aborted the upgrade process.
       **/
      ValidationFunctionDiscarded: AugmentedEvent<ApiType, []>;
      /**
       * The validation function has been scheduled to apply.
       **/
      ValidationFunctionStored: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    phragmenElection: {
      /**
       * A candidate was slashed by amount due to failing to obtain a seat as member or
       * runner-up.
       *
       * Note that old members and runners-up are also candidates.
       **/
      CandidateSlashed: AugmentedEvent<
        ApiType,
        [candidate: AccountId32, amount: u128],
        { candidate: AccountId32; amount: u128 }
      >;
      /**
       * Internal error happened while trying to perform election.
       **/
      ElectionError: AugmentedEvent<ApiType, []>;
      /**
       * No (or not enough) candidates existed for this round. This is different from
       * `NewTerm(\[\])`. See the description of `NewTerm`.
       **/
      EmptyTerm: AugmentedEvent<ApiType, []>;
      /**
       * A member has been removed. This should always be followed by either `NewTerm` or
       * `EmptyTerm`.
       **/
      MemberKicked: AugmentedEvent<
        ApiType,
        [member: AccountId32],
        { member: AccountId32 }
      >;
      /**
       * A new term with new_members. This indicates that enough candidates existed to run
       * the election, not that enough have has been elected. The inner value must be examined
       * for this purpose. A `NewTerm(\[\])` indicates that some candidates got their bond
       * slashed and none were elected, whilst `EmptyTerm` means that no candidates existed to
       * begin with.
       **/
      NewTerm: AugmentedEvent<
        ApiType,
        [newMembers: Vec<ITuple<[AccountId32, u128]>>],
        { newMembers: Vec<ITuple<[AccountId32, u128]>> }
      >;
      /**
       * Someone has renounced their candidacy.
       **/
      Renounced: AugmentedEvent<
        ApiType,
        [candidate: AccountId32],
        { candidate: AccountId32 }
      >;
      /**
       * A seat holder was slashed by amount by being forcefully removed from the set.
       **/
      SeatHolderSlashed: AugmentedEvent<
        ApiType,
        [seatHolder: AccountId32, amount: u128],
        { seatHolder: AccountId32; amount: u128 }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    polkadotXcm: {
      /**
       * Some assets have been placed in an asset trap.
       *
       * \[ hash, origin, assets \]
       **/
      AssetsTrapped: AugmentedEvent<
        ApiType,
        [H256, XcmV1MultiLocation, XcmVersionedMultiAssets]
      >;
      /**
       * Execution of an XCM message was attempted.
       *
       * \[ outcome \]
       **/
      Attempted: AugmentedEvent<ApiType, [XcmV2TraitsOutcome]>;
      /**
       * Expected query response has been received but the origin location of the response does
       * not match that expected. The query remains registered for a later, valid, response to
       * be received and acted upon.
       *
       * \[ origin location, id, expected location \]
       **/
      InvalidResponder: AugmentedEvent<
        ApiType,
        [XcmV1MultiLocation, u64, Option<XcmV1MultiLocation>]
      >;
      /**
       * Expected query response has been received but the expected origin location placed in
       * storage by this runtime previously cannot be decoded. The query remains registered.
       *
       * This is unexpected (since a location placed in storage in a previously executing
       * runtime should be readable prior to query timeout) and dangerous since the possibly
       * valid response will be dropped. Manual governance intervention is probably going to be
       * needed.
       *
       * \[ origin location, id \]
       **/
      InvalidResponderVersion: AugmentedEvent<
        ApiType,
        [XcmV1MultiLocation, u64]
      >;
      /**
       * Query response has been received and query is removed. The registered notification has
       * been dispatched and executed successfully.
       *
       * \[ id, pallet index, call index \]
       **/
      Notified: AugmentedEvent<ApiType, [u64, u8, u8]>;
      /**
       * Query response has been received and query is removed. The dispatch was unable to be
       * decoded into a `Call`; this might be due to dispatch function having a signature which
       * is not `(origin, QueryId, Response)`.
       *
       * \[ id, pallet index, call index \]
       **/
      NotifyDecodeFailed: AugmentedEvent<ApiType, [u64, u8, u8]>;
      /**
       * Query response has been received and query is removed. There was a general error with
       * dispatching the notification call.
       *
       * \[ id, pallet index, call index \]
       **/
      NotifyDispatchError: AugmentedEvent<ApiType, [u64, u8, u8]>;
      /**
       * Query response has been received and query is removed. The registered notification could
       * not be dispatched because the dispatch weight is greater than the maximum weight
       * originally budgeted by this runtime for the query result.
       *
       * \[ id, pallet index, call index, actual weight, max budgeted weight \]
       **/
      NotifyOverweight: AugmentedEvent<ApiType, [u64, u8, u8, u64, u64]>;
      /**
       * A given location which had a version change subscription was dropped owing to an error
       * migrating the location to our new XCM format.
       *
       * \[ location, query ID \]
       **/
      NotifyTargetMigrationFail: AugmentedEvent<
        ApiType,
        [XcmVersionedMultiLocation, u64]
      >;
      /**
       * A given location which had a version change subscription was dropped owing to an error
       * sending the notification to it.
       *
       * \[ location, query ID, error \]
       **/
      NotifyTargetSendFail: AugmentedEvent<
        ApiType,
        [XcmV1MultiLocation, u64, XcmV2TraitsError]
      >;
      /**
       * Query response has been received and is ready for taking with `take_response`. There is
       * no registered notification call.
       *
       * \[ id, response \]
       **/
      ResponseReady: AugmentedEvent<ApiType, [u64, XcmV2Response]>;
      /**
       * Received query response has been read and removed.
       *
       * \[ id \]
       **/
      ResponseTaken: AugmentedEvent<ApiType, [u64]>;
      /**
       * A XCM message was sent.
       *
       * \[ origin, destination, message \]
       **/
      Sent: AugmentedEvent<
        ApiType,
        [XcmV1MultiLocation, XcmV1MultiLocation, XcmV2Xcm]
      >;
      /**
       * The supported version of a location has been changed. This might be through an
       * automatic notification or a manual intervention.
       *
       * \[ location, XCM version \]
       **/
      SupportedVersionChanged: AugmentedEvent<
        ApiType,
        [XcmV1MultiLocation, u32]
      >;
      /**
       * Query response received which does not match a registered query. This may be because a
       * matching query was never registered, it may be because it is a duplicate response, or
       * because the query timed out.
       *
       * \[ origin location, id \]
       **/
      UnexpectedResponse: AugmentedEvent<ApiType, [XcmV1MultiLocation, u64]>;
      /**
       * An XCM version change notification message has been attempted to be sent.
       *
       * \[ destination, result \]
       **/
      VersionChangeNotified: AugmentedEvent<ApiType, [XcmV1MultiLocation, u32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    session: {
      /**
       * New session has happened. Note that the argument is the session index, not the
       * block number as the type might suggest.
       **/
      NewSession: AugmentedEvent<
        ApiType,
        [sessionIndex: u32],
        { sessionIndex: u32 }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    system: {
      /**
       * `:code` was updated.
       **/
      CodeUpdated: AugmentedEvent<ApiType, []>;
      /**
       * An extrinsic failed.
       **/
      ExtrinsicFailed: AugmentedEvent<
        ApiType,
        [
          dispatchError: SpRuntimeDispatchError,
          dispatchInfo: FrameSupportWeightsDispatchInfo
        ],
        {
          dispatchError: SpRuntimeDispatchError;
          dispatchInfo: FrameSupportWeightsDispatchInfo;
        }
      >;
      /**
       * An extrinsic completed successfully.
       **/
      ExtrinsicSuccess: AugmentedEvent<
        ApiType,
        [dispatchInfo: FrameSupportWeightsDispatchInfo],
        { dispatchInfo: FrameSupportWeightsDispatchInfo }
      >;
      /**
       * An account was reaped.
       **/
      KilledAccount: AugmentedEvent<
        ApiType,
        [account: AccountId32],
        { account: AccountId32 }
      >;
      /**
       * A new account was created.
       **/
      NewAccount: AugmentedEvent<
        ApiType,
        [account: AccountId32],
        { account: AccountId32 }
      >;
      /**
       * On on-chain remark happened.
       **/
      Remarked: AugmentedEvent<
        ApiType,
        [sender: AccountId32, hash_: H256],
        { sender: AccountId32; hash_: H256 }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    templatePallet: {
      /**
       * Event documentation should end with an array that provides descriptive names for event
       * parameters. [something, who]
       **/
      SomethingStored: AugmentedEvent<ApiType, [u32, AccountId32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    tokens: {
      /**
       * A balance was set by root.
       **/
      BalanceSet: AugmentedEvent<
        ApiType,
        [
          currencyId: ParachainTemplateRuntimeCurrencyId,
          who: AccountId32,
          free: u128,
          reserved: u128
        ],
        {
          currencyId: ParachainTemplateRuntimeCurrencyId;
          who: AccountId32;
          free: u128;
          reserved: u128;
        }
      >;
      /**
       * Deposited some balance into an account
       **/
      Deposited: AugmentedEvent<
        ApiType,
        [
          currencyId: ParachainTemplateRuntimeCurrencyId,
          who: AccountId32,
          amount: u128
        ],
        {
          currencyId: ParachainTemplateRuntimeCurrencyId;
          who: AccountId32;
          amount: u128;
        }
      >;
      /**
       * An account was removed whose balance was non-zero but below
       * ExistentialDeposit, resulting in an outright loss.
       **/
      DustLost: AugmentedEvent<
        ApiType,
        [
          currencyId: ParachainTemplateRuntimeCurrencyId,
          who: AccountId32,
          amount: u128
        ],
        {
          currencyId: ParachainTemplateRuntimeCurrencyId;
          who: AccountId32;
          amount: u128;
        }
      >;
      /**
       * An account was created with some free balance.
       **/
      Endowed: AugmentedEvent<
        ApiType,
        [
          currencyId: ParachainTemplateRuntimeCurrencyId,
          who: AccountId32,
          amount: u128
        ],
        {
          currencyId: ParachainTemplateRuntimeCurrencyId;
          who: AccountId32;
          amount: u128;
        }
      >;
      /**
       * Some locked funds were unlocked
       **/
      LockRemoved: AugmentedEvent<
        ApiType,
        [
          lockId: U8aFixed,
          currencyId: ParachainTemplateRuntimeCurrencyId,
          who: AccountId32
        ],
        {
          lockId: U8aFixed;
          currencyId: ParachainTemplateRuntimeCurrencyId;
          who: AccountId32;
        }
      >;
      /**
       * Some funds are locked
       **/
      LockSet: AugmentedEvent<
        ApiType,
        [
          lockId: U8aFixed,
          currencyId: ParachainTemplateRuntimeCurrencyId,
          who: AccountId32,
          amount: u128
        ],
        {
          lockId: U8aFixed;
          currencyId: ParachainTemplateRuntimeCurrencyId;
          who: AccountId32;
          amount: u128;
        }
      >;
      /**
       * Some balance was reserved (moved from free to reserved).
       **/
      Reserved: AugmentedEvent<
        ApiType,
        [
          currencyId: ParachainTemplateRuntimeCurrencyId,
          who: AccountId32,
          amount: u128
        ],
        {
          currencyId: ParachainTemplateRuntimeCurrencyId;
          who: AccountId32;
          amount: u128;
        }
      >;
      /**
       * Some reserved balance was repatriated (moved from reserved to
       * another account).
       **/
      ReserveRepatriated: AugmentedEvent<
        ApiType,
        [
          currencyId: ParachainTemplateRuntimeCurrencyId,
          from: AccountId32,
          to: AccountId32,
          amount: u128,
          status: FrameSupportTokensMiscBalanceStatus
        ],
        {
          currencyId: ParachainTemplateRuntimeCurrencyId;
          from: AccountId32;
          to: AccountId32;
          amount: u128;
          status: FrameSupportTokensMiscBalanceStatus;
        }
      >;
      /**
       * Some balances were slashed (e.g. due to mis-behavior)
       **/
      Slashed: AugmentedEvent<
        ApiType,
        [
          currencyId: ParachainTemplateRuntimeCurrencyId,
          who: AccountId32,
          freeAmount: u128,
          reservedAmount: u128
        ],
        {
          currencyId: ParachainTemplateRuntimeCurrencyId;
          who: AccountId32;
          freeAmount: u128;
          reservedAmount: u128;
        }
      >;
      /**
       * The total issuance of an currency has been set
       **/
      TotalIssuanceSet: AugmentedEvent<
        ApiType,
        [currencyId: ParachainTemplateRuntimeCurrencyId, amount: u128],
        { currencyId: ParachainTemplateRuntimeCurrencyId; amount: u128 }
      >;
      /**
       * Transfer succeeded.
       **/
      Transfer: AugmentedEvent<
        ApiType,
        [
          currencyId: ParachainTemplateRuntimeCurrencyId,
          from: AccountId32,
          to: AccountId32,
          amount: u128
        ],
        {
          currencyId: ParachainTemplateRuntimeCurrencyId;
          from: AccountId32;
          to: AccountId32;
          amount: u128;
        }
      >;
      /**
       * Some balance was unreserved (moved from reserved to free).
       **/
      Unreserved: AugmentedEvent<
        ApiType,
        [
          currencyId: ParachainTemplateRuntimeCurrencyId,
          who: AccountId32,
          amount: u128
        ],
        {
          currencyId: ParachainTemplateRuntimeCurrencyId;
          who: AccountId32;
          amount: u128;
        }
      >;
      /**
       * Some balances were withdrawn (e.g. pay for transaction fee)
       **/
      Withdrawn: AugmentedEvent<
        ApiType,
        [
          currencyId: ParachainTemplateRuntimeCurrencyId,
          who: AccountId32,
          amount: u128
        ],
        {
          currencyId: ParachainTemplateRuntimeCurrencyId;
          who: AccountId32;
          amount: u128;
        }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    treasury: {
      /**
       * Some funds have been allocated.
       **/
      Awarded: AugmentedEvent<
        ApiType,
        [proposalIndex: u32, award: u128, account: AccountId32],
        { proposalIndex: u32; award: u128; account: AccountId32 }
      >;
      /**
       * Some of our funds have been burnt.
       **/
      Burnt: AugmentedEvent<ApiType, [burntFunds: u128], { burntFunds: u128 }>;
      /**
       * Some funds have been deposited.
       **/
      Deposit: AugmentedEvent<ApiType, [value: u128], { value: u128 }>;
      /**
       * New proposal.
       **/
      Proposed: AugmentedEvent<
        ApiType,
        [proposalIndex: u32],
        { proposalIndex: u32 }
      >;
      /**
       * A proposal was rejected; funds were slashed.
       **/
      Rejected: AugmentedEvent<
        ApiType,
        [proposalIndex: u32, slashed: u128],
        { proposalIndex: u32; slashed: u128 }
      >;
      /**
       * Spending has finished; this is the amount that rolls over until next spend.
       **/
      Rollover: AugmentedEvent<
        ApiType,
        [rolloverBalance: u128],
        { rolloverBalance: u128 }
      >;
      /**
       * We have ended a spend period and will now allocate funds.
       **/
      Spending: AugmentedEvent<
        ApiType,
        [budgetRemaining: u128],
        { budgetRemaining: u128 }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    usersModule: {
      SomethingStored: AugmentedEvent<ApiType, [u32, AccountId32]>;
      UserCreated: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    xcmpQueue: {
      /**
       * Bad XCM format used.
       **/
      BadFormat: AugmentedEvent<ApiType, [Option<H256>]>;
      /**
       * Bad XCM version used.
       **/
      BadVersion: AugmentedEvent<ApiType, [Option<H256>]>;
      /**
       * Some XCM failed.
       **/
      Fail: AugmentedEvent<ApiType, [Option<H256>, XcmV2TraitsError]>;
      /**
       * An XCM exceeded the individual message weight budget.
       **/
      OverweightEnqueued: AugmentedEvent<ApiType, [u32, u32, u64, u64]>;
      /**
       * An XCM from the overweight queue was executed with the given actual weight used.
       **/
      OverweightServiced: AugmentedEvent<ApiType, [u64, u64]>;
      /**
       * Some XCM was executed ok.
       **/
      Success: AugmentedEvent<ApiType, [Option<H256>]>;
      /**
       * An upward message was sent to the relay chain.
       **/
      UpwardMessageSent: AugmentedEvent<ApiType, [Option<H256>]>;
      /**
       * An HRMP message was sent to a sibling parachain.
       **/
      XcmpMessageSent: AugmentedEvent<ApiType, [Option<H256>]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
  } // AugmentedEvents
} // declare module
