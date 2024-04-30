<template>
    <div class="box">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao"/>
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option
                            :value="projeto.id"
                            v-for="projeto in projetos"
                            :key="projeto.id"
                        >
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Temporizador @finalizarCronometro="finalizar" />

            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import Temporizador from './Temporizador.vue'
import { useStore } from 'vuex';
import { key } from '@/store';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Formulario',
    emits: ['aoSalvarTarefa'],
    components: {
        Temporizador
    },
    data() {
        return {
            descricao: '',
            idProjeto: ''
        };
    },
    methods:{
        finalizar (tempo: number) : void {
            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempo,
                descricao: this.descricao,
                projeto : this.projetos.find(p => p.id == this.idProjeto)
            })
            this.descricao = ''
        }
    },
    setup () {
        const store = useStore(key)
        return {
            projetos : computed(()=>store.state.projetos)
        }
    }
})
</script>