<template>
  <div>
    <h1>List</h1>
    <div class="row">
      <div class = "input-field col s3">
        <select ref ="filter" v-model="filter" >
          <option value="" disabled selected>Choose status</option>
          <option value="completed">completed</option>
          <option value="active">active</option>
          <option value="expired">expired</option>
        </select>
        <label>Task status</label>
        <button v-if = "filter" class="btn btn-small red accent-2" @click = "filter = null">clear filter</button>
      </div>
     
      
    </div>
    <!-- <hr> -->
    <table class = "Responsive Table" v-if = "allTasks.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Date</th>
          <th>Open</th>
          <!-- <th></th> -->
        </tr>
      </thead>
      <tbody>
          <tr v-for = "(task,index) in filteredTasks" :key = "task.id">
            <td>{{index+1}}</td>
            <td>{{task.title}}</td>
            <td class = "description"><p class = "text">{{task.description}}</p></td>
            <td>{{task.status}}</td>
            <td>{{new Date(task.date).toLocaleDateString()}}</td>
            <td>
              <router-link
               tag = "button"
               class = "btn btn-small"
               :to= "'/task/' + task.id"> Open</router-link>
            </td>
            <!-- <td style ="padding:0"><p class = "delete">&times;</p></td> -->
          </tr>
      </tbody>
    </table> 
    <h3 v-else>You haven't added any task yet</h3>
  </div>
</template>

<script>
export default {
  data(){
    return {
      filter: null
    }
  },
  computed: {
    allTasks(){
      return this.$store.state.tasks
    },
    filteredTasks(){
      return this.allTasks.filter(t => {
        if(!this.filter){
          return true
        }
          return t.status === this.filter
      })
    }
  },
  mounted() {
    M.FormSelect.init(this.$refs.filter)
  }


};
</script>

<style scoped>

  .description {
    max-width: 400px;
  }

  .text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .delete {
    color: #d50000;
    font-size: 20px;
    text-shadow: 0px 0px 0 #000, 0px 0px 1.5px #000;
    border: 1px solid #ccc;
    margin:0
  }
 

  

</style>