<template>
  <div>
    <lesson></lesson>
    <lesson></lesson>
    <lesson></lesson>
    <lesson></lesson>
    <lesson></lesson>
    <lesson></lesson>
    <lesson></lesson>
    <lesson></lesson>
  </div>
</template>

<script>
import lesson from './lesson'
export default {
  data () {
    return {

    }
  },
  components: {
    lesson
  }

}
</script>

<style scoped>
  div {
    display: flex;
    flex-direction: column;
  }
</style>
