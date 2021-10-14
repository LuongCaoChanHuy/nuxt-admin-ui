<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        <v-form ref="form">
          <v-text-field
            v-model="form.name"
            :counter="10"
            label="Name"
            color="green"
            required
          >
            <v-icon slot="prepend" color="grey">
              
            </v-icon>
          </v-text-field>

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

          <v-text-field
            v-model="form.password_confirmation"
            label="Confirm password"
            type="password"
            color="green"
            required
          >
            <v-icon slot="prepend" color="grey">
              
            </v-icon>
          </v-text-field>

          <v-btn color="blue-grey" class="ml-0" @click="login">
            Register
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      errors: {}
    }
  },

  methods: {
    login () {
      this.$axios
        .$post('/api/register', this.form)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>