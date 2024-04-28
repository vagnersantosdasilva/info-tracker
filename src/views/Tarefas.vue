<template>
    <div>
        <Formulario @aoSalvarTarefa="salvarTarefa"></Formulario>
        <div class="lista">
            <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue'
import Tarefa from '../components/Tarefa.vue'
import ITarefa from '../interfaces/ITarefa';
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
            this.tarefas.push(tarefa)
        }
    }
})
</script>
<style scoped>
.lista {
    padding: 1.25rem;
}

main {
    --bg-primario: #fff;
    --texto-primario: #000;
}
</style>