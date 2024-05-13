
import IProjeto from '@/interfaces/IProjeto'
import { InjectionKey } from 'vue'
import { Store, createStore, useStore as vuexUseStore} from 'vuex'
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, DEFINIR_PROJETOS, DEFINIR_TAREFAS, REMOVE_PROJETO } from './mutations'
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from './actions'
import http from '@/http'
import ITarefa from '@/interfaces/ITarefa'

interface Estado {
  projetos : IProjeto[],
  tarefas : ITarefa[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projetos: [],
    tarefas: []
  },

  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto
      } as IProjeto
      state.projetos.push(projeto)
    },
    [REMOVE_PROJETO](state, idProjeto: string) {
      const indexProjeto = state.projetos.findIndex(projeto => projeto.id === idProjeto);
      if (indexProjeto !== -1) {
        state.projetos.splice(indexProjeto, 1);
      }
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const indexProjeto = state.projetos.findIndex(p => p.id === projeto.id);
      if (indexProjeto !== -1) {
        state.projetos.splice(indexProjeto, 1, projeto);
      }
    },
    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos
    },

    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa)
    },
  }, 
 
  actions: {
    [OBTER_PROJETOS]({ commit}) {
      http.get('projetos')
      .then(resposta => commit(DEFINIR_PROJETOS,resposta.data))
    },

    [ALTERAR_PROJETO](contexto,projeto: IProjeto){
      return http.put(`/projetos/${projeto.id}`,projeto)
    },

    [REMOVER_PROJETO]({commit}, id: string){
      return http.delete(`/projetos/${id}`)
      .then(()=>commit(REMOVE_PROJETO,id))
    },
    
    [OBTER_TAREFAS]({ commit}) {
      http.get('tarefas')
      .then(resposta => commit(DEFINIR_TAREFAS,resposta.data))
    },

    [CADASTRAR_TAREFA]({commit},tarefa: ITarefa){
      return http.post('/tarefas',tarefa)
        .then(resposta => commit(ADICIONA_TAREFA,resposta.data))
    },
  }  
})

export function useStore (): Store<Estado> {
  return vuexUseStore(key)
}
