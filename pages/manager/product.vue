<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Product CRUD</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.title"
                      label="Title"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <!-- <v-text-field
                      v-model="editedItem.author"
                      label="Author"
                    ></v-text-field> -->
                    <v-data-table
                      :headers="authorHeaders"
                      :items="authors"
                      item-key="name"
                      :hide-default-header="true"
                      :hide-default-footer="true"
                      class="elevation-1"
                      :search="search"
                      
                    >
                      <template v-slot:top>
                        <v-text-field
                          v-model="search"
                          label="Search (UPPER CASE ONLY)"
                          class="mx-4"
                        ></v-text-field>
                      </template>
                      <template v-slot:[`body.append`]>
                        <tr @click="getSearchAuthor">
                          
                        </tr>
                      </template>
                    </v-data-table>                  
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-select
                      v-model="category"
                      :items="categories"
                      item-text="name"
                      label="Category"
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.price"
                      label="Price"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.store"
                      label="Store"
                    ></v-text-field>
                    <v-file-input 
                      @change="Preview_image"
                      v-model="editedItem.image"
                      >
                    </v-file-input>
                    <v-img :src="url" style="width: 124px; height: 200px"></v-img>  
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.image`]="{ item }">
      <img :src="'http://127.0.0.1:8000/images/' + item.image" style="width: 93px; height: 150px" />
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
  import { mapActions,mapGetters } from 'vuex'
  export default {
    data: () => ({
      url: null,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Image', value: 'image' },
        { text: 'Title', value: 'title' },
        { text: 'Author', value: 'author.name' },
        { text: 'Category', value: 'category.name' },
        { text: 'Price', value: 'price' },
        { text: 'Store', value: 'store' },
        { text: 'Create at', value: 'created_at' },
        { text: 'Update at', value: 'updated_at' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      categories:[],
      category:{},
      authors:[],
      author:{},
      search: '',
      editedIndex: -1,
      editedItem: {
        image: null,
        title: '',
        author: '',
        category: '',
        price: 1,
        store: 1,
      },
      defaultItem: {
        id: 0,
        image: null,
        title: '',
        author: '',
        category: '',
        price: 0,
        store: 0,
        created_at: '',
        updated_at: ''
      },
    }),

    computed: {
      ...mapGetters(['getProduct','getCategory','getAuthor']),
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      authorHeaders () {
        return [
          {
            align: 'start',
            sortable: false,
            value: 'name',
          },
        ]
      },

    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.getApiProduct()
      this.getApiCategory()
      this.getApiAuthor()
      this.initialize()
    },

    methods: {
      ...mapActions(['getApiProduct','getApiCategory','getApiAuthor']),
      initialize () {
        this.desserts = this.getProduct
        this.categories = this.getCategory
        this.authors = this.getAuthor
        // console.log(this.authors)
      },

      getSearchAuthor() {
        
      },

      filterOnlyCapsText (value, search, item) {
        console.log(value)
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
      },

      Preview_image() {
        this.url= URL.createObjectURL(this.editedItem.image)
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          // Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          // this.desserts.push(this.editedItem)
          // let formData = new FormData();
          // formData.append('title',this.product.title);
          // formData.append('author_id',this.author.id);
          // formData.append('author_name',this.inputAuthor);
          // formData.append('category_id',option.value);
          // formData.append('price',this.product.price);
          // formData.append('store',this.product.store);
          // console.log(this.FormData)
        }
        this.close()
      },
    },
  }
</script>

<style>

</style>