---
title: currency_pair
signature: |
    chance.currency_pair()
---

Generate a currency pair. Handy for simulating currency conversions. Guaranteed to return a unique pair (and not the same currency twice).

{% highlight js %}
  chance.currency_pair();
  => [{ code: "ALL", name: "Albania Lek" }, { code: "ZWD", name: "Zimbabwe Dollar" }]
{% endhighlight %}
