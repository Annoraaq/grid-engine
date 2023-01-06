<template>
  <nav>
    <ul>
      <li v-for="group in groups">
        {{group.title}}
        <ul>
          <li v-for="page in group.pages">
            <g-link :to="page.path">
              {{ page.title }}
              <span class="beta" v-if="page.beta">Beta</span>
            </g-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<static-query>
query {
  pages: allMarkdownPage {
    edges {
      node {
        id
        title
        path
        beta
        fileInfo {
          directory
          name
        }
      }
    }
  }
  examples: allExample {
    edges {
      node {
        id
        title
        path
        fileInfo {
          name
        }
      }
    }
  }
}
</static-query>

<script>

export default {
  computed: {
    groups() {
      function nameToOrder(name) {
        return Number(name.split('-')[0]) || 0;
      }

      const groups= [
        {
          name: 'getting-started',
          title: 'Getting Started',
        },
        {
          name: 'usage',
          title: 'Usage',
        },
        {
          name: 'examples',
          title: 'Examples',
        },
        {
          name: 'migrations',
          title: 'Migrations',
        },
        {
          name: 'troubleshooting',
          title: 'Troubleshooting',
        }
      ];

      const groupings = groups.map(group => {
        const pages = this.$static.pages.edges.filter(
          page => page.node.fileInfo.directory.split('/')[2] === group.name
        ).map(page => page.node);
        pages.sort((p1, p2) => nameToOrder(p1.fileInfo.name) - nameToOrder(p2.fileInfo.name));
        return {
          ...group,
          pages
        }
      });

      const examples = groupings.find(g => g.name === 'examples');
      examples.pages = this.$static.examples.edges.map(ex => ex.node);
      examples.pages.sort((a, b) => nameToOrder(a.fileInfo.name) - nameToOrder(b.fileInfo.name))

      return groupings;
    }
  }
}
</script>

<style>

nav ul {
  padding-left: 0;
}

nav ul li {
  color: var(--dark-font-bright);
  margin-top: 20px;
}

nav ul ul{
  padding-left: 20px;
}

nav ul ul li {
  margin-top: 0;
  list-style-type: none;
}

nav ul li {
  list-style-type: none;
}

nav ul a {
  display: block;
  width: 100%;
  color: var(--dark-font-dark)
}

nav ul .active {
  color: var(--brand-medium-bright)
}

nav ul a:hover {
  color: var(--dark-font-bright)
}

.beta {
  background: var(--dark-bg-2);
  color: var(--dark-font-medium);
  border-radius: 8px;
  padding: 1px 6px;
  font-size: 12px;
}
</style>
