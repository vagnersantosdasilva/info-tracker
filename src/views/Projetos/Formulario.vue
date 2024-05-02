<template>
    <section>
        <div class="columns m-0">
            <div class="column is-fullwidth">
                <section class="card-body">
                    <div class="p-2">
                        <form @submit.prevent="salvar">
                            <div class="field">
                                <label for="nomeDoProjeto" class="label">
                                    Nome do Projeto
                                </label>
                                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
                            </div>
                        </form>
                    </div>
                </section>
                <section>
                    <div class="buttons mt-2 ml-1">
                            <button class="button is-success" @click="salvar" :disabled="salvarDisabled">Salvar</button>
                            <button class="button" @click="voltar">Voltar</button>
                    </div>
                </section>
                
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import IProjeto from '@/interfaces/IProjeto'
import { ADICIONA_PROJETO, ALTERA_PROJETO } from '@/store/constants'

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Formulario',
    props: {
        id:{
            type: String,
            default: ''
        }
    },
    data() {
        return {
            nomeDoProjeto: '',
        }
    },
    methods: {
        salvar() {
            console.log('id:',this.id)
            console.log('nome:',this.nomeDoProjeto)
            if (this.id && this.id.length > 0){
                console.log('editando projeto')
                this.store.commit(ALTERA_PROJETO, {
                    nome: this.nomeDoProjeto, 
                    id:this.id
                })
            }
            else {
                console.log('adicionando projeto')
                this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
                this.nomeDoProjeto = ''
            }
        },
        voltar (){
            this.$router.push('/projetos')
        }
    },
    mounted(){
        if (this.id){
            const projeto = this.store.state.projetos.find(projeto => projeto.id == this.id)
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },
    computed: {
        salvarDisabled() {
            if (this.nomeDoProjeto.length === 0) return true
            return false
        },
    },
    setup() {
        const store = useStore()
        return {
            store,
            // eslint-disable-next-line vue/no-dupe-keys
            projetos: computed(() => store.state.projetos),
        }
    }
})
</script>
