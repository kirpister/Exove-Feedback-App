import  React, { PureComponent, ReactElement } from "react";

interface Props {
  chartElement?: ReactElement;
  tableElement?:ReactElement
}

interface State {
  checked: boolean;
}

export class ComponentToPrint extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { checked: false };
  }
  public render() {

    return (
      <div
       >
        {this.props.chartElement}
        {this.props.tableElement}
      </div>
    );
  }
}

export const FunctionalComponentToPrint = React.forwardRef<ComponentToPrint | null, Props>((props, ref) => {
  // eslint-disable-line max-len
  return <ComponentToPrint ref={ref} chartElement={props.chartElement} />;
});
