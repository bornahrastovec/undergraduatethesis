<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-black row justify-center items-center">
        <div style="display: block" v-if="entryClicked !== true">
          <span style="font-size: 2rem; color: white">Kako si danas?</span>
          <div class="row q-pa-md">
            <q-select
              bg-color="teal"
              label-color="white"
              filled
              v-model="model"
              :options="options"
              label="Osjećaj"
            />
            <q-btn
              round
              color="primary"
              icon="send"
              size="20px"
              v-if="model != null"
              style="margin-left: 20px"
              @click="entryClicked = true"
            />
          </div>
          <div class="q-pa-md q-gutter-md"></div>
        </div>
        <div style="display: block" v-if="entryClicked === true">
          <span style="font-size: 2rem; color: white"
            >Napisao si da si {{ options[model] }}, zašto?</span
          >
          <q-input
            filled
            type="textarea"
            v-model="description"
            label="Opis *"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Molimo unesite opis :)',
              (val) =>
                (val.length > 0 && val.length < 250) ||
                'Ne smije biti više od 250 slova',
            ]"
          />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data: () => ({
    model: null,
    options: [{label="Jako loše", value: 1}, "Loše", "Dobro", "Vrlo dobro", "Super"],
    entryClicked: false,
  }),
  methods: {
      clickNext() {
        console.log(model);
        this.entryClicked = true;
      }
  }
};
</script>

<style>
</style>