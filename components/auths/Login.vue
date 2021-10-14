<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        <v-form ref="form">
          <v-text-field
            v-model="form.email"
            :counter="10"
            label="Email"
            color="green"
            required
          >
            <v-icon slot="prepend" color="grey">
              
            </v-icon>
          </v-text-field>

          <v-text-field
            v-model="form.password"
            label="Password"
            type="password"
            color="green"
            required
          >
            <v-icon slot="prepend" color="grey">
              
            </v-icon>
          </v-text-field>
          <v-flex justify-center>
          <v-btn color="blue-grey" class="ml-0" @click="submit">
            Login
          </v-btn>
          </v-flex>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions(['login']),
    async submit(){
      this.login(this.form)
    }
  }
}
</script>