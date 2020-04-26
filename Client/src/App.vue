<template>
<div class="">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <a class="font-scale navbar-brand" href="#">Институт Экономики и Управления</a>

  <div class="font-scale collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="nav nav-pills ml-auto">
      <li class="nav-item active">
        <router-link to="/" as="a" class="nav-link">Главная</router-link>
        <!-- <a  href="#">Главная<span class="sr-only">(current)</span></a> -->
      </li>
      <li class="nav-item">
        <router-link to="/list" as="a" class="nav-link">Расписание</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/login" as='a' class="nav-link" v-if="checkJwt">Войти</router-link>
        <a class="nav-link" href="" v-if="!checkJwt" @click="logout">Выйти</a>
      </li>
    </ul>
  </div>
</nav>
  <div class="container-fluid bg-light">
    <router-view></router-view>
  </div>

  <!-- Modal window -->
  <!-- <modal></modal> -->
  <notifications group="foo" position="bottom right"/>
</div>
</template>

<script>
// import modal from './components/modal'

export default {
  data () {
    return {
      msg: 'kek',
      counter: 0,
      modalTitle: ''
    }
  },
  computed: {
    // геттер вычисляемого значения
    checkJwt: function () {
      // `this` указывает на экземпляр vm
      if (localStorage.getItem('jwt') === null) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    logout: function () {
      localStorage.removeItem('jwt')
      localStorage.removeItem('user')
    }
  }

  // ,
  // components: {
  //   modal
  // }
}
</script>

<style  scope>
  .font-scale {
    font-size: 1.5em
  }
  .navbar {
    justify-content: flex-start;
  }
  .hidden {
    display: none
  }
  .nav-font-size {
    font-size: 1.5rem
  }
  .logo-img {
    height: 100px;
  }
</style>
