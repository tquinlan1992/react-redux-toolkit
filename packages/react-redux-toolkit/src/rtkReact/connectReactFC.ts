/* eslint-disable @typescript-eslint/no-explicit-any */
export function createConnectReactFC<
  Options extends {
    extraArgsComponent?: Record<string, any>;
  },
  // eslint-disable-next-line @typescript-eslint/ban-types
  OwnProps = {},
>({
  extraArgsComponent,
}: {
  extraArgsComponent?: Options['extraArgsComponent'];
}): (displayName: string) => (
  Component: React.FunctionComponent<Options['extraArgsComponent'] & OwnProps>,
) => {
  Component: React.FunctionComponent<OwnProps>;
  Connected: React.ComponentType<OwnProps>;
} {
  return function (displayName = '', mapHooks = (() => ({})) as any) {
    return (Component) => {
      function Connected(props: any) {
        const ConnectedComponent = (Component as any)({
          ...props,
          ...extraArgsComponent,
        });
        return ConnectedComponent;
      }
      Connected.displayName = displayName;
      return {
        Component: (props) => Component({ ...props, ...extraArgsComponent } as any),
        mapHooks,
        Connected,
      };
    };
  };
}
