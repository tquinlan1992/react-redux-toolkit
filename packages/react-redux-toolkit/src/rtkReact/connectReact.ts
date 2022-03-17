import { UseTranslationResponse, useTranslation } from 'react-i18next';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function createConnectReact<
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
  Component: React.FunctionComponent<
    Options['extraArgsComponent'] & { translate: UseTranslationResponse<'ns1'>[0] } & OwnProps
  >,
) => {
  Component: React.FunctionComponent<OwnProps>;
  Connected: React.ComponentType<OwnProps>;
} {
  return function (displayName = '', mapHooks = (() => ({})) as any) {
    return (Component) => {
      function Connected(props: any) {
        const { t: translate } = useTranslation();
        const ConnectedComponent = (Component as any)({
          ...props,
          ...extraArgsComponent,
          translate,
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
