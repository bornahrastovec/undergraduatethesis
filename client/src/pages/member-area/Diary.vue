<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
        <div v-for="entry in diaryEntries" :key="entry" class="col-lg-3 col-sm-12 self-center">
          <q-card
            dark
            bordered
            style="max-height: 200px;"
            :class="
              entry.moodRate < 2
                ? 'bg-grey-9 my-card'
                : entry.moodRate < 4 && entry.moodRate > 2
                ? 'bg-green-6 my-card'
                : entry.moodRate >= 4
                ? 'bg-teal-10 my-card'
                : 'bg-teal-10 my-card'
            "
          >
            <q-card-section>
              <div class="row">
                <div class="text-h6">{{ entry.title }}</div>
                <div class="emoji"></div>
              </div>
              <div class="text-subtitle2">
                {{ user.name + " " + user.surname }}
              </div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section>
              {{ entry.description }}
            </q-card-section>
            <q-card-section> </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="add"
        color="primary"
        label="Novi unos"
        @click="openDialog"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DiaryService from "../../services/DiaryService";
import DiaryEntryModal from "../../components/member-area/DiaryEntryModal.vue";
export default {
  computed: {
    ...mapGetters("Auth", ["user"]),
  },

  data: () => ({
    diaryEntries: [],
    icons: [
      "sentiment_very_dissatisfied",
      "sentiment_dissatisfied",
      "sentiment_satisfied",
      "sentiment_very_satisfied",
    ],
  }),
  methods: {
    ...mapActions("Auth", ["getProfile"]),
    async openDialog() {
      this.$q
        .dialog({
          component: DiaryEntryModal,
        })
        .onOk((payload) => {
          DiaryService.newDiaryEntry(
            payload.title,
            payload.description,
            this.user._id,
            payload.rating
          ).then(() => {
            DiaryService.getDiaryEntries(this.user._id).then((res) => {
              this.diaryEntries = res;
            });
          });
        })
        .onCancel(() => {
          console.log("cancel");
        })
        .onDismiss(() => {
          console.log("Called on OK or Cancel");
        });
    },
  },
  async created() {
    await this.getProfile();
    this.diaryEntries = await DiaryService.getDiaryEntries(this.user._id);
  },
  async updated() {},
};
</script>

<style lang="scss" scoped>
  @media (min-width: $breakpoint-md) {
    .col-lg-3 {
      text-align: center;
    }
    .q-card {
      max-width: 50%;
      max-height: 50vh;
    }
  }
  @media (max-width: $breakpoint-sm) {
    .q-card {
      max-width: 100%;
    }
  }
</style>