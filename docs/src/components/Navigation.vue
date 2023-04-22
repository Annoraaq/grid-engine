<template>
  <nav class="sidenav">
    <input class="side-menu" type="checkbox" id="side-menu"/>
    <label class="hamb" for="side-menu"><span class="hamb-line"></span></label>
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
          page => page.node.fileInfo.directory === group.name
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

.sidenav {
  background: var(--dark-bg);
  margin-top: 1px;
}

.sidenav ul {
  padding-left: 0;
}

.sidenav ul li {
  color: var(--dark-font-bright);
  margin-top: 20px;
}

.sidenav ul ul{
  padding-left: 20px;
}

.sidenav ul ul li {
  margin-top: 0;
  list-style-type: none;
}

.sidenav ul li {
  list-style-type: none;
}

.sidenav ul a {
  display: block;
  width: 100%;
  color: var(--dark-font-dark)
}

.sidenav ul .active {
  color: var(--brand-medium-bright)
}

.sidenav ul a:hover {
  color: var(--dark-font-bright)
}

.beta {
  background: var(--dark-bg-2);
  color: var(--dark-font-medium);
  border-radius: 8px;
  padding: 1px 6px;
  font-size: 12px;
}

.sidenav .hamb{
    cursor: pointer;
    float: right;
    padding-top: 40px;
    padding-left: 20px;
    padding-right: 20px;
    display: none;
}

.sidenav .hamb-line {
    background: #fff;
    display: block;
    height: 2px;
    position: relative;
    width: 24px;
}

.sidenav .hamb-line::before,
.sidenav .hamb-line::after{
    background: #fff;
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    transition: all .2s ease-out;
    width: 100%;
}
.sidenav .hamb-line::before{
    top: 5px;
}
.sidenav .hamb-line::after{
    top: -5px;
}

.sidenav .side-menu {
    display: none;
}

.sidenav .side-menu:checked ~ ul{
    display: block;
}
.sidenav .side-menu:checked ~ ul ul{
    display: block;
}
.sidenav .side-menu:checked ~ .hamb .hamb-line {
    background: transparent;
}
.sidenav .side-menu:checked ~ .hamb .hamb-line::before {
    transform: rotate(-45deg);
    top:0;
}
.sidenav .side-menu:checked ~ .hamb .hamb-line::after {
    transform: rotate(45deg);
    top:0;
}

@media (max-width: 1100px) {
  .sidenav {
    position: fixed;
    top:  var(--header-height);
    bottom:0;
    overflow-y:auto;
    overflow-x:hidden;
    border-right: 1px solid var(--dark-bg-2);
    z-index: 1000;
  }
  .sidenav .hamb {
    display: block;
  }
  .sidenav ul {
    display: none;
    padding-right: var(--padding-medium);
    padding-left: var(--padding-medium);
  }

}
</style>
