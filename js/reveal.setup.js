(function() {
  var transitions = [
      'none',
      'concave',
      'convex',
      'fade',
      'slide',
      'zoom'
  ];
  var transition = transitions[2];
  Reveal.initialize({
      controls: true,
      progress: true,
      history: true,
      center: true,
      transition: transition,

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
})();