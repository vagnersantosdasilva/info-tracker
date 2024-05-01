<template>
    <section class="projetos">
        <h1 class="title">Projetos</h1>
        <hr>
        <div>
            <div class="is-fullwidth">
                <div class="controle ">
                    <div class="ml-3">
                        <input class="input is-rounded" type="text" placeholder="Pesquisar ..." />
                        

                        <!-- <button class="button is-link is-outlined m-1" @click="toggleModal">
                            <span class="icon is-small">
                                <i class="fas fa-plus"></i>
                            </span>
                        </button> -->
                    </div>
                    <div class="mr-3">
                        <button class="button is-outlined m-1" @click="toggleModal">
                            <span class="icon is-small">
                                <i class="fas fa-pencil"></i>
                            </span>
                        </button>
                        <button class="button  is-outlined m-1">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </div>

                </div>
            </div>
        </div>

        <div v-if="showModal" class="modal columns m-0">
            <div class="modal-background" @click="toggleModal"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Controle de Projetos</p>
                    <button class="delete" aria-label="close" @click="toggleModal"></button>
                </header>
                <section class="modal-card-body">
                    <div class="p-2">
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

                        </form>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <div class="buttons">
                        <button class="button is-success" @click="salvar">Salvar alterações</button>
                        <button class="button" @click="toggleModal">Cancelar</button>
                    </div>
                </footer>
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

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Projetos',
    data() {
        return {
            nomeDoProjeto: '',
            idProjeto: '',
            projetoSelecionado: { id: '', nome: '' },
            contador: 0,
            showModal: false,
            //projetos : [] as IProjeto[]
        }
    },
    methods: {
        salvar() {
            this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto)
            this.nomeDoProjeto = ''
        },

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
        removerProjeto(): void {
            if (this.projetoSelecionado.id != null) {
                this.nomeDoProjeto = ''
                this.idProjeto = ''
                this.store.commit('REMOVER_PROJETO', this.projetoSelecionado.id)
                console.log('objeto sera removido:', this.projetoSelecionado)
            }
        },
        toggleModal() {
            this.showModal = !this.showModal;
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