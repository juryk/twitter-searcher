import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route } from 'react-router';
import history from './history';

import './main.html';

import Index from './ui/Index.jsx';
import TweetsWraper from './ui/TweetsWraper.jsx'

function tweetList(state = [], action){
    if(action.type === "ADD_TWEETS"){
        return [
            ...state, action.payload
        ]
    }
    if(action.type === "CLEAR"){
        state = []
    }
    return state;
}

const store = createStore(tweetList, applyMiddleware(thunk));


Meteor.startup(() => {
  render(
      <Provider store={store}>
        <Router history={history}>
            <div>
                <Route exact path='/' component={Index}/>
                <Route path='/search/:query' component={TweetsWraper}/>
            </div>
        </Router>
      </Provider>, document.getElementById('render-target'));
});
