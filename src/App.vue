<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>

export default {
    name: 'App',

}
</script>

<style >
#app {
    width: 100vw;
    height: 100vh;
    position: fixed;
    background: url("./assets/img/ice.jpg") no-repeat;
    background-size: 126% 146%;
    background-position: 42% 50%;
}
body {
    margin: 0;
    padding: 0;
    background: rgba(15, 15, 15, 0.35);
}
</style>
