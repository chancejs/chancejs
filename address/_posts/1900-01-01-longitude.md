---
title: longitude
signature: |
    chance.longitude()
    chance.longitude({fixed: 7})
---

Generate a random longitude.

{% highlight js %}
chance.longitude();
=> 149.41549
{% endhighlight %}

_range: -180 to 180_

By default includes 5 fixed digits after decimal, can specify otherwise.

{% highlight js %}
chance.longitude({fixed: 7});
=> 51.4549925
{% endhighlight %}

By default includes entire range of allowed longitudes, can specify a min and/or max to bound it

{% highlight js %}
chance.longitude({min: -77}, {max: -78});
=> -77.22644
{% endhighlight %}
