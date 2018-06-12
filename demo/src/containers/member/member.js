import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import styles from './member.scss';
import Page from '../../components/page';

class Member extends React.Component {
  state = {};
  render() {
    const username = this.props.match.params.username;
    return (
      <Page>
        <Helmet>
          <title>Member Page</title>
          <meta name="description" content="About page description" />
        </Helmet>
        <h1>THIS IS THE MEMBER @{username}.</h1>
      </Page>
    );
  }
}

export default withRouter(connect()(Member));
