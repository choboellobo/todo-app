<template>
  <div>
    <div class="preloader-wrapper" :class="{'active': active }">
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
  </div>
</template>

<script>
export default {
  name: "Spinner",
  props:{
      active: {
          type: Boolean,
          default: false
      }
  }
};
</script>