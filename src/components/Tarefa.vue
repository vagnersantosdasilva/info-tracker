<template>
    <div class="box has-text-weight-bold">
        <div class="columns" @click="tarefaClicada" style="cursor: pointer;">
            <div class="column is-6">
                {{ descricao }}
            </div>
            <div class="column">
                {{ projeto }}
            </div>
            <div class="column">
                <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Cronometro from './Cronometro.vue'
import ITarefa from '@/interfaces/ITarefa';

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Tarefa',
    emits:['aoTarefaClicada'],
    props:{
      tarefa:{
        type: Object as PropType<ITarefa>,
        required: true  
      }
    },
    methods:{
        tarefaClicada () : void {
            console.log('emitindo tarefa clicada')
            this.$emit('aoTarefaClicada', this.tarefa)
        }
    },
    computed:{
        descricao () :string {
            if (this.tarefa.descricao && this.tarefa.descricao.length>0){
                return this.tarefa.descricao
            }
            return 'Tarefa sem descrição'
        },
        projeto () :string {
            if(this.tarefa.projeto.nome && this.tarefa.projeto.nome.length>0){
                return this.tarefa.projeto.nome
            }
            return 'Tarefa sem projeto'
        }
    },
    components: {
        Cronometro
    }
})
</script>

<style scoped>
    .box {
        background: #FAF0CA
    }
</style>PropType, import ITarefa from '@/interfaces/ITarefa';
