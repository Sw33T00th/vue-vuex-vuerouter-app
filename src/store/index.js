import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task => {
      if(new Date(task.date) < new Date()){
        task.status = 'expired';
      }
      return task;
    })
  },
  mutations: {
    createTask(state,task){
      state.tasks.push(task)
      localStorage.setItem('tasks',JSON.stringify(state.tasks));
    },
    updateTask(state, {id,description,date} ) {
      const tasks = state.tasks.slice();
      const index = tasks.findIndex(t => t.id === id);
      const task = tasks[index];
      const status = new Date() > new Date(date) ? "expired" : "active";
      tasks[index] = {...task,description,date,status};

      
      state.tasks = tasks;
      localStorage.setItem('tasks',JSON.stringify(state.tasks));

    },
    completeTask(state,id){
      const index = state.tasks.findIndex(t => t.id === id);
      state.tasks[index].status = "completed";
      localStorage.setItem('tasks',JSON.stringify(state.tasks));
    }
  },
  actions: { 
    createTask({commit},task){
      commit('createTask', task);
    },
    updateTask({commit},task){
      commit('updateTask',task)
    },
    completeTask({commit},id){
      commit('completeTask',id)
    }
  },
  getters: {
    taskById: state => id => state.tasks.find(t => t.id === id)
    
  },
  modules: {
  }
})
