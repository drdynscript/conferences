/*
* TwitterService: Twitter API Wrapper
* via resource URI
*/
var TwitterService = {
	"init": function() {
    this.OAUTH_PUBLIC_KEY = '_B2kGq6jsDyq7w7vnhkIcKfegME'; // OAuth key
    this.TWITTER_API_SEARCH = 'https://api.twitter.com/1.1/search/tweets.json?q='; // Twitter Search API endpoint
    this._twitterAPI = null; // Twitter API object after connection
    this._twitterAPIConnected = false; // Twitter API connected or not
	},
	"connect": function() {
    var that = this;

    return new Promise(function(resolve, reject) {
      OAuth.initialize(that.OAUTH_PUBLIC_KEY); // Initialize OAuth.io
      OAuth.popup('twitter')
        .done(function(result) {
          that._twitterAPI = result;
          that._twitterAPIConnected = true;
          resolve(result);
        })
        .fail(function (error) {
          that._twitterAPIConnected = false;
          reject(error);
        });
    });
  },
  "getTweetsBySearch": function(search) {
    var that = this;

    return new Promise(function(resolve, reject) {
      if(that._twitterAPI != null && that._twitterAPI != undefined && that._twitterAPIConnected == true) {
        var url = that.TWITTER_API_SEARCH + search;
        that._twitterAPI.get(url)
          .done(function(result) {
            resolve(result.statuses);
          })
          .fail(function (error) {
            reject(error);
          });
      } else {
        reject('Can\'t perform a Twitter search becaus the Twitter API is not connected!');
      }
    });
  }
};

/*
* RevealService: Reveal.js Wrapper
* via resource URI
*/
var RevealService = {
	"init": function() {
    // Reveal Transitions
    this._revealTransitions = [
      'none',
      'concave',
      'convex',
      'fade',
      'slide',
    ];
    this._slideSpeed = 16000;
    this._isAutomated = false;

    this.initReveal();
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
          { src: window.baseurl + '/vendor/reveal.js/lib/js/classList.js', condition: function() { return !document.body.classList; } },
          { src: window.baseurl + '/vendor/reveal.js/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
          { src: window.baseurl + '/vendor/reveal.js/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
          { src: window.baseurl + '/vendor/reveal.js/plugin/highlight/highlight.js', async: true, condition: function() { return !!document.querySelector( 'pre code' ); }, callback: function() { hljs.initHighlightingOnLoad(); } },
          { src: window.baseurl + '/vendor/reveal.js/plugin/zoom-js/zoom.js', async: true },
          { src: window.baseurl + '/vendor/reveal.js/plugin/notes/notes.js', async: true }
      ]
    }); 

    return new Promise(function(resolve, reject) {
      window.setTimeout(function() {
        resolve('Reveal.js initialized!');
      }, 1500);
    });

  },
  "updateReveal": function() {
    Reveal.initialize();
    return new Promise(function(resolve, reject) {
      window.setTimeout(function() {
        Reveal.sync();
        window.setTimeout(function() {
          resolve('Reveal.js updated!');
        }, 500);
      }, 1000);
    });
  },
  "startAutomation": function() {
    if(this._isAutomated == false) {
      this._isAutomated = true;
      this.automateSlide();
    }
  },
  "stopAutomation": function() {
    _isAutomated = false;
  },
  "nextSlide": function() {
		if(!Reveal.isLastSlide() && Reveal.nextFragment() === false ) {
			if( Reveal.availableRoutes().down ) {
				Reveal.navigateDown();
			}
			else {
				Reveal.navigateRight();
			}
		} else {
      this.updateReveal();
    }
  },
  "automateSlide": function() {
    var that = this;
    window.setTimeout(function() {
      if(that._isAutomated == true) {
        that.nextSlide();
        that.automateSlide();
      }
    }, this._slideSpeed);
  }
};