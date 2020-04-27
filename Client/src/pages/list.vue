<template>
  <div>
    <div class="filter d-flex">
      Фильтр по курсу
      <button v-on:click="dataRequest">Стянуть данные</button>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Выбор группы
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </div>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Выбор Курса
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </div>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Кнопка выпадающего списка
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </div>
    </div>
    <h1>List</h1>
    {{body}}
    <week :resp="{1:'понедельник', 2:'вторник'}"></week>
  </div>
</template>

<script>
// import day from './../components/day'
import week from './../components/week'
export default {
  data () {
    return {
      body: ''
    }
  },
  components: {
    // day,
    week
  },
  methods: {
    dataRequest: function () {
      this.$http.get('http://localhost:3000/list')
        .then(response => {
          console.log(response.body)
          this.body = response.body
        })
        .catch(function (error) {
          if (error.status === 401) {
            this.$notify({
              group: 'foo',
              title: 'Ошибка с данными',
              duration: 5000,
              type: 'warn'
            })
            console.log(error.body)
            console.error(error.response)
          }
        })
    }
  }
}
</script>

<style scoped>
  .filter {
    border: 1px solid red;
  }
</style>
