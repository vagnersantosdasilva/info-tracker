<template>
    <section class="projetos">
        <h1 class="title">Projetos</h1>
        <hr>
        <div class="columns">
            <div class="column is-three-quarters">
                <div class="box ">
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="projeto in projetos" :key="projeto.id" @click="selecionaLinha(projeto)"
                                :class="{ 'is-selected': projeto.id === projetoSelecionado.id }">
                                <td>{{ projeto.id }}</td>
                                <td>{{ projeto.nome }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="column column is-one-quarters">
                <div class="box">
                    <form @submit.prevent="salvar">

                        <div class="field">
                            <label for="nomeDoProjeto" class="label">
                                Nome do Projeto
                            </label>
                            <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
                        </div>
                        <div class="field">
                            <label for="nomeDoProjeto" class="label">
                                ID
                            </label>
                            <input type="text" class="input" v-model="idProjeto" id="nomeDoProjeto" disabled>
                        </div>
                        <hr>
                        <div class="field is-fullwidth">

                            <button class="button is-primary is-fullwidth" type="submit" :disabled="salvarDisabled">
                                Salvar
                            </button>
                        </div>
                        <div class="field is-fullwidth" >
                            <button class="button is-danger is-active is-fullwidth" @click="removerProjeto()" type="button" :disabled="removerDisabled">Remover</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>

    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import IProjeto from '@/interfaces/IProjeto'

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Projetos',
    data() {
        return {
            nomeDoProjeto: '',
            idProjeto:'',
            projetoSelecionado: { id: '', nome: '' },
            contador: 0
            //projetos : [] as IProjeto[]
        }
    },
    methods: {
        salvar() {
            this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto)
            this.nomeDoProjeto = ''
        },

        selecionaLinha(projeto: IProjeto):void {
            if (this.projetoSelecionado.id != '' && this.projetoSelecionado.id == projeto.id) {
                this.nomeDoProjeto = ''
                this.idProjeto = ''
                this.projetoSelecionado = { id: '', nome: '' }
            }
            else {
                this.projetoSelecionado = projeto
                this.nomeDoProjeto = projeto.nome
                this.idProjeto = projeto.id
            }

        },
        removerProjeto():void {
            if (this.projetoSelecionado.id !=null) {
                this.nomeDoProjeto=''
                this.idProjeto=''
                this.store.commit('REMOVER_PROJETO', this.projetoSelecionado.id)
                console.log('objeto sera removido:',this.projetoSelecionado)
            }
        }
    },
    computed:{
        removerDisabled(){
            if(this.idProjeto.length === 0 ) return true
            return false
        },
        salvarDisabled(){
            if(this.nomeDoProjeto.length === 0 ) return true
            return false
        }
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

<style scoped>
.projetos {
    padding: 1px;
}

tr:hover {
    color: azure;
    background-color: #9f9bd8;
}

tr.is-selected {
    color: azure;
    background-color: #4f4b83;
}

.box {
    max-height: calc(100vh - 200px);
    min-height: calc(100vh - 200px);
    overflow-y: auto;
}
</style>