import { mapValues } from 'lodash';
import { UseFormReturn } from 'react-hook-form';
import { UseTranslationResponse, useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import * as Yup from 'yup';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { useReactFormToolkit } from '../react-form-toolkit';
import { MapHooksReturnBase, OwnPropsGeneric } from './types';

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
  extraArgsHooks?: Record<string, any>;
  extraArgsComponent?: Record<string, any>;
};

type MapHooksGeneric<
  AppState,
  Options extends OptionsGeneric,
  OwnProps extends OwnPropsGeneric,
  MapStateToProps extends MapStateToPropsGeneric<AppState, OwnProps, Options>,
  MapHooks extends (params: any) => any,
> = (
  params: {
    state: ReturnType<MapStateToProps>;
    Yup: typeof Yup;
    ownProps: OwnProps;
    translate: UseTranslationResponse<'ns1'>[0];
  } & Options['extraArgsHooks'],
) => MapHooksReturnBase<MapHooks>;

export function createConnectRedux<
  AppState,
  Options extends OptionsGeneric,
  OwnProps extends OwnPropsGeneric = {},
>({
  extraArgsMapState,
  extraArgsHooks,
  extraArgsComponent,
}: {
  extraArgsMapState?: Options['extraArgsMapState'];
  extraArgsHooks?: Options['extraArgsHooks'];
  extraArgsComponent?: Options['extraArgsComponent'];
}): <
  MapStateToProps extends MapStateToPropsGeneric<
    AppState,
    OwnProps,
    Options
  > = MapStateToPropsGeneric<AppState, OwnProps, Options>,
  MapHooks extends MapHooksGeneric<
    AppState,
    Options,
    OwnProps,
    MapStateToProps,
    MapHooks
  > = MapHooksGeneric<AppState, Options, OwnProps, MapStateToProps, any>,
>(
  displayName: string,
  mapStateToProps?: MapStateToProps,
  mapHooks?: MapHooks,
) => (
  Component: React.FunctionComponent<
    Pick<ReturnType<MapHooks>, 'hooks' | 'apiQueries' | 'apiMutations'> & {
      form: UseFormReturn<Yup.InferType<ReturnType<MapHooks>['form']['schema']>>;
      state: ReturnType<MapStateToProps>;
      translate: UseTranslationResponse<'ns1'>[0];
      ownProps: OwnProps;
    } & Options['extraArgsComponent']
  >,
) => {
  Component: React.FunctionComponent<
    ReturnType<MapHooks> & {
      state: ReturnType<MapStateToProps>;
      mockActions?: Record<string, any>;
      ownProps: OwnProps;
    }
  >;
  mapStateToProps: MapStateToProps;
  mapHooks: MapHooks;
  Connected: React.ComponentType<OwnProps>;
  extraArgsHooks: Options['extraArgsHooks'];
} {
  return function (
    displayName = '',
    mapStateToProps = (() => ({})) as any,
    mapHooks = (() => ({})) as any,
  ) {
    const mapStateToPropsMovedToState = (state: AppState, ownProps: any) => ({
      state: mapStateToProps({ state, ownProps, ...extraArgsMapState }),
      ownProps: ownProps,
    });

    return (Component) => {
      const Connected = connect(mapStateToPropsMovedToState)((props: any) => {
        const { t: translate } = useTranslation();
        const { hooks, form, apiQueries, apiMutations } = mapHooks({
          ...extraArgsHooks,
          state: props.state,
          ownProps: props.ownProps,
          Yup,
          translate,
        });
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
        Component: (props) => {
          if (extraArgsComponent && props.mockActions) {
            extraArgsComponent.actions = props.mockActions;
          }
          return Component({ ...props, ...extraArgsComponent } as any);
        },
        mapStateToProps,
        mapHooks,
        Connected,
        extraArgsHooks,
      };
    };
  };
}

export function mapDispatchActions<Actions extends Record<string, any>>({
  actions,
  dispatch,
}: {
  actions: Actions;
  dispatch: Dispatch<AnyAction>;
}): Actions {
  return mapValues(actions, (action) => {
    if (typeof action === 'function') {
      return (params: any) => dispatch(action(params));
    }
    if (action && typeof action === 'object') {
      return mapDispatchActions({ actions: action, dispatch });
    }
  }) as Actions;
}

/**
 * @deprecated Use createConnectRedux
 */
export const createConnectProps = createConnectRedux;
