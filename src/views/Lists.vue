<template>
  <div>
    <h1>Lists</h1>
    <div class="row">
      <div class="col s12 m6">
        <div class="card">
          <div class="card-content">
            <div class="row">
              <form v-on:submit.prevent="createList" class="col s12">
                <div class="row">
                  <div class="input-field col s12">
                    <input
                      v-model="list_name"
                      id="name_list"
                      type="text"
                      class="validate"
                    />
                    <label for="name_list">Nombre</label>
                    <span v-show="list_name_error_message">
                      Campo incorrecto
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col s12">
                    <button
                      :disabled="!list_name"
                      type="submit"
                      class="waves-effect waves-light btn"
                    >
                      Añadir
                    </button>
                  </div>
                  <Spinner :active="loading" />
                </div>
              </form>
            </div>
            <div class="row">
              <ul class="s12 collection with-header">
                <li class="collection-header"><h4>Listas</h4></li>
                <li
                  v-for="(task, index) in lists"
                  :key="index"
                  class="collection-item"
                >
                  <div>
                    {{ task.name }}
                  <MoreVert :options="['Compartir','Eliminar']" /> 
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios";
import Spinner from "../components/Spinner.vue";
import MoreVert from "../components/MoreVert.vue";


export default {
  mounted() {
    this.getLists();
  },
  data() {
    return {
      list_name: "",
      list_name_error_message: false,
      loading: false,
      lists: [],
      
    };
  },
  components: {
    Spinner,
    MoreVert,
  },
  watch: {
    list_name() {
      this.list_name_error_message = !this.list_name;
    },
  },
  computed: {
    
  },
  methods: {

    getLists() {
      axios
        .get("/api/v1/lists")
        .then(({ data }) => {
          this.lists = data;
        })
        .catch((error) => {
          if (error.response.status == 401)
            alert("no tienes permisos para crear una lista");
        });
    },
    createList() {
      this.loading = true;
      const body = {
        name: this.list_name,
      };
      axios
        .post("/api/v1/lists", body)
        .then(({ data }) => {
          this.lists.unshift(data);
          this.list_name = "";
          setTimeout(() => this.addEventDropdown(), 1000)
        })
        .catch((error) => {
          if (error.response.status == 401)
            alert("no tienes permisos para crear una lista");
          if (error.response.status == 400)
            alert("el nombre de la lista es vacío");
        })
        .finally(() => (this.loading = false));
    },

    deleteList() {},
    shareList() {},
  },
};
</script>