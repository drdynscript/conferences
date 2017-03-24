---
layout      : twitterwall
title       : Twitterwall for conferences
permalink   : /twitterwall/
---

<section class="tweets-list">
    <section data-slide-type="start" class="twitter-form">
        <div class="twitter-form__header">
            <h1>GDM Twitterwall</h1>
        </div>
        <div class="twitter-form__body">
            <form id="frmTwitterSearch" onsubmit="return false;">
                <fieldset>
                    <legend>Twitter Search</legend>
                    <div class="frm__control">
                        <label for="txtTitle">Title</label>
                        <input class="txt" type="text" placeholder="Title" id="txtTitle" name="txtTitle" />
                    </div>
                    <div class="frm__control">
                        <label for="txtHashtag">Hashtag</label>
                        <input class="txt" type="text" placeholder="Hashtag" id="txtHashtag" name="txtHashtag" />
                    </div>
                    <button class="btn">Search</button>
                </fieldset>
            </form>
        </div>
        <div class="twitter-form__footer">
            Designed and developed by <a href="http://www.twitter.com/drdynscript" title="Philippe De Pauw - Waterschoot aka drdynscript">Philippe De Pauw - Waterschoot</a>
        </div>
    </section>
</section>
<!-- Handlebars Templates -->
{% raw %}
<script id="tweet-template" type="text/x-handlebars-template">
    <section data-slide-type="tweet" data-id="{{this.id}}" data-background-image="{{this.user.profile_image_url}}">
        <div class="tweet">
            <div class="tweet__left">
                <picture class="tweet__picture"><img src="{{this.user.profile_image_url}}"></picture>
                <div class="tweet__meta">
                <div class="tweet__meta__retweet"><i class="fa fa-retweet" aria-hidden="true">{{this.retweet_count}}</i></div>
                <div class="tweet__meta__loves"><i class="fa fa-heart" aria-hidden="true"></i></div>
                </div>
            </div>
            <div class="tweet__right">
                <div class="tweet__user">{{this.user.screen_name}}</div>
                <div class="tweet__text">{{{processTweetLinks this.text }}}</div>
            </div>
        </div>
    </section>
</script>
{% endraw %}