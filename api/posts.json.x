---
redirect_from:
    - "test"
    - "test2"
---
[
    {% for post in site.posts %}
    {
        "title" : {{ post.title | jsonify }},
        "baseline" : {{ post.baseline | jsonify }},
        "date" : "{{ post.date | date: '%b %d, %y' }}",
        "tags" : {{ post.tags | jsonify }},
        "url" : {{ post.url | prepend: site.baseurl | jsonify }}
    } {% unless forloop.last %},{% endunless %}
    {% endfor %}
]
