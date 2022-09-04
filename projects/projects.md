---
layout: default
title: Projects
nav_order: 2
has_children: true
permalink: /projects
---

# Projects

<h2 {% if site.style == 'dark' %}class="text-white" {% endif %}>My Projects</h2>
<p class="f4 mb-4 {% if site.style == 'dark' %}text-white{% else %}text-gray{% endif %}">
    My most popular repositories on GitHub.
</p>
<div class="d-sm-flex flex-wrap gutter-condensed mb-4">
    {% if site.projects.sort_by == 'stars' %}
    {% assign sort_order = 'stargazers_count', 'last' %}
    {% else %}
    {% assign sort_order = 'pushed_at' %}
    {% endif %}

    {% if site.projects.exclude.archived && site.projects.exclude.forks %}
    {% assign filtered_repos = site.github.public_repositories
        | where: 'archived', false
        | where: 'fork', false
        | sort: sort_order
        | reverse
    %}
    {% elsif site.projects.exclude.archived %}
    {% assign filtered_repos = site.github.public_repositories
        | where: 'archived', false
        | sort: sort_order
        | reverse %}
    {% elsif site.projects.exclude.forks %}
    {% assign filtered_repos = site.github.public_repositories
        | where: 'fork', false
    | sort: sort_order
    | reverse %}
    {% else %}
    {% assign filtered_repos = site.github.public_repositories
        | sort: sort_order
        | reverse %}
    {% endif %}

</div>
