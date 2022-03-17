import { UseFormReturn } from 'react-hook-form';
import { UseTranslationResponse, useTranslation } from 'react-i18next';
import { MapDispatchToPropsParam, ResolveThunks, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Yup from 'yup';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { useReactFormToolkit } from '../react-form-toolkit';
import { MapHooksReturn } from './types';

export type ConnectorProps<Connector extends (comoponent: React.FunctionComponent) => any> =
  Parameters<Parameters<Connector>[0]>[0];

type MapStateToPropsGeneric<
  AppState,
  OwnProps extends OwnPropsGeneric,
  Options extends OptionsGeneric,
> = (
  params: {
    state: AppState;
    ownProps: OwnProps;
  } & Options['extraArgsMapState'],
) => {};

type OptionsGeneric = {
  extraArgsMapState?: Record<string, any>;
  extraArgsMapDispatch?: Record<string, any>;
  extraArgsHooks?: Record<string, any>;
  extraArgsComponent?: Record<string, any>;
};

type MapDispatchToPropsGeneric<Options extends OptionsGeneric, OwnProps extends OwnPropsGeneric> = (
  params: Options['extraArgsMapDispatch'] & { ownProps: OwnProps },
) => MapDispatchToPropsParam<{}, {}>;

export type OwnPropsGeneric = {
  state?: Record<string, any>;
  actions?: Record<string, any>;
};

type MapHooksGeneric<
  AppState,
  Options extends OptionsGeneric,
  OwnProps extends OwnPropsGeneric,
  MapStateToProps extends MapStateToPropsGeneric<AppState, OwnProps, Options>,
  MapDispatchToProps extends MapDispatchToPropsGeneric<Options, OwnProps>,
  MapHooks extends (params: any) => any,
> = (
  params: { state: ReturnType<MapStateToProps> } & {
    actions: ResolveThunks<ReturnType<MapDispatchToProps>>;
  } & { Yup: typeof Yup } & Options['extraArgsHooks'],
) => {
  [P in keyof Omit<
    ReturnType<MapHooks>,
    'state' | 'form' | 'hooks' | 'apiQueries' | 'apiMutations'
  >]: never;
} & MapHooksReturn;

export function createConnectRedux<
  AppState,
  Options extends OptionsGeneric,
  OwnProps extends OwnPropsGeneric = OwnPropsGeneric,
>({
  extraArgsMapState,
  extraArgsMapDispatch,
  extraArgsHooks,
  extraArgsComponent,
}: {
  extraArgsMapState?: Options['extraArgsMapState'];
  extraArgsMapDispatch?: Options['extraArgsMapDispatch'];
  extraArgsHooks?: Options['extraArgsHooks'];
  extraArgsComponent?: Options['extraArgsComponent'];
}): <
  MapStateToProps extends MapStateToPropsGeneric<
    AppState,
    OwnProps,
    Options
  > = MapStateToPropsGeneric<AppState, OwnProps, Options>,
  MapDispatchToProps extends MapDispatchToPropsGeneric<
    Options,
    OwnProps
  > = MapDispatchToPropsGeneric<Options, OwnProps>,
  MapHooks extends MapHooksGeneric<
    AppState,
    Options,
    OwnProps,
    MapStateToProps,
    MapDispatchToProps,
    MapHooks
  > = MapHooksGeneric<AppState, Options, OwnProps, MapStateToProps, MapDispatchToProps, any>,
>(
  displayName: string,
  mapStateToProps?: MapStateToProps,
  mapDispatchToProps?: MapDispatchToProps,
  mapHooks?: MapHooks,
) => (
  Component: React.FunctionComponent<
    Pick<ReturnType<MapHooks>, 'hooks' | 'apiQueries' | 'apiMutations'> & {
      form: UseFormReturn<Yup.InferType<ReturnType<MapHooks>['form']['schema']>>;
      state: ReturnType<MapStateToProps>;
      actions: ResolveThunks<ReturnType<MapDispatchToProps>>;
      translate: UseTranslationResponse<'ns1'>[0];
    } & Options['extraArgsComponent']
  >,
) => {
  Component: React.FunctionComponent<ReturnType<MapHooks> & { state: ReturnType<MapStateToProps> }>;
  mapStateToProps: MapStateToProps;
  mapDispatchToProps: MapDispatchToProps;
  mapHooks: MapHooks;
  Connected: React.ComponentType<OwnProps>;
  extraArgsHooks: Options['extraArgsHooks'];
} {
  return function (
    displayName = '',
    mapStateToProps = (() => ({})) as any,
    mapDispatchToProps = (() => ({})) as any,
    mapHooks = (() => ({})) as any,
  ) {
    const mapStateToPropsMovedToState = (state: AppState, ownProps: any) => ({
      state: mapStateToProps({ state, ownProps, ...extraArgsMapState }),
    });
    const mapDispatchToPropsMovedToActions = (dispatch: any, ownProps: OwnProps) => ({
      actions: (mapDispatchToProps as any)
        ? bindActionCreators(
            (mapDispatchToProps as any)({ ownProps, ...extraArgsMapDispatch }),
            dispatch,
          )
        : {},
    });

    return (Component) => {
      const Connected = connect(
        mapStateToPropsMovedToState,
        mapDispatchToPropsMovedToActions,
      )((props: any) => {
        const { hooks, form, apiQueries, apiMutations } = mapHooks({
          state: props.state,
          actions: props.actions,
          Yup,
          ...extraArgsHooks,
        });
        const { t: translate } = useTranslation();
        const toolkitForm = form && useReactFormToolkit(form as any);
        return (Component as any)({
          ...props,
          hooks,
          state: props.state,
          form: toolkitForm,
          apiQueries,
          apiMutations,
          translate,
          ...extraArgsComponent,
        });
      });
      Connected.displayName = displayName;
      return {
        Component: (props) => Component({ ...props, ...extraArgsComponent } as any),
        mapStateToProps,
        mapDispatchToProps,
        mapHooks,
        Connected,
        extraArgsHooks,
      };
    };
  };
}

/**
 * @deprecated Use createConnectRedux
 */
export const createConnectProps = createConnectRedux;
