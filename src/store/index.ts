
import IProjeto from '@/interfaces/IProjeto'
import { InjectionKey } from 'vue'
import { Store, createStore, useStore as vuexUseStore} from 'vuex'
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, REMOVE_PROJETO } from './constants'
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO } from './actions'
import http from '@/http'
interface Estado {
  projetos : IProjeto[]
}
export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projetos: []
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
  }, 
  actions: {
    [OBTER_PROJETOS]({ commit}) {
      http.get('projetos')
      .then(resposta => commit(DEFINIR_PROJETOS,resposta.data))
    },

    [CADASTRAR_PROJETO](contexto,nomeDoProjeto:string){
      return http.post('/projetos',{nome:nomeDoProjeto})
    },

    [ALTERAR_PROJETO](contexto,projeto: IProjeto){
      return http.put(`/projetos/${projeto.id}`,projeto)
    },

    [REMOVER_PROJETO]({commit}, id: string){
      return http.delete(`/projetos/${id}`)
      .then(()=>commit(REMOVE_PROJETO,id))
    }
  }  
})

export function useStore (): Store<Estado> {
  return vuexUseStore(key)
}
