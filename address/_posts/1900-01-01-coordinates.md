---
title: coordinates
signature: |
    chance.coordinates()
    chance.coordinates({fixed: 2})
---

Generate random coordinates, which are latitude and longitude, comma separated.

{% highlight js %}
chance.coordinates();
=> "-29.52974, 24.52815"
{% endhighlight %}

By default includes 5 fixed digits after decimal, can specify otherwise.

{% highlight js %}
chance.coordinates({fixed: 2});
=> "-49.16, 68.81"
{% endhighlight %}

