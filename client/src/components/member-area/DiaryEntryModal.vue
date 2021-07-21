<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <div class="q-pa-md">
        <q-form @submit="onOKClick" class="q-gutter-md">
          <q-input
            filled
            v-model="title"
            label="Naslov *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Molimo unesite neki naslov',
            ]"
          />

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
          <q-rating
            label="Ocjena raspoloženja"
            v-model="rating"
            :max="4"
            size="2.5em"
            color="green-5"
            :icon="icons"
          />
        </q-form>
      </div>
      <q-card-actions align="right">
        <q-btn label="Zatvori" flat @click="onCancelClick" />
        <q-btn color="primary" label="Spremi" type="submit" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    // ...your custom props
  },

  emits: [
    // REQUIRED
    "ok",
    "hide",
  ],
  data: () => ({
    icons: [
      "sentiment_very_dissatisfied",
      "sentiment_dissatisfied",
      "sentiment_satisfied",
      "sentiment_very_satisfied",
    ],
    rating: 0,
    title: "",
    description: "",
  }),

  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show();
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit("hide");
    },

    onOKClick() {
      if (
        this.title.length > 0 &&
        this.description.length > 0 &&
        this.rating > 0
      ) {
        this.$emit("ok", {
          title: this.title,
          description: this.description,
          rating: this.rating,
        });

        this.hide();

        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Usprešno spremljen unos u dnevnik",
        });
      } else {
          this.$q.notify({
              color: 'red-5',
              textColor: "white",
              icon: "warning",
              message: "Molimo ispunite sva polja"
          })
      }
    },

    onCancelClick() {
      // we just need to hide the dialog
      this.hide();
    },
  },
};
</script>

<style>
</style>