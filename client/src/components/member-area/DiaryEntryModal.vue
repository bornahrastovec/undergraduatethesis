<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <div class="q-pa-md">
        <q-form @submit="onOKClick" class="q-gutter-md">
          <q-input
            filled
            v-model="newTitle"
            label="Naslov *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Molimo unesite neki naslov',
            ]"
          />

          <q-input
            filled
            type="textarea"
            v-model="newDescription"
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
            v-model="newRating"
            :max="4"
            size="2.5em"
            color="green-5"
            :icon="icons"
          />
        </q-form>
      </div>
      <q-card-actions align="right">
        <q-btn label="Zatvori" flat @click="onCancelClick" />
        <q-btn color="primary" label="Spremi" type="submit" @click="onOKClick"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    id: String,
    title: String,
    rating: Number,
    description: String,
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
    newRating: 0,
    newTitle: "",
    newDescription: "",
  }),

  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show();

      if (this.$props.id != "") {
        this.newRating = this.$props.rating;
        this.newDescription = this.$props.description;
        this.newTitle = this.$props.title;
      }
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.newRating = 0;
      this.newDescription = "";
      this.newTitle = "";
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit("hide");
    },

    onOKClick() {
      if (
        this.newTitle.length > 0 &&
        this.newDescription.length > 0 &&
        this.newRating > 0
      ) {
        this.$emit("ok", {
          id: this.$props.id,
          title: this.newTitle,
          description: this.newDescription,
          rating: this.newRating,
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
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Molimo ispunite sva polja",
        });
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