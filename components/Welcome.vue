<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        Hello
        <span v-if="getUser"> {{ getUser.name }}</span>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        <v-btn @click="logout">
          Logout
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
export default {
  name: 'Welcome',
  data () {
    return {
     
    }
  },
  created () {
    this.getAuthenticatedUser()
  },
  computed:{
    ...mapGetters(['getUser']),
  },
  methods: {
    ...mapActions(['getAuthenticatedUser']),
    async logout(){
      await this.$axios.$post('/api/logout')
      this.$router.push('/home')
    }
  }
}
</script>