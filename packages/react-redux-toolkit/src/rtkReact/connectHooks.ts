import { UseFormReturn } from 'react-hook-form';
import { UseTranslationResponse, useTranslation } from 'react-i18next';
import * as Yup from 'yup';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { useReactFormToolkit } from '../react-form-toolkit';
import { ConnectHooksReturn, OwnPropsGeneric } from './types';

type OptionsGeneric = {
  extraArgsHooks?: Record<string, any>;
  extraArgsComponent?: Record<string, any>;
};

type MapHooksGeneric<
  Options extends OptionsGeneric,
  OwnProps extends OwnPropsGeneric,
  MapHooks extends (params: any) => any,
> = (
  params: {
    Yup: typeof Yup;
    ownProps: OwnProps;
    translate: UseTranslationResponse<'ns1'>[0];
  } & Options['extraArgsHooks'],
) => ConnectHooksReturn<MapHooks>;

export function createConnectHooks<
  Options extends OptionsGeneric,
  OwnProps extends OwnPropsGeneric = {},
>({
  extraArgsHooks,
  extraArgsComponent,
}: {
  extraArgsHooks?: Options['extraArgsHooks'];
  extraArgsComponent?: Options['extraArgsComponent'];
}): <
  MapHooks extends MapHooksGeneric<Options, OwnProps, MapHooks> = MapHooksGeneric<
    Options,
    OwnProps,
    any
  >,
>(
  mapHooks: MapHooks,
  displayName?: string,
) => (
  Component: React.FunctionComponent<
    Pick<ReturnType<MapHooks>, 'hooks' | 'apiQueries' | 'apiMutations'> & {
      form: UseFormReturn<Yup.InferType<ReturnType<MapHooks>['form']['schema']>>;
      translate: UseTranslationResponse<'ns1'>[0];
      ownProps: OwnProps;
    } & Options['extraArgsComponent']
  >,
) => {
  Component: React.FunctionComponent<
    ReturnType<MapHooks> & {
      mockActions?: Record<string, any>;
      ownProps: OwnProps;
    }
  >;
  mapHooks: MapHooks;
  Connected: React.FC<OwnProps>;
  extraArgsHooks: Options['extraArgsHooks'];
} {
  return function (mapHooks = (() => ({})) as any, displayName) {
    return (Component) => {
      function Connected(props: any) {
        const { t: translate } = useTranslation();
        const { hooks, form, apiQueries, apiMutations } = mapHooks({
          ...extraArgsHooks,
          ownProps: props,
          Yup,
          translate,
        });
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const toolkitForm = form && useReactFormToolkit(form as any);
        return (Component as any)({
          hooks,
          form: toolkitForm,
          apiQueries,
          apiMutations,
          translate,
          ownProps: props,
          ...extraArgsComponent,
        });
      }
      Connected.displayName = displayName;
      return {
        Component: (props) => {
          if (extraArgsComponent && props.mockActions) {
            extraArgsComponent.actions = props.mockActions;
          }
          return Component({ ...props, ...extraArgsComponent } as any);
        },
        mapHooks: mapHooks as any,
        Connected,
        extraArgsHooks,
      };
    };
  };
}
