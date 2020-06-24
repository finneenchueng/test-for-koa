import { defineComponent, ref } from 'vue';
export default defineComponent({
    setup() {
        const count = ref(0)
        const inc = () => {
            count.value++;
        }
        return {
            count,
            inc
        }
    }
});