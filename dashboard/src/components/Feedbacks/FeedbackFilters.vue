<template>
    <div class="feedbacks-filter">
        <h5 class="font-bold mb-5 text-2xl">Filtros</h5>
        <ul class="feedbacks-filter__items">
            <li
                class="feedbacks-filter__item animate__animated animate__fadeIn animate__faster"
                v-for="filter in filters"
                :key="filter.label"
                :data-filter="filter.label"
                :class="{ 'feedbacks-filter__item--selected': filter.active }"
                @click="handleSelect(filter)"
            >
                <span data-filter="label">
                    <i :class="filter.color.bg" class="feedbacks-filter__circle"></i>
                    {{ filter.label }}
                </span>
                <span
                    :class="filter.active ? filter.color.text : 'text-brand-graydark'"
                    class="font-bold"
                    data-filter="amount"
                >
                    {{ filter.amount }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { IConfiguredFilters } from '../../interfaces';
import { useStore } from '../../store';
import { Actions } from '../../store/type-actions';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
    async setup(_, { emit }) {
        const store = useStore();
        const isLoading = computed(() => store.getters.isLoading);
        const hasError = ref(false);

        try {
            await store.dispatch(Actions.GET_SUMMARY_FEEDBACK);
        } catch (error) {
            hasError.value = true;
        }

        const handleSelect = ({ type }: IConfiguredFilters) => {
            if (isLoading.value) return;

            /** Ativado quando um determinado filtro é clicado/selectionado
             * @event select
             * @type {Event}
             */
            emit('select', type);

            store.dispatch(Actions.CHANGE_ACTIVE_FEEDBACK, type);
        };

        return {
            store,
            handleSelect,
            filters: computed(() => store.getters.feedbackFilters),
        };
    },
});
</script>

<style lang="scss" scoped>
.feedbacks-filter {
    &__item {
        border-radius: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem;
        margin-bottom: 0.1rem;
        cursor: pointer;

        &--selected {
            background-color: #c4c4c452;
        }

        &:hover {
            background-color: #c4c4c41f;
        }
    }

    &__circle {
        display: inline-block;
        border-radius: 100%;
        margin-right: 0.5rem;
        height: 0.5rem;
        width: 0.5rem;
    }
}

.bg {
    &-info {
        background-color: #8296fb;
    }

    &-graydark {
        background-color: #c0bcb0;
    }

    &-warning {
        background-color: #e4b52e;
    }

    &-danger {
        background-color: #f88676;
    }
}

.text {
    &-info {
        color: #8296fb;
    }

    &-graydark {
        color: #c0bcb0;
    }

    &-warning {
        color: #e4b52e;
    }

    &-danger {
        color: #f88676;
    }
}
</style>
