<template>
  <q-page class="full-height justify-center items-center fit">
    <div style="display: block" v-if="entryClicked !== true">
      <div v-if="isEnteredForToday == true">
        <h3 style="color: black; text-align: center;">
          Danas je već uneseno raspoloženje
          <span v-if="latestMood === 5">🥳</span>
          <span v-if="latestMood === 4">😃</span>
          <span v-if="latestMood === 3">😐</span>
          <span v-if="latestMood === 2">😔</span>
          <span v-if="latestMood === 1">😫</span>
        </h3>
      </div>
    </div>
    <div
      class="q-pa-md"
      v-if="isEnteredForToday === false && entryClicked !== true"
    >
      <h1 style="text-align: center">Kako si danas?</h1>
      <div class="row justify-center align-center">
        <div class="col flex justify-end">
          <q-select
            bg-color="teal"
            style="width: 200px"
            label-color="white"
            filled
            v-model="model"
            :options="options"
            label="Osjećaj"
          />
        </div>
        <div class="col flex justify-start">
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
      </div>
    </div>
    <div style="display: block" v-if="entryClicked === true">
      <span style="font-size: 2rem; color: white"
        >Odabrao/la si da si "{{ model.label }}", zašto?</span
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
import { mapGetters, mapActions } from "vuex";
import MoodService from "../../services/MoodService";
import moment from "moment";

export default {
  computed: {
    ...mapGetters("Auth", ["user"]),
  },
  data: () => ({
    model: "Dobro",
    options: [
      {
        label: "Jako loše",
        value: 1,
      },
      {
        label: "Loše",
        value: 2,
      },
      {
        label: "Dobro",
        value: 3,
      },
      {
        label: "Vrlo dobro",
        value: 4,
      },
      {
        label: "Super",
        value: 5,
      },
    ],
    description: "",
    isEnteredForToday: false,
    latestMood: 0,
    entryClicked: false,
  }),
  methods: {
    ...mapActions("Auth", ["getProfile"]),
    clickNext() {
      this.entryClicked = true;
    },
    saveEntry() {
      MoodService.NewMood(
        this.user._id,
        this.model.value,
        this.description
      ).then((res) => {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Usprešno spremljeno raspoloženje (za danas 😉)",
        });
        this.checkIfAlreadyEntered();
        this.$forceUpdate();
      });
    },
    checkIfAlreadyEntered() {
      MoodService.GetAllMoods(this.user._id).then((res) => {
        console.log(res);
        const lastDate = res[res.length - 1].date;
        const latestMood = res[res.length - 1].mood;
        if (moment().diff(moment(lastDate), "hours") < 24) {
          this.isEnteredForToday = true;
          this.latestMood = parseInt(latestMood);
        }
      });
    },
  },
  async created() {
    await this.getProfile();
    this.checkIfAlreadyEntered();
  },
};
</script>

<style>
</style>