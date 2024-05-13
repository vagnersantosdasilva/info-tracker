import http from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import { OBTER_PROJETOS, ALTERAR_PROJETO, REMOVER_PROJETO } from "@/store/actions";
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, REMOVE_PROJETO } from "@/store/mutations";
import { Module } from "vuex";

export interface EstadoDoProjeto {
    projetos : IProjeto[]
}

export const projeto: Module<EstadoDoProjeto, Estado> = {
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
    
        [ALTERAR_PROJETO](contexto,projeto: IProjeto){
          return http.put(`/projetos/${projeto.id}`,projeto)
        },
    
        [REMOVER_PROJETO]({commit}, id: string){
          return http.delete(`/projetos/${id}`)
          .then(()=>commit(REMOVE_PROJETO,id))
        },
    },
       
}