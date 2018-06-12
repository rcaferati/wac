import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Page from '../../components/page';
import Rule from '../../components/rule';
import RuleNavigation from '../../components/rule-navigation';
import ExampleA from '../../features/example-a';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Page>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Home page description" />
        </Helmet>
        {/* <RuleNavigation /> */}
        {/* <Rule /> */}
        <ExampleA />
      </Page>
    );
  }
}

export default connect()(Home);
