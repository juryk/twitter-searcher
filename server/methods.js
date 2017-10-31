//import { Meteor } from 'meteor/meteor';

Meteor.methods({

    findTweets(query){
        var T = new Twit({
            consumer_key: Meteor.settings.private.consumer_key,
            consumer_secret: Meteor.settings.private.consumer_secret,
            access_token: Meteor.settings.private.access_token,
            access_token_secret: Meteor.settings.private.access_token_secret
        });

        const getTweets = Meteor.wrapAsync(T.get, T);


    try {
      return getTweets('search/tweets', { q: `${query}`, count: 30 });
    } catch (error) {
      throw new Meteor.Error(error.name, error.message);
    }
}

});
