function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 150)
    : cb();
};

ready(function(){

  var App = {
    "init": function() {
      this._twitterService = TwitterService; // Clone TwitterService object
      this._twitterService.init(); // Initialize the TwitterService

      this._revealService = RevealService; // Clone RevealService object
      this._revealService.init(); // Initialize the RevealService

      this._hbsCache = {}; // Handlebars cache for templates
			this._hbsPartialsCache = {}; // Handlebars cache for partials

      this._appInitialized = false; // App initialized
      this._twitterSearchTitle = null;
      this._twitterAPISearchString = null;
      this._isTwitterSearchAutomated = false;
      this._automateTwitterSearchSpeed = 92000;
      this._tweets = [];

      var that = this;
      // Connect to Twitter via TwitterService, then Reveal.js initialisation
      this._twitterService.connect().then(
        function(tws_result) {
          console.log(tws_result);
          that._revealService.initReveal().then(
            function(rjs_result) {
              console.log(rjs_result);
              that._appInitialized = true;
              that.addEventListeners();
            },
            function(rjs_error) {
              console.log(rjs_error);
              that._appInitialized = false;
            }
          );
        },
        function(tws_error) {
          console.log(tws_error);
        }
      );
    },
    "addEventListeners": function() {
      var frmTwitterSearch = document.querySelector('#frmTwitterSearch');
      if(frmTwitterSearch != null && frmTwitterSearch != undefined) {

        var that = this;

        frmTwitterSearch.addEventListener('submit', function(ev) {
          ev.preventDefault();

          that._twitterSearchTitle = Utils.trim(this.querySelector('[name="txtTitle"]').value);
          that._twitterAPISearchString = Utils.trim(this.querySelector('[name="txtHashtag"]').value).replace('#','');
          that.getTweetsBySearch();

          return false;
        });
      }
    },
    "getTweetsBySearch": function() {
      var that = this;

      this._twitterService.getTweetsBySearch(this._twitterAPISearchString).then(
        function(rjs_result) {
          //console.log(rjs_result);
          that.updateUITweets(rjs_result);
        },
        function(rjs_error) {
          console.log(rjs_error);
        }
      );
    },
    "startAutomation": function() {
      if(this._isTwitterSearchAutomated == false) {
        this._isTwitterSearchAutomated = true;
        this.automateTwitterSearch();
      }
    },
    "stopAutomation": function() {
      this._isTwitterSearchAutomated = false;
    },
    "automateTwitterSearch": function() {
      var that = this;
      window.setTimeout(function() {
        if(that._isTwitterSearchAutomated == true) {
          that.getTweetsBySearch();
          that.automateTwitterSearch();
        }
      }, this._automateTwitterSearchSpeed);
    },
    "updateUITweets": function(tweetsFromAPI) {

      var that = this;
      	
      var tweetFromAPI = null, tweets = [], tweet = null;
      for(var i=0;i<tweetsFromAPI.length;i++) {
        tweetFromAPI = tweetsFromAPI[i];
        tweet = {
          "id": tweetFromAPI.id,
          "created_at": tweetFromAPI.created_at,
          "retweet_count": tweetFromAPI.retweet_count,
          "retweeted": tweetFromAPI.retweeted,
          "text" : tweetFromAPI.text,
          "user": {
            "id": tweetFromAPI.user.id,
            "screen_name": tweetFromAPI.user.screen_name,
            "profile_image_url": tweetFromAPI.user.profile_image_url.replace('_normal', ''),
            "utc_offset": tweetFromAPI.user.utc_offset,
            "time_zone": tweetFromAPI.user.time_zone,
            "followers_count": tweetFromAPI.user.followers_count,
            "created_at": tweetFromAPI.user.created_at,
            "description": tweetFromAPI.user.description,
            "statuses_count": tweetFromAPI.user.statuses_count
          }
        }
        // Check if tweet is present in previous tweets list. If not present then add it to the new tweets list
        var originalTweets = this._tweets;
        var originalIndex = _.findIndex(originalTweets, function(originalTweet) { return originalTweet.id == tweet.id; })

        if(originalIndex == -1) {
          tweets.push(tweet);
        }
      }
      // Concat new tweets to the original tweets list
      this._tweets = _.concat(this._tweets, tweets);

      // Handlebars Template engine for each tweet
      if(!this._hbsCache['tweet-template']) {
				var src = document.querySelector('#tweet-template').innerHTML;
				this._hbsCache['tweet-template'] = Handlebars.compile(src);
			}
      var tweetHTML = null;
      for(var i=0;i<tweets.length;i++) {
        tweet = tweets[i];
        tweetHTML = this._hbsCache['tweet-template'](tweet);
        document.querySelector('.tweets-list').innerHTML += tweetHTML;
      }
      
      this._revealService.updateReveal().then(
        function(rjs_result) {
          console.log(rjs_result);
          (document.querySelector('[name="txtTitle"]').value = that._twitterSearchTitle);
          (document.querySelector('[name="txtHashtag"]').value = that._twitterAPISearchString);
          that.addEventListeners();
          that._revealService.startAutomation();
          that.startAutomation();
        },
        function(rjs_error) {
          console.log(rjs_error);
        }
      );
    }
  };
  App.init();

});