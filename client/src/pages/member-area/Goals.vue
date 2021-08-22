<template>
  <q-page class="fit row justify-center items-center">
    <div class="q-pa-md">
      <h3>Definiranje ciljeva</h3>
      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"
        animated
        style="height: 100%"
      >
        <q-step
          :name="1"
          title="Definiranje ciljeva"
          caption="Kratki opis"
          icon="settings"
        >
          Da bi nešto nazvali ciljem, on mora zadovoljavati nekoliko kriterija:
          cilj mora biti nešto što mi zaista želimo i što nam je važno – ne
          našoj obitelji, okolini i prijateljima jer ne ispunjavamo tuđa
          očekivanja nego svoje ciljeve cilj mora biti nešto u čemu se možemo
          zamisliti – možda nam se čini da naš prijatelj dobro živi kao
          poduzetnik, ali to ne znači da bi nas taj posao usrećio i da bismo
          postigli isto što i on cilj mora biti konkretan, što znači da moramo
          odrediti ŠTO, KAKO, KADA, GDJE i ZAŠTO ga želimo ostvariti
        </q-step>

        <q-step :name="2" title="Što želiš?" icon="create_new_folder">
          <q-input
            v-model="what"
            filled
            type="textarea"
            placeholder="Unesi što želiš postići"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Molimo te da uneseš nešto, ne smije biti prazno :)',
            ]"
          />
        </q-step>
        <q-step :name="3" title="Zašto?" icon="create_new_folder">
          <q-input
            v-model="why"
            filled
            type="textarea"
            placeholder="Zašto to želiš postići?"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Molimo te da uneseš nešto, ne smije biti prazno :)',
            ]"
          />
        </q-step>

        <q-step :name="4" title="Kako to misliš postići?" icon="assignment">
          <q-input
            v-model="how"
            filled
            type="textarea"
            placeholder="Unesi kako misliš postići svoj cilj"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Molimo te da uneseš nešto, ne smije biti prazno :)',
            ]"
          />
        </q-step>

        <q-step :name="5" title="Do kada?" icon="add_comment">
          <q-date v-model="date" />
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              @click="nextStep()"
              color="primary"
              :label="step === 6 ? 'Završi' : 'Dalje'"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="$refs.stepper.previous()"
              label="Nazad"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </q-page>
</template>

<script>
import GoalService from "../../services/GoalService";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  data: () => ({
    step: 1,
    date: moment(Date.now()),
    what: "",
    why: "",
    how: "",
  }),
  computed: {
    ...mapGetters("Auth", ["user"]),
  },
  methods: {
    ...mapActions("Auth", ["getProfile"]),
    nextStep() {
      if (this.step < 6) {
        this.step += 1;
      }
      if (this.step == 6) {
        this.addGoal();
        this.step = 1;
      }
    },
    async addGoal() {
      if (this.what == "" || this.how == "" || this.why == "") {
        return this.$q.notify({
          color: "red-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Molimo ispunite sva polja!",
        });
      } else {
        GoalService.NewGoalEntry(
          this.how,
          this.what,
          this.date,
          this.why,
          this.user._id
        ).then((res) => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Usprešno spremljen cilj!",
          });
          this.how = "";
          this.what = "";
          this.date = Date.now();
        });
      }
    },
  },
  async created() {
    await this.getProfile();
  },
};
</script>

<style lang="scss" scoped>
.q-stepper {
  width: 50vw;
}
@media (max-width: $breakpoint-sm) {
 .q-stepper {
   width: 100%;
 }

}
</style>