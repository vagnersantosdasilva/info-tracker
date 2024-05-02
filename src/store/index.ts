
import IProjeto from '@/interfaces/IProjeto'
import { InjectionKey } from 'vue'
import { Store, createStore, useStore as vuexUseStore} from 'vuex'
import { ADICIONA_PROJETO, ALTERA_PROJETO, REMOVE_PROJETO } from './constants'

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
    }
  }  
})

export function useStore (): Store<Estado> {
  return vuexUseStore(key)
}
