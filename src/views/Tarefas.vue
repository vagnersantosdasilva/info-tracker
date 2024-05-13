<template>
    <div class="tarefas">
        <div class="title">Tarefas</div>
        <hr>
        <Formulario @aoSalvarTarefa="salvarTarefa"></Formulario>
        <div class="lista">
            <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"
                @aoTarefaClicada="selecionarTarefa(tarefa)" />
        </div>

        <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Editar Tarefa</p>
                    <button class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">

                    <div class="field">
                        <label for="descricaoTarefa" class="label">
                            Descrição de Tarefa
                        </label>
                        <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoTarefa">
                    </div>

                </section>
                <footer class="modal-card-foot">
                    <div class="buttons">
                        <button class="button is-success" @click="alterarTarefa">Salvar Alterações</button>
                        <button class="button" @click="fecharModal">Fechar</button>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue'
import Tarefa from '../components/Tarefa.vue'
import ITarefa from '../interfaces/ITarefa';
import { useStore } from '@/store'
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/actions';

export default defineComponent({
    name: 'App',
    components: {

        Formulario,
        Tarefa
    },
    data() {
        return {
            tarefas: [] as ITarefa[],
            descricaoTarefa: '',
            tarefaSelecionada: null as ITarefa | null
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa)
        },
        selecionarTarefa(tarefa: ITarefa) {
            console.log('tarefa selecionada', this.tarefaSelecionada)
            this.tarefaSelecionada = tarefa
        },
        fecharModal() {
            this.tarefaSelecionada = null
        },
        alterarTarefa () {
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
            .then(()=>this.fecharModal())
        }
    },
    setup() {
        const store = useStore()
        store.dispatch(OBTER_TAREFAS)
        store.dispatch(OBTER_PROJETOS)
        return {
            store,
            // eslint-disable-next-line vue/no-dupe-keys
            tarefas: computed(() => store.state.tarefa.tarefas),
        }
    }
})
</script>
<style scoped>
.tarefas {
    padding: 1px;
}

.lista {
    padding: 1.25rem;
}

main {
    --bg-primario: #fff;
    --texto-primario: #000;
}

.tarefa {
    cursor: pointer;
}
</style>