<template>
  <div class="container">
    <nav class="navbar navbar-light bg-light">
      <form class="form-inline">
        <button class="btn btn-outline-success" type="button" :class="[{active: isLogin}, {navHover:!isLogin}]" @click="activeLog">Войти</button>
        <button class="btn btn-outline-success" type="button" :class="[{active: !isLogin}, {navHover:isLogin}]" @click="activeReg">Регистрация</button>
      </form>
    </nav>
    <!-- Registration Modal -->
    <registrForm v-if="!isLogin"></registrForm>

    <!-- Login Modal -->
    <loginForm v-if="isLogin"></loginForm>
</div>
</template>

<script>

// export default {
//   data () {
//     return {
//       title: 'Modal title'
//     }
//   },
//   props: {
//     type: String
//   },
//   components: {
//   },
//   beforeUpdate () {
//     console.log(this.$attrs)
//     if (this.$attrs.type === 'login') {
//       this.title = 'login'
//     } else if (this.$attrs.type === 'registr') {

//     }
//   }
// }
// import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import loginForm from './../components/loginForm'
import registrForm from './../components/registrFrom'

export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      isLogin: true,
      submitButton: 'Войти'
    }
  },
  components: {
    loginForm,
    registrForm
  },
  methods: {
    onSubmit () {
      console.log('Email', this.email)
      console.log('Password', this.password)
    },
    activeLog () {
      if (this.isLogin === false) {
        this.isLogin = true
        this.submitButton = 'Войти'
      }
    },
    activeReg () {
      if (this.isLogin === true) {
        this.isLogin = false
        this.submitButton = 'Зарегистрироваться'
      }
    }
  }
  // ,
  // validations: {
  //   email: {
  //     required,
  //     email
  //   },
  //   password: {
  //     minLength: minLength(6)
  //   },
  //   confirmPassword: {
  //     sameAs: sameAs('password')
  //   }
  // }
}
</script>

<style scope>
  .invalid-feedback {
    display: block;
  }
  .disableHover:hover {
    color: black;
    cursor: auto;
  }
  .navHover:hover {
    cursor: pointer;
  }
  .modal-header {
    border-bottom: 0px;
  }
</style>
