declare module 'react-identicon' {
  export declare interface ReactIdenticonProps {
    id: unknown;
    size: number;
    type: string;
  }
  export declare type DecoratedReactIdenticonProps = React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > &
    ReactIdenticonProps;
  @pure
  class Identicon extends React.Component<DecoratedReactIdenticonProps> {
    static displayName = 'Identicon';
    static defaultProps: ReactIdenticonProps;
    render(): JSX.Element;
  }
  export default Identicon;
}
