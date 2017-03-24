function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){

  var App = {
    "init": function() {
      this._revealTransitions = [
        'none',
        'concave',
        'convex',
        'fade',
        'slide',
      ];

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
    }
  };
  App.init();

});