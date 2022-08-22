export interface TxButtonProps {
  accountPair?: any;
  setEvent?: (events: any) => void;
  label: any;
  setStatus: (s: string) => void;
  color?: string;
  style?: any;
  type?:
    | 'QUERY'
    | 'UNCHECKED-SUDO-TX'
    | 'UNSIGNED-TX'
    | 'SIGNED-TX'
    | 'RPC'
    | 'CONSTANT';
  attrs?: any;
  disabled?: boolean;
}
