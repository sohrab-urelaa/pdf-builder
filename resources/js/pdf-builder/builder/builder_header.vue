<template>
    <div class="flex items-center gap-2 flex-wrap">
        <div
            v-for="inputItem in inputLists"
            :key="inputItem.id"
            class="grow-1 basis-[130px]"
        >
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">{{ inputItem.label }}</span>
                </div>
                <input
                    v-model="field.preferences[inputItem.value_key]"
                    :type="inputItem.type"
                    :placeholder="inputItem.label"
                    className="input input-primary input-bordered w-full max-w-xs input-sm"
                    @change="[save()]"
                />
            </label>
        </div>
        <div
            v-for="inputItem in fieldInputList"
            :key="inputItem.id"
            class="grow-1 basis-[130px]"
        >
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">{{ inputItem.label }}</span>
                </div>
                <!-- if it's a dropdown render selectable default value  -->
                <template
                    v-if="
                        field.type === 'select' &&
                        inputItem.value_key === 'default_value'
                    "
                >
                    <select
                        v-model="field[inputItem.value_key]"
                        @change="[save()]"
                        className="select select-primary w-full max-w-xs select-sm"
                    >
                        <option disabled selected>Select default value</option>
                        <option
                            v-for="optionItem in field.options"
                            :key="optionItem.uuid"
                        >
                            {{ optionItem.value }}
                        </option>
                    </select>
                </template>
                <input
                    v-else
                    v-model="field[inputItem.value_key]"
                    @change="[save()]"
                    :type="inputItem.type"
                    :placeholder="inputItem.label"
                    className="input input-primary input-bordered w-full max-w-xs input-sm"
                />
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: "CommongFieldSettings",
    components: {},
    inject: ["template", "save", "backgroundColor", "selectedAreaRef", "t"],
    props: {
        field: {
            type: Object,
            required: true,
        },
    },
    // emits: ["set-draw", "remove", "scroll-to"],
    data() {
        return {};
    },
    computed: {},
    created() {},
    methods: {},
};
</script>
