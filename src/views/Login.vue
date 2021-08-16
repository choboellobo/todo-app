<template>
  <div class="row">
    <div class="col s12 m6">
      <div class="card">
        <div class="card-content">
          <div class="row">
            <form class="col s12" @submit.prevent="login">
              <div class="row">
                <div class="input-field col s12">
                  <input
                    v-model="email"
                    id="email"
                    type="email"
                    class="validate"
                  />
                  <label for="email">Email</label>
                  <span v-show="email_error">El email es incorrecto</span>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input
                    v-model="password"
                    id="password"
                    type="password"
                    class="validate"
                  />
                  <label for="password">Password</label>
                  <span v-show="password_length_error"
                    >La contraseña tiene que tener más de 6 caracteres</span
                  >
                </div>
              </div>
              <div class="row">
                <button
                  :disabled="formInvalid"
                  class="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                >
                  Acceder
                </button>
              </div>
              <div class="preloader-wrapper" :class="{'active': loading}">
                <div class="spinner-layer spinner-green-only">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div>
                  <div class="gap-patch">
                    <div class="circle"></div>
                  </div>
                  <div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
    data(){
        return{
            email: "",
            password: "",
            password_length_error: false,
            email_error: false,
            loading: false
        }
    },
    computed:{
        formInvalid(){ 
            return (this.password_length_error || this.email_error) || (!this.email || !this.password)
        }
    },
    watch:{
        password(){
           this.password_length_error =  this.password.length < 7
        },
        email(){
            const reg  = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            this.email_error = !reg.test(this.email) 

        }
    },
    methods: {

        login() {
            this.loading = true;

            const body = {
                email: this.email,
                password: this.password
            }
            axios.post("https://list-shared-todos.herokuapp.com/auth/login", body)
            .then( ({data}) =>{
                const { access_token, refresh_token } = data;
                localStorage.setItem("access_token", access_token)
                localStorage.setItem("refresh_token", refresh_token)
            } )
            .catch(error => {
                if(error.response.status == 401) alert("Email o contraseña erroneos")
            })
            .finally(() => this.loading = false)
            // Se va a logear con un email y contraseña
            // Validar un email correcto y una contraseña de mas de 6 caracteres;


            // Guardar en la memoria del navegador el access_token y el refresh_token
            // Si hay algun error mostrarlo en pantalla.
        }
    }
}
</script>

<style lang="scss">
    
</style>

