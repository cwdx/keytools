<template>
  <div id="nav">
    <router-link to="/">Mnemonic</router-link> |
    <router-link to="/privatekey">Private Key</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 700px;
  margin: auto;
  font-size: 18px;
}

input,
button {
  width: 100%;
  margin: 0.5rem 0;
  font-size: inherit;
}

pre {
  font-size: inherit;
  overflow: auto;
  max-width: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
