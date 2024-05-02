<template>
    <section>

        <div class="is-fullwidth">
            <div class="controle ">
                <div class="ml-3">
                    <input class="input is-rounded" type="text" placeholder="Pesquisar ..." />
                </div>
                <div class="mr-3">
                    <button class="button is-outlined m-1" @click="adicionarProjeto">
                        <span class="icon is-small">
                            <i class="fas fa-plus"></i>
                        </span>
                    </button>
                    <button class="button is-outlined m-1" @click="editarProjeto" :disabled="editarDisabled">
                        <span class="icon is-small">
                            <i class="fas fa-pencil"></i>
                        </span>
                    </button>
                    <button class="button  is-outlined m-1" @click="removerProjeto" :disabled="editarDisabled">
                        <span class="icon is-small">
                            <i class="fas fa-trash"></i>
                        </span>
                    </button>
                </div>

            </div>
        </div>


        <div class="columns m-0">
            <div class="column is-fullwidth">
                <div class="box painel m-0">
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
        </div>

    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import IProjeto from '@/interfaces/IProjeto'
import { REMOVE_PROJETO } from '@/store/constants'

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Lista',
    data() {
        return {
            nomeDoProjeto: '',
            idProjeto: '',
            projetoSelecionado: { id: '', nome: '' },
        }
    },
    methods: {

        selecionaLinha(projeto: IProjeto): void {
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
        adicionarProjeto() {
            this.nomeDoProjeto = ''
            this.idProjeto = ''
            this.$router.push('/projetos/novo')
        },

        editarProjeto() {
            this.nomeDoProjeto = this.projetoSelecionado.nome
            this.idProjeto = this.projetoSelecionado.id
            this.$router.push(`/projetos/${this.idProjeto}`)
        },

        removerProjeto(): void {
            if (this.projetoSelecionado.id != null) {
                this.nomeDoProjeto = ''
                this.idProjeto = ''
                this.store.commit(REMOVE_PROJETO, this.projetoSelecionado.id)
                this.projetoSelecionado = { id: '', nome: '' }
            }
        },
    },
    computed: {
        removerDisabled() {
            if (this.idProjeto.length === 0) return true
            return false
        },
        salvarDisabled() {
            if (this.nomeDoProjeto.length === 0) return true
            return false
        },
        editarDisabled() {
            if (this.projetoSelecionado.id != '' && this.projetoSelecionado.nome != '') return false
            return true
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

<style scoped>
tr:hover {
    color: azure;
    background-color: #9f9bd8;
}

tr.is-selected {
    color: azure;
    background-color: #4f4b83;
}

.box.painel {
    max-height: calc(100vh - 200px);
    min-height: calc(100vh - 200px);
    overflow-y: auto;
    margin: 0;
}

.controle {
    height: 45px;
    padding: 0;
    display: flex;
    justify-content: space-between;
}

.controle .button {
    height: 35px;
    border-radius: 50%;
}
</style>