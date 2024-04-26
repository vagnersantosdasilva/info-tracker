<template>
    <section>
        <strong>{{ tempoDecorridoEmSegundos }}</strong>
    </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent ({
    
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Cronometro',
    props: {
        tempoEmSegundos: {
            type: Number,
            default: 0
        }
    },
    computed: {
        tempoDecorridoEmSegundos () : string{
            return new Date(this.tempoEmSegundos * 1000).toISOString().slice(-13, -5)
        }
    }

})
</script>