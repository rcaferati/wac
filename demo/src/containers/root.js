import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter,
  StaticRouter,
  Route,
} from 'react-router-dom';
import Navigation from '../components/navigation';
import Home from './home/home';
import About from './about/about';
import MemberList from './members/members';
import Member from './member/member';
import './root.scss';

const Root = ({ server, location }) => {
  const Router = server === true ? StaticRouter : BrowserRouter;
  return (
    <Router
      location={location}
    >
      <main>
        <Route path="*" component={Navigation} />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/members" component={MemberList} />
        <Route exact path="/member/:username" component={Member} />
      </main>
    </Router>
  );
};

Root.propTypes = {
  server: PropTypes.bool,
  location: PropTypes.string,
};

Root.defaultProps = {
  server: false,
  location: '',
};

export default Root;
