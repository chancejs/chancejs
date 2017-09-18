---
title: profession
signature: |
    chance.profession()
    chance.profession({rank: true})
---

Return a random profession. Rank is false by default.

{% highlight js %}
chance.profession()
=> 'Software Test Engineer'
{% endhighlight %}

Optionally set rank as true get rank with profession.

{% highlight js %}
chance.profession({rank: true})
=> 'Junior Supply Chain Director'
{% endhighlight %}
