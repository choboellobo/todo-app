<template>
    <div class="secondary-content">
        <button
            :id="uuid"
            class="secondary-content dropdown-trigger btn" :data-target="'dropdown' +  uuid ">
            <i class="material-icons">more_vert</i>
        </button>

        <ul :id="'dropdown' +  uuid " class="dropdown-content">
            <li v-for="(option,index) in options" :key="index">
                <a href="#" @click.prevent="clickElementDropDown(index)">{{option}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
import M from 'materialize-css'
import { v4 as uuidv4 } from 'uuid'; 
export default {
    props:{
        options:{
            type: Array,
            required: true
        }
    },
    data() {
        return {
            uuid: uuidv4()
        }
    },
    methods: {
        clickElementDropDown(index) {
            this.$emit("onClickOption", index); 
        }
    },
    mounted() {

        setTimeout(() => {
            const elems = document.getElementById(this.uuid)
            M.Dropdown.init(elems, {});
        }, 1000)
    }
};
</script>