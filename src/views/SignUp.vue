<template>
  <div>
    <div class="row">
      <div class="col s12 m6">
        <div class="card">
          <div class="card-content">
            <div class="row">
              <form @submit.prevent="registerUsers">
                <div class="input-field col s12">
                  <input
                    v-model="name"
                    id="first_name"
                    type="text"
                    class="validate"
                  />
                  <label for="first_name">First Name</label>
                </div>

                <div class="input-field col s12">
                  <input
                    v-model="email"
                    id="email"
                    type="email"
                    class="validate"
                  />
                  <label for="email">Email</label>
                  <span v-if="email_error && email_touch"
                    >Se require un email válido</span
                  >
                </div>

                <div class="input-field col s12">
                  <input
                    v-model="password"
                    id="password"
                    type="password"
                    class="validate"
                  />
                  <label for="password">Password</label>
                  <span v-show="password_error && password_touch">
                    La contraseña tiene que tener más de 6 caracteres
                  </span>
                </div>

                <div v-show="password" class="input-field col s12">
                  <input
                    id="passwordConfirmation"
                    type="password"
                    class="validate"
                    v-model="password2"
                  />
                  <label for="passwordConfirmation">Confirmar Password</label>
                  <span v-if="password2_error && password2_touch"
                    >Las contraseñas no coinciden</span
                  >
                </div>

                <div class="col s12">
                  <button
                    type="submit"
                    :disabled="
                      !name || email_error || password_error || password2_error
                    "
                    class="waves-effect waves-light btn"
                  >
                    button
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios"
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password2: "",
      email_touch: false,
      password_touch: false,
      password2_touch: false,
    };
  },
  watch: {
    email() {
      this.email_touch = true;
    },
    password() {
      this.password_touch = true;
    },
    password2() {
      this.password2_touch = true;
    },
  },
  computed: {
    email_error() {
      const reg = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      return !reg.test(this.email);
    },
    password_error() {
      return this.password.length < 6;
    },
    password2_error() {
      return this.password != this.password2;
    },
  },
  methods: {
    registerUsers() {
        const body ={
            name: this.name,
            email: this.email,
            password: this.password
        }
        console.log(body);
        axios.post("/auth/signup", body)
        .then(()=>{
            alert("Te has registrado correctamente")
        })
        .catch(error=>{
            if (error.response.status == 400) alert("algún campo no es correcto")
            console.error(error)
        })
    },
  },
};
</script>