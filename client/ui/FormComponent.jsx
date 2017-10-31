import React from 'react';
import { connect } from 'react-redux';
import history from '/client/history'


class FormComponent extends React.Component{

    handleForm(event){
        event.preventDefault();
        let searchWord = event.target.searchWord.value.replace(/ /g, '+');
        history.push({
            pathname: `/search/q=${searchWord}`,
        })
    }

    render(){
        return(
            <form className="text-center" onSubmit={this.handleForm.bind(this)}>
            <br/>
                <input
                    type="text"
                    name = "searchWord"
                    placeholder="Find some tweets" />
                    <br/>
                    <br/>
                <button type="submit" className="btn btn-primary btn-lg btn-block">Search</button>
                <br/>
            </form>
        )
    }
}

export default connect(
    state => ({
        tweets: state
    }),
    dispatch => ({
    }),
)(FormComponent);
