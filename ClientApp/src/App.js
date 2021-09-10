import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Map from './components/Map';
import { BrowserRouter, Switch, Route,  } from 'react-router-dom';
import { asyncAddLocationData } from './actions/locationsDataActions';
import { connect } from 'react-redux';
import Details from './components/Details';
import Error from './components/Error';
import Loading from './components/Loading';


class App extends Component {
  static displayName = App.name;

  state = {
    loading: true,
    error: undefined
  }
  

  renderHome = () => (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Map} exact={true}/>
            <Route path="/details/:ISO2" component={Details}/>
            <Route />
          </Switch>
        </BrowserRouter>
      </div>
  );

  renderNext = () => (
    <>
      <Header />
      {this.state.error ? <Error errorCode={this.state.error} /> : this.renderHome()}
      <Footer />
    </>
  );

  componentDidMount = () => {
    this.props.fetchYesterdayData()
      .catch(e => {
        if(e.response)
          this.setState(() => ({error: e.response.status}));
        else
          this.setState(() => ({error: 408}));
      })
      .finally(() => this.setState(() => ({loading: false})));
  }
  

  render =  () => {
    return (
      <>
        {this.state.loading ? <Loading /> : this.renderNext() }
      </>
    );
  }
}

const mapDispatchToProp = (dispatch) => ({
  fetchYesterdayData: () => dispatch(asyncAddLocationData())
});

export default connect(undefined, mapDispatchToProp)(App);
