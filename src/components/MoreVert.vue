<template>
    <div class="secondary-content">
        <button
            ref="trigger"
            class="secondary-content dropdown-trigger btn" :data-target="'dropdown' +  timestamp ">
            <i class="material-icons">more_vert</i>
        </button>

        <ul :id="'dropdown' +  timestamp " class="dropdown-content">
            <li v-for="(option,index) in options" :key="index"><a href="">{{option}}</a></li>
        </ul>
    </div>
</template>

<script>
import M from 'materialize-css'
export default {
    props:{
        options:{
            type: Array,
            required: true
        }
    },
    data() {
        return {
            timestamp: null
        }
    },
    mounted() {
        this.timestamp = Date.now()

        const elems = this.$refs.trigger;
        M.Dropdown.init(elems, {});
    }
};
</script>