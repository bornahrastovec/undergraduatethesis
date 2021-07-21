<template>
  <q-layout>
    <q-page>
      <q-page-container>
        <div class="q-pa-md">
          <div class="row q-gutter-md">
            <div
              v-for="entry in diaryEntries"
              :key="entry"
              class="col-6 col-md col-lg-3"
            >
              <q-card
                dark
                bordered
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
      </q-page-container>
    </q-page>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DiaryService from "../../services/DiaryService";
import DiaryEntryModal from "../../components/member-area/DiaryEntryModal.vue";
import lodash from "lodash";
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