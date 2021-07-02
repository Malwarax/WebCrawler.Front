<template>
    <div class="text-center mt-5 ">
        <h1 class="h2">Test results</h1>

        <b-table :fields="fields"
        :items="tests"
        responsive="sm"
        head-row-variant="dark"
        bordered
        striped
        :per-page="pageSize"
        :current-page="currentPage"
        >

      <template #cell(website)="data">
        {{ data.item.url }}
      </template>

      <template #cell(date)="data">
        {{ data.item.date | moment("DD.MM.YYYY, hh:mm:ss") }}
      </template>

      <template #cell(details)="data" >
        <router-link :to="'/test/' + data.item.id">
            <a>see details</a>
        </router-link>
      </template>

    </b-table>

    <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="pageSize"
        align="center"
        size="lg"
        pills
        >
    </b-pagination>
    </div>

</template>

<script>
import { eventEmitter } from '../../main'
export default {
  data () {
    return {
        tests:[],
        pageSize: 10,
        currentPage: 1,
        fields: [
          'website',
          'date',
          { key: 'details', label: '' },
        ],
    }
  },
      computed: {
      rows() {
        return this.tests.length
      }
      },

    methods:{
      loadTests(){
              this.resource.get().then(response => response.json())
          .then(response => this.tests = response.result)
    }   
},
    created () {
        eventEmitter.$on('websiteCrawled',()=>{
            this.loadTests() 
        })
    this.resource = this.$resource('Tests')
    this.loadTests() 
    }
}
</script>
