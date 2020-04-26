<template>
  <div>
    <h1>{{msg}}</h1>
    <h2>Counter: {{counter}} </h2>
    <button @click="counter++">Увеличить</button>
</div>
</template>

<script>
export default {
  name: 'counter',
  data () {
    return {
      counter: 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
