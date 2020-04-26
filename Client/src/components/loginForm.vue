<template>
<div>
<div class="modal-body">
      <form method="POST" @submit.prevent="submit">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          name="email"
          type="email"
          id="email"
          class="form-control"
          :class="{'is-invalid': $v.email.$error}"
          @blur="$v.email.$touch()"
          v-model="email">
        <div class="invalid-feedback" v-if="!$v.email.required">Требуется ввести Email</div>
        <div class="invalid-feedback" v-if="!$v.email.email">Введите правильный Email</div>
      </div>

      <div class="form-group">
        <label for="password">Пароль</label>
        <input
          name="password"
          type="password"
          id="password"
          class="form-control"
          :class="{'is-invalid': $v.password.$error}"
          @blur="$v.password.$touch()"
          v-model="password">
        <div class="invalid-feedback" v-if="!$v.password.minLength">Минимальная длина пароля {{6}} символов. Сейчас длина {{password.length}}</div>
        <div class="container">{{$v}}</div>
      </div>

    <div class="modal-footer">
    <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
    <button
        class="btn btn-success mx-auto"
        type="submit"
        :disabled="$v.$invalid"
        >{{submitButton}}</button>
    <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
    </div>
  </form>
</div>
</div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import router from '../routes'

export default {
  data () {
    return {
      email: '',
      password: '',
      submitButton: 'Войти'
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      minLength: minLength(6)
    }
  },
  methods: {
    submit () {
      if (this.password.length > 0) {
        this.$http.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password
        })
          .then(response => {
            if (response.auth) {
              console.log('ok')
            } else {
              console.log('false')
            }
            console.log(response.body)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('jwt', response.data.token)
            router.push({ path: '/' })
            location.reload()
          })
          .catch(function (error) {
            if (error.status === 401) {
              this.$notify({
                group: 'foo',
                title: 'Ошибка авторизации',
                text: 'Пароль неверный',
                duration: 5000,
                type: 'warn'
              })
              console.log(error.body)
              console.error(error.response)
            } else if (error.status === 500) {
              this.$notify({
                group: 'foo',
                title: 'Ошибка авторизации',
                text: 'Такого пользователя нет',
                duration: 5000,
                type: 'error'
              })
            } else {
              this.$notify({
                group: 'foo',
                title: 'Что-то не так',
                text: 'Уведомление',
                duration: 5000,
                type: 'error'
              })
            }
          })
      }
    }
  }
}
</script>

<style>

</style>
