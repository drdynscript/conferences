function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){

  var App = {
    "init": function() {
      this.OAUTH_PUBLLIC_KEY = '_B2kGq6jsDyq7w7vnhkIcKfegME'; // OAuth key
      this.TWITTER_API_SEARCH = 'https://api.twitter.com/1.1/search/tweets.json?q='; // Twitter Search API endpoint

      this._revealTransitions = [
        'none',
        'concave',
        'convex',
        'fade',
        'slide',
      ];

      this.initReveal();

      this._twitterAPI = null; // TwitterAPI
      this._twitterAPISearchString = 'angular';

      this._hbsCache = {}; // Handlebars cache for templates
			this._hbsPartialsCache = {}; // Handlebars cache for partials

      //this.connectToTwitterAPI(); // Connect to Twitter API
      var tweets = [
        {
          "id": 807486811786375200,
          "created_at": "Sat Dec 10 07:27:12 +0000 2016",
          "retweet_count": 2,
          "retweeted": false,
          "text" : "RT @AngularJS_News: #HT Angular 1.6 Released, see our blog post here https://t.co/QAw2DmXpB0 via @angularjs #HT https://t.co/oYrzhIxsHd",
          "user": {
            "id": 4277617239,
            "screen_name": "JavascriptBot_",
            "profile_image_url": "http://pbs.twimg.com/profile_images/669615961847255040/wBd7Caaw_normal.jpg",
            "utc_offset": -28800,
            "time_zone": "Pacific Time (US & Canada)",
            "followers_count": 14654,
            "created_at": "Wed Nov 25 19:45:03 +0000 2015",
            "description": "I retweet all about Javascript !!",
            "statuses_count": 78835
          }
          
        }
      ];
      this.updateTwitterSearchUI(tweets);
    },
    "initReveal": function() {
          Reveal.initialize({
          controls: true,
          progress: true,
          history: true,
          center: true,
          transition: this._revealTransitions[2],

          // Optional reveal.js plugins
          dependencies: [
              { src: '../vendor/reveal.js/lib/js/classList.js', condition: function() { return !document.body.classList; } },
              { src: '../vendor/reveal.js/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
              { src: '../vendor/reveal.js/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
              { src: '../vendor/reveal.js/plugin/highlight/highlight.js', async: true, condition: function() { return !!document.querySelector( 'pre code' ); }, callback: function() { hljs.initHighlightingOnLoad(); } },
              { src: '../vendor/reveal.js/plugin/zoom-js/zoom.js', async: true },
              { src: '../vendor/reveal.js/plugin/notes/notes.js', async: true }
          ]
      }); 
    },
    "connectToTwitterAPI": function() {
      var that = this; // Hack

      OAuth.initialize(this.OAUTH_PUBLLIC_KEY); // Initialize OAuth.io
      OAuth.popup('twitter')
        .done(function(result) {
            that._twitterAPI = result;
            that.getTweetsFromAPIBySearch(that._twitterAPISearchString);
        })
        .fail(function (err) {
            //handle error with err
            console.log(err)
        });
    },
    "getTweetsFromAPIBySearch": function(search) {
      if(this._twitterAPI != null && this._twitterAPI != undefined) {
        var that = this; // Hack

        var url = this.TWITTER_API_SEARCH + search;
        this._twitterAPI.get(url)
          .done(function(result) {
            that.updateTwitterSearchUI(result.statuses);
          })
          .fail(function (err) {
              //handle error with err
              console.log(err)
          });
      }
    },
    "updateTwitterSearchUI": function(tweets) {
      var tweetsFiltered = tweets;
      for(var i=0;i<tweetsFiltered.length;i++) {
        var tweet = tweetsFiltered[i];
        console.log(tweet);
        var tweetHTML = '';
        tweetHTML += '<section data-id="' + tweet.id + '" data-background-image="' + tweet.user.profile_image_url.replace('_normal', '') + '">';
        tweetHTML += '<div class="tweet">';
        tweetHTML += '<div class="tweet__left">';
        tweetHTML += '<picture class="tweet__picture"><img src="' + tweet.user.profile_image_url + '">' + '</picture>'
        tweetHTML += '<div class="tweet__meta">';
        tweetHTML += '</div>'
        tweetHTML += '</div>';
        tweetHTML += '<div class="tweet__right">';
        tweetHTML += '<div class="tweet__user">' + tweet.user.screen_name + '</div>';
        tweetHTML += '<div class="tweet__text">' + this.processTweetLinks(tweet.text) + '</div>';
        tweetHTML += '</div>';
        tweetHTML += '</div>';
        tweetHTML += '</section>';
        document.querySelector('.tweets-list').innerHTML += tweetHTML;
      }
      this.initReveal(); 
    },
    "processTweetLinks": function(text) {
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
        text = text.replace(exp, "<a href='$1' target='_blank'>$1</a>");
        exp = /(^|\s)#(\w+)/g;
        text = text.replace(exp, "$1<a href='https://twitter.com/hashtag/$2?src=hash' target='_blank'>#$2</a>");
        exp = /(^|\s)@(\w+)/g;
        text = text.replace(exp, "$1<a href='http://www.twitter.com/$2' target='_blank'>@$2</a>");
        return text;
    }
  };
  App.init();

});