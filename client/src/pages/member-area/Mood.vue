<template>
  <q-page class="bg-info row justify-center items-center">
    <div style="display: block; width: 50vw" v-if="entryClicked !== true">
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
        >Odabrao/la si da si "{{ model }}", zašto?</span
      >
      <q-input
        filled
        color="white"
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
      <q-btn
        color="primary"
        label="Spremi"
        icon="send"
        size="20px"
        v-if="description.length > 5"
        @click="saveEntry"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  data: () => ({
    model: "Dobro",
    options: ["Jako loše", "Loše", "Dobro", "Vrlo dobro", "Super"],
    description: "",
    entryClicked: false,
  }),
  methods: {
    clickNext() {
      console.log(model);
      this.entryClicked = true;
    },
    saveEntry() {
      console.log("Clicked save: " + this.description);
    },
  },
};
</script>

<style>
</style>