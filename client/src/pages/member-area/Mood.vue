<template>
  <q-page class="bg-info row justify-center items-center">
    <span style="font-size: 2rem; color: white" v-if="isEnteredForToday !== true">Kako si danas?</span>
    <div style="display: block;" v-if="entryClicked !== true">
      <div v-if="isEnteredForToday == true">
        <h3 style="color: white;">Danas je već uneseno raspoloženje 
          <span v-if="latestMood === 'Super'">🎉</span>
          <span v-if="latestMood === 'Vrlo dobro'">😃</span>
          <span v-if="latestMood === 'Dobro'">😐</span>
          <span v-if="latestMood === 'Loše'">😔</span>
          <span v-if="latestMood === 'Jako loše'">😫</span>
        </h3>
      </div>
      <div class="row q-pa-md" v-if="isEnteredForToday == false">
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
import {mapGetters, mapActions} from 'vuex';
import MoodService from '../../services/MoodService';
import moment from 'moment';

export default {
  computed: {
    ...mapGetters("Auth", ["user"]),
  },
  data: () => ({
    model: "Dobro",
    options: ["Jako loše", "Loše", "Dobro", "Vrlo dobro", "Super"],
    description: "",
    isEnteredForToday: false,
    latestMood: "",
    entryClicked: false,
  }),
  methods: {
    ...mapActions("Auth", ["getProfile"]),
    clickNext() {
      this.entryClicked = true;
    },
    saveEntry() {
      MoodService.NewMood(this.user._id, this.model, this.description).then((res) => {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Usprešno spremljeno raspoloženje (za danas 😉)",
        });
        MoodService.GetAllMoods(this.user._id).then((res) => {
          console.log(res);
        })
      });
    },
  },
  async created() {
    await this.getProfile();
    MoodService.GetAllMoods(this.user._id).then((res) => {

      const lastDate = res[res.length-1].date;
      const latestMood = res[res.length-1].mood;

      if (moment().diff(moment(lastDate), 'hours') < 24) {
        this.isEnteredForToday = true;
        this.latestMood = latestMood;
      }
    })
  }
};
</script>

<style>
</style>