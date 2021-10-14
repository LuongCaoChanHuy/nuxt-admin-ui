<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        <welcome />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Welcome from '~/components/Welcome.vue'
export default {
  name: 'Dashboard',
  components: {
    Welcome
  }
}
</script>