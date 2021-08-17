<template>
  <div>
    <div v-if="goals == null || goals.length == 0 || goals.length == undefined">
      <div class="text-h6 text-blue text-bold">
        Nema dovoljno unesenih ciljeva za uvid, unesi barem jedan cilj...
      </div>
    </div>
    <div v-if="goals.length > 0">
      <div class="row">
        <div v-for="(goal, index) in goals" :key="goal._id">
          <div class="col-lg-6 col-sm-12 col-xs-12">
            <q-card
              class="q-ma-sm"
              :class="goal.finished ? 'bg-green text-white' : 'bg-white'"
            >
              <q-card-section>
                <div class="header flex justify-between">
                  <div class="text-h5 text-bold q-pa-md">
                    {{ index }}: {{ goal.what }}
                  </div>
                  <q-btn
                    :disabled="goal.finished"
                    size="small"
                    :color="goal.finished ? 'gray' : 'green'"
                    icon="check"
                    @click="markAsChecked(goal._id)"
                  />
                </div>
                <div class="text-h6 text-black text-bold q-pa-md">
                  Kako:
                  <div class="text-h6 text-black q-pa-md">
                    {{ goal.how }}
                  </div>
                </div>
                <div class="text-h6 text-black text-bold q-pa-md">
                  Zašto:
                  <div class="text-h6 text-black q-pa-md">
                    {{ goal.why }}
                  </div>
                </div>
                <div class="text-h6 text-black text-bold q-pa-md">
                  Do kada?
                  <div class="text-h6 text-black q-pa-md">
                    {{ filterDate(goal.dateOfPlannedAchievment) }}
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoalService from "../../services/GoalService";

import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "GoalsSlide",
  computed: {
    ...mapGetters("Auth", ["user"]),
  },

  data() {
    return {
      slide: 1,
      goals: [],
    };
  },
  methods: {
    ...mapActions("Auth", ["getProfile"]),
    filterDate(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
      return null;
    },
    markAsChecked(id) {
    GoalService.MarkGoalAsChecked(id).then((res) => {
        console.log(res);
        GoalService.GetGoals(this.user._id).then((res) => {
          this.goals = res;
        });
      });
    },
  },
  async created() {
    await this.getProfile();
    await GoalService.GetGoals(this.user._id).then((res) => {
      this.goals = res;
    });
    console.log(this.goals);
  },
};
</script>