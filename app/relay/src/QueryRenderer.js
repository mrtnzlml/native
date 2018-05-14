// @flow

import * as React from 'react';
import { QueryRenderer as OriginalQueryRenderer } from '@kiwicom/mobile-relay';
import {
  FullPageLoading,
  GeneralError,
  PartialFailure,
} from '@kiwicom/mobile-shared';
import { Translation } from '@kiwicom/mobile-localization';

import PublicEnvironment from './PublicEnvironment';
import PrivateEnvironment from './PrivateEnvironment';
import type { QueryRendererProps } from '../index';

type Props = {|
  ...QueryRendererProps,
  accessToken?: string,
|};

export default class QueryRenderer extends React.Component<Props> {
  partialError: Object;

  createEnvironment = () => {
    if (!this.props.accessToken) {
      return PublicEnvironment.getEnvironment(this.partialErrorHandler);
    }

    return PrivateEnvironment.getEnvironment(
      this.partialErrorHandler,
      this.props.accessToken || '',
    );
  };

  partialErrorHandler = (partialError: Object) => {
    this.partialError = partialError;
  };

  renderRelayContainer = ({
    error,
    props,
  }: {
    error?: Object,
    props?: Object,
  }) => {
    if (error) {
      if (error.message === 'Network request failed') {
        // See: https://github.com/github/fetch/blob/fcc4e1b48cfb5a2b1625fcd6eac06d954b00ccb6/fetch.js#L438-L444
        return (
          <GeneralError
            errorMessage={
              <Translation id="relay.query_renderer.no_connection" />
            }
          />
        );
      }

      // total failure (data == null, errors != null)
      return (
        <GeneralError
          errorMessage={<Translation passThrough={error.message} />}
        />
      );
    }

    if (props) {
      if (this.partialError) {
        // partial failure (data != null, errors != null)
        // Relay swallows all GraphQL errors if 'data != null' (see: https://github.com/facebook/relay/issues/1913)

        console.log('QueryRenderer partial error:'); // eslint-disable-line no-console
        console.log(JSON.stringify(this.partialError, null, 2)); // eslint-disable-line no-console

        return <PartialFailure>{this.props.render(props)}</PartialFailure>;
      }

      // success (data != null, errors == null)
      return this.props.render(props);
    }

    // no data or errors yet
    return <FullPageLoading />;
  };

  render = () => {
    return (
      <OriginalQueryRenderer
        environment={this.createEnvironment()}
        query={this.props.query}
        variables={this.props.variables}
        render={this.renderRelayContainer}
      />
    );
  };
}
