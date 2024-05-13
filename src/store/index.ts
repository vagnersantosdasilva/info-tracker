import { InjectionKey } from 'vue'
import { Store, createStore, useStore as vuexUseStore} from 'vuex'
import { EstadoDoProjeto, projeto } from './modulos/projeto'
import { EstadoTarefa, tarefa } from './modulos/tarefa'
export interface Estado {
  projeto: EstadoDoProjeto,
  tarefa: EstadoTarefa

}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    tarefa: {
      tarefas:[]
    },
    projeto:{
      projetos: []
    }
  },

  mutations: {
   //
  }, 
 
  actions: {
    //
  },
  modules:{
    projeto,
    tarefa
  }    
})

export function useStore (): Store<Estado> {
  return vuexUseStore(key)
}
