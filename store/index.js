export const state = () => ({
  user:{},
  products:[],
  categories:[],
  authors:[]
})

export const getters = {
  getUser: state=>{
     return state.user
  },
  getProduct: state=>{
    return state.products
  },
  getCategory: state=>{
    return state.categories
  },
  getAuthor: state=>{
    return state.authors
  }
}

export const mutations = {
  setUser(state,user){
   return state.user = user
  },
  setProduct(state, products){
    return state.products = products
  },
  setCategory(state, categories){
    return state.categories = categories
  },
  setAuthor(state, authors){
    return state.authors = authors
  }
}

export const actions = {
  async login ({commit},form) {
      console.log(form.email)
     try {
       let response = await this.$auth.loginWith('laravelSanctum', {
         data: form
       })
       this.$router.push('/dashboard')
     } catch (err) {
       console.log(err)
     }
  },
  async getAuthenticatedUser ({commit}) {
     console.log('loggedIn : ' + this.$auth.loggedIn)
     try {
      let response = await this.$axios.$get('/api/user')
       commit("setUser",response)
     } catch (err) {
       console.log(err)
     }
  },
  async getApiProduct({commit}){
    try {
      let response = await this.$axios.$get('/api/products')
      // console.log(response.data)
      commit("setProduct",response.data)
    } catch (error) {
      console.log(error)
    }   
  },
  async getApiCategory({commit}){
    try {
      let response = await this.$axios.$get('/api/categories')
      // console.log(response.data)
      commit("setCategory",response.data)
    } catch (error) {
      console.log(error)
    }   
  },
  async getApiAuthor({commit}){
    try {
      let response = await this.$axios.$get('/api/authors')
      // console.log(response.data)
      commit("setAuthor",response.data)
    } catch (error) {
      console.log(error)
    }   
  },
  async save({commit}){
    try {
      let response = await this.$axios.post('/api/products')
    } catch (error) {
      console.log(error)
    }
  }
}