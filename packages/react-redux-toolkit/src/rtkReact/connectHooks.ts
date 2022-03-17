/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseMapHooks } from './types';

export function createConnectHooks<
  Options extends {
    extraArgsHooks?: Record<string, any>;
    extraArgsComponent?: Record<string, any>;
  },
  // eslint-disable-next-line @typescript-eslint/ban-types
  OwnProps = {},
>({
  extraArgsHooks,
  extraArgsComponent,
}: {
  extraArgsHooks?: Options['extraArgsHooks'];
  extraArgsComponent?: Options['extraArgsComponent'];
}): <MapHooks extends (params: Options['extraArgsHooks']) => BaseMapHooks>(
  displayName: string,
  mapHooks?: MapHooks,
) => (
  Component: React.FunctionComponent<
    Pick<ReturnType<MapHooks>, 'hooks' | 'form'> & Options['extraArgsComponent']
  >,
) => {
  Component: React.FunctionComponent<ReturnType<MapHooks> & OwnProps>;
  mapHooks: MapHooks;
  Connected: React.ComponentType<OwnProps>;
} {
  return function (displayName = '', mapHooks = (() => ({})) as any) {
    return (Component) => {
      function Connected(props: any) {
        const { form, hooks, apiQueries, apiMutations } = mapHooks({
          ...extraArgsHooks,
        });
        const ConnectedComponent = (Component as any)({
          ...props,
          form,
          hooks,
          apiQueries,
          apiMutations,
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
