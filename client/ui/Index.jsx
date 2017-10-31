import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import FormComponent from './FormComponent.jsx';

class Index extends React.Component{

    componentDidMount(){

        Meteor.call('findTweets', `q=#javascript`, (error, result)=>{
            if(error){
                console.log(error);
            } else {
                this.props.onAddTweets(result.statuses);
            }
        });
    }


    render(){

        return(
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <FormComponent/>
                        <h2>#javascript</h2>
                        {this.props.tweets.map((tweet, index) =>
                            <div key={index} className="panel panel-default">
                                <div className="panel-heading"><strong >{tweet.user.name}</strong> {moment(tweet.created_at).fromNow()}</div>
                                <div className="panel-body">
                                    {tweet.text}
                                </div>
                            </div>
                        )}
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        tweets: state
    }),
    dispatch => ({
        onAddTweets: (tweetsList) => {
            dispatch({type: "CLEAR"});
            for(var i = 0; i < tweetsList.length; i++){
                dispatch({type: "ADD_TWEETS", payload: tweetsList[i]});
            }
        }
    }),
)(Index);
