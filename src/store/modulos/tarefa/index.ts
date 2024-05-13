import http from "@/http"
import ITarefa from "@/interfaces/ITarefa"
import { Estado } from "@/store"
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from "@/store/actions"
import { DEFINIR_TAREFAS, ADICIONA_TAREFA, ALTERA_TAREFA } from "@/store/mutations"
import { Module } from "vuex"

export interface EstadoTarefa {
    tarefas : ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
          state.tarefas = tarefas
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
          state.tarefas.push(tarefa)
        },
    
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
          const indexTarefa = state.tarefas.findIndex(t => t.id === tarefa.id);
          state.tarefas[indexTarefa] = tarefa
        },
      }, 
     
      actions: {
        [OBTER_TAREFAS]({ commit}) {
          http.get('tarefas')
          .then(resposta => commit(DEFINIR_TAREFAS,resposta.data))
        },
    
        [CADASTRAR_TAREFA]({commit},tarefa: ITarefa){
          return http.post('/tarefas',tarefa)
            .then(resposta => commit(ADICIONA_TAREFA,resposta.data))
        },
    
        [ALTERAR_TAREFA]({commit},tarefa: ITarefa){
          return http.put(`/tarefas/${tarefa.id}`,tarefa)
            .then(() => commit(ALTERA_TAREFA, tarefa))
        },
      },
}