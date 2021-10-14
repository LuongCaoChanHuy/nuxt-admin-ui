<template>
  <register />
</template>
<script>
import Register from '~/components/auths/Register.vue'
export default {
  layout:'auth',
  auth: false,
  components: {
    Register
  },

}
</script>