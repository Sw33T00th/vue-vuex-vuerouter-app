<template>
  <div>
    <h1>List</h1>
    <div class="row">
      <div class = "input-field col s3">
        <select ref ="filter" v-model="filter" >
          <option value="null" disabled >Choose status</option>
          <option value="completed">completed</option>
          <option value="active">active</option>
          <option value="expired">expired</option>
        </select>
        <label>Task status</label>
        <button v-if = "filter" class="btn btn-small red accent-2" @click = "filter = null">clear filter</button>
      </div>
     
      
    </div>
    <!-- <hr> -->
    <table class = "Responsive Table centered" v-if = "allTasks.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th class = "status">Status</th>
          <th>Date</th>
          <th>Open</th>
          <!-- <th></th> -->
        </tr>
      </thead>
      <tbody>
          <tr v-for = "(task,index) in filteredTasks" :key = "task.id">
            <td>{{index+1}}</td>
            <td class = "title">{{task.title}}</td>
            <td class = "description">
              <p
              ref ="description"
              class = "text modal-trigger"
              href="#modal_description"
              @click ="log"
              >{{task.description}}
              </p>
            </td>
            <!-- <td class = "status">{{task.status}}</td> -->
            <td class = "status"><div class="status-icon" :class = "task.status"></div></td>
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
    <!-- Modal Window Template -->
    <div id="modal_description" ref = "modal" class="modal">
      <div class="modal-content">
        <p class = "modal-text">{{description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      is: false,
      description: null,
      filter: null,
     
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
  methods: {
    log(event){
      this.description = event.target.innerText
    }
  },
  mounted() {
    M.FormSelect.init(this.$refs.filter);
    M.Modal.init(this.$refs.modal)
  },


};
</script>

<style scoped>

  .status-icon {
    display: inline-block;
    border: 1px solid #666;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #fff;
  }

  .active {
    background-color:#ffea00
  }
  .expired {
    background-color: #ff5252;

  }
  .completed {
    background-color: #00e676 ;
    
  }

  .description {
    max-width: 300px;
  }

  .text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
  }

  .modal-text {
    word-wrap: normal;
    white-space: normal;
  }

  .delete {
    color: #d50000;
    font-size: 20px;
    text-shadow: 0px 0px 0 #000, 0px 0px 1.5px #000;
    border: 1px solid #ccc;
    margin:0
  }

  @media screen and (max-width: 768px) {
  .description {
    max-width: 200px;
  }

}

@media screen and (max-width: 560px) {
  .description {
    max-width: 100px;
  }

}

@media screen and (max-width: 560px) {
  .description {
    max-width: 100px;
  }

  .btn, td, th {
    font-size: 10px;
  }
  
}

@media screen and (max-width: 400px) {
  .description {
    max-width: 80px;
  }

  .title {
    max-width: 50px;
  }

  .btn, td, th {
    font-size: 9px;
  }

  .status {
    display: none;
  }
  
}
 

  

</style>