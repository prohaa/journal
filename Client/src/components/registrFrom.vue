<template>
<div>
<div class="modal-body">
      <form method="POST" @submit.prevent="submit">
      <div class="form-group">
        <label for="email">Email</label>
        <input
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
          type="password"
          id="password"
          class="form-control"
          :class="{'is-invalid': $v.password.$error}"
          @blur="$v.password.$touch()"
          v-model="password">
        <div class="invalid-feedback" v-if="!$v.password.minLength">Минимальная длина пароля {{6}} символов. Сейчас длина {{password.length}}</div>
      </div>

      <div class="form-group">
        <label for="confirm">Повторите пароль</label>
        <input
          type="password"
          id="confirm"
          class="form-control"
          :class="{'is-invalid': $v.confirmPassword.$error}"
          @blur="$v.confirmPassword.$touch()"
          v-model="confirmPassword">
        <div class="invalid-feedback" v-if="!$v.confirmPassword.sameAs">Пароли должны совпадать</div>
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
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      submitButton: 'Зарегистрироваться'
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      minLength: minLength(6)
    },
    confirmPassword: {
      sameAs: sameAs('password')
    }
  },
  methods: {
    submit () {
      console.log('ok')
      if (this.password.length > 0) {
        this.$http.post('http://localhost:3000/register', {
          role_name: 'User',
          email: this.email,
          login: '',
          password: this.password,
          perm_name: '',
          first_name: '',
          last_name: '',
          middle_name: ''
        })
          .then(response => {
            console.log('ok')
            console.log(response.body)
          })
          .catch(function (error) {
            console.error(error.response)
          })
          .then(response => {
            // console.log(JSON.stringify(response.body))
            // const is_admin = response.data.user.is_admin
            // localStorage.setItem('user', JSON.stringify(response.data.user))
            // localStorage.setItem('jwt', response.data.token)
            // if (localStorage.getItem('jwt') != null) {
            //   this.$emit('loggedIn')
            //   if (this.$route.params.nextUrl != null) {
            //     this.$router.push(this.$route.params.nextUrl)
            //   } else {
            //     if (is_admin === 1) {
            //       this.$router.push('admin')
            //     } else {
            //       this.$router.push('dashboard')
            //     }
            //   }
            // }
          })
      }
    }
  }
}
</script>

<style>

</style>
