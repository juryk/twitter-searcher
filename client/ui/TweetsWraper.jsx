import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import FormComponent from './FormComponent.jsx';


class TweetsWraper extends React.Component{

    componentWillReceiveProps(newProps) {
        if(newProps.location.pathname !== this.props.location.pathname){
            location.reload()
        }
    }

    componentWillMount(){

        let query = this.props.match.params.query;

        Meteor.call('findTweets', `${query}`, (error, result)=>{
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
            dispatch({type: "CLEAR", payload: tweetsList[i]});
            for(var i = 0; i < tweetsList.length; i++){
                dispatch({type: "ADD_TWEETS", payload: tweetsList[i]});
            }
        }
    }),
)(TweetsWraper);
