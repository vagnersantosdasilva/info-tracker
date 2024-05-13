<template>
    <div class="tarefas">
        <div class="title">Tarefas</div>
        <hr>
        <Formulario @aoSalvarTarefa="salvarTarefa"></Formulario>
        <div class="lista">
            <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue'
import Tarefa from '../components/Tarefa.vue'
import ITarefa from '../interfaces/ITarefa';
import { useStore } from '@/store'
import { CADASTRAR_TAREFA,OBTER_PROJETOS,OBTER_TAREFAS } from '@/store/actions';

export default defineComponent({
    name: 'App',
    components: {
        
        Formulario,
        Tarefa
    },
    data() {
        return {
            tarefas: [] as ITarefa[]
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.store.dispatch(CADASTRAR_TAREFA,tarefa)
        }
    },
    setup() {
        const store = useStore()
        store.dispatch(OBTER_TAREFAS)
        store.dispatch(OBTER_PROJETOS)
        return {
            store,
            // eslint-disable-next-line vue/no-dupe-keys
            tarefas: computed(() => store.state.tarefas),
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
</style>