<template>
    <div :dir="'auto'" :class="computedClass" :style="computedStyle">
        <!-- <template v-if="field.type === 'signature'">
      <div class="flex flex-col justify-between h-full overflow-hidden">
        <div class="flex-grow flex overflow-hidden" style="min-height: 50%">
          <img class="object-contain mx-auto" :src="attachmentsIndex[value].url" />
        </div>
        <template v-if="withSignatureId && attachmentsIndex[value]">
          <div class="w-full mt-1 text-[1vw] lg:text-[0.55rem] lg:leading-[0.65rem]">
            <div class="truncate uppercase">
              ID: {{ attachmentsIndex[value].uuid }}
            </div>
            <div>
              {{ $t('reason') }}: {{ $t('digitally_signed_by') }} {{ submitter.name }}
              <template v-if="submitter.email">
                &lt;{{ submitter.email }}&gt;
              </template>
            </div>
            <div>
              {{ formatDate(attachmentsIndex[value].created_at, 'long', timezone, locale) }} {{ timezoneAbbr(timezone, attachmentsIndex[value].created_at) }}
            </div>
          </div>
        </template>
      </div>
    </template>

    <template v-else-if="['image', 'initials', 'stamp'].includes(field.type)">
      <img class="object-contain mx-auto" :src="attachmentsIndex[value].url" loading="lazy" />
    </template>

    <template v-else-if="['file', 'payment'].includes(field.type)">
      <autosize-field />
      <div class="px-0.5 flex flex-col justify-center">
        <template v-for="val in Array.wrap(value)" :key="val">
          <a :target="'_blank'" :href="attachmentsIndex[val].url">
            <svg-icon name="paperclip" class="inline w-[1.6vw] h-[1.6vw] lg:w-4 lg:h-4" />
            {{ attachmentsIndex[val].filename }}
          </a>
        </template>
      </div>
    </template>

    <template v-else-if="field.type === 'checkbox'">
      <div class="w-full flex items-center justify-center">
        <svg-icon name="check" :class="checkboxClass" />
      </div>
    </template>

    <template v-else-if="['multiple', 'radio'].includes(field.type) && area.option_uuid">
      <template v-if="option && Array.wrap(value).includes(optionName)">
        <div class="w-full flex items-center justify-center">
          <svg-icon name="check" :class="checkboxClass" />
        </div>
      </template>
    </template>

    <template v-else-if="field.type === 'cells' && area.cell_w">
      <div class="w-full flex items-center">
        <template v-for="(cell, index) in cellCount" :key="index">
          <template v-if="value[index]">
            <div class="text-center flex-none" :style="{ width: cellWidth + '%' }">{{ value[index] }}</div>
          </template>
        </template>
      </div>
    </template>

    <template v-else-if="field.type === 'date'">
      <autosize-field />
      <div class="flex items-center px-0.5">
        <template v-if="value === '{{date}}'">
          {{ formatDateString(currentDate, field.preferences.format, locale) }}
        </template>
        <template v-else>
          {{ formatDateString(value, field.preferences.format, locale) }}
        </template>
      </div>
    </template>

    <template v-else-if="field.type === 'number'">
      <autosize-field />
      <div class="flex items-center px-0.5 whitespace-nowrap">
        {{ formatNumber(value, field.preferences.format) }}
      </div>
    </template> -->

        <template v-if="field.type === 'text'">
            <autosize-field />
            <div class="flex items-center px-0.5 whitespace-pre-wrap">
                Value
                <!-- {{ Array.wrap(value).join(", ") }} -->
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: "FieldValue",
    props: {
        field: Object,
        // area: Object,
        // value: [String, Number, Array],
        // attachmentsIndex: Object,
        // submitter: Object,
        // withSignatureId: Boolean,
        // timezone: String,
        // locale: String
    },
    // created() {
    //     console.log("Received Props", this.field);
    // },
    computed: {
        // area() {
        //     return this.field?.areas[0];
        // },
        align() {
            return this.field.preferences?.align;
        },
        computedClass() {
            return `flex absolute text-[1.6vw] lg:text-base ${this.alignClass}`;
        },
        computedStyle() {
            // console.log("Area", this.field.areas[0]);
            const area = this.field.areas[0];
            return {
                width: `${area.w * 100}%`,
                height: `${area.h * 100}%`,
                left: `${area.x * 100}%`,
                top: `${area.y * 100}%`,
                fontSize: this.field.preferences.font_size
                    ? `${this.field.preferences.font_size}pt`
                    : "",
            };
        },
        // alignClass() {
        //   switch (this.align) {
        //     case 'right':
        //       return 'justify-end';
        //     case 'center':
        //       return 'justify-center';
        //     default:
        //       return '';
        //   }
        // },
        // checkboxClass() {
        //   return `aspect-square ${this.area.w > this.area.h ? '!w-auto !h-full' : '!w-full !h-auto'}`;
        // },
        // option() {
        //   return this.field.options.find(option => option.uuid === this.area.option_uuid);
        // },
        // optionName() {
        //   return this.option.value || `Option ${this.field.options.indexOf(this.option) + 1}`;
        // },
        // cellCount() {
        //   return Array.from({ length: Math.ceil(this.area.w / this.area.cell_w) });
        // },
        // cellWidth() {
        //   return (this.area.cell_w / this.area.w) * 100;
        // },
        // currentDate() {
        //   return new Date().toLocaleDateString(this.locale);
        // }
    },
    methods: {
        // formatDate(date, format, timezone, locale) {
        //     // Implement the formatDate method based on your requirements
        // },
        // timezoneAbbr(timezone, date) {
        //     // Implement the timezoneAbbr method based on your requirements
        // },
        // formatDateString(date, format, locale) {
        //     // Implement the formatDateString method based on your requirements
        // },
        // formatNumber(number, format) {
        //     // Implement the formatNumber method based on your requirements
        // },
    },
};
</script>
