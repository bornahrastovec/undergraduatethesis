<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
        <div
          v-for="(entry, index) in diaryEntries"
          :key="entry._id"
          class="col-lg-3 col-xs-12 col-md-12 col-sm-12 self-center"
        >
          <q-card
            dark
            bordered
            style="max-height: 200px"
            :class="
              entry.moodRate < 2
                ? 'bg-grey-9 my-card'
                : entry.moodRate < 4 && entry.moodRate > 2
                ? 'bg-green-6 my-card'
                : entry.moodRate >= 4
                ? 'bg-teal-10 my-card'
                : 'bg-teal-10 my-card'
            "
            class="cursor-pointer"
          >
            <q-card-section>
              <div class="row justify-between">
                <div class="text-h6">{{ entry.title }}</div>
                <q-btn
                  size="small"
                  round
                  color="red"
                  icon="delete"
                  @click="deleteEntry(entry._id)"
                />
              </div>
              <div class="text-subtitle2">
                {{ user.name + " " + user.surname }}
              </div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section @click="openDialog(index)">
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
        @click="openDialog(0)"
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
    async deleteEntry(id) {
      this.$q
        .dialog({
          title: "Brisanje unosa",
          message: "Jeste li sigurni da želite obrisati unos?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          DiaryService.deleteEntry(id).then(() => {
            return DiaryService.getDiaryEntries(this.user._id).then((res) => {
              this.diaryEntries = res;
              this.$q.notify({
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                message: "Usprešno obrisan unos",
              });
            });
          });
        })
        .onCancel(() => {})
        .onDismiss(() => {});
    },
    async openDialog(id) {
      this.$q
        .dialog({
          component: DiaryEntryModal,
          componentProps: {
            id: id > 0 ? this.diaryEntries[id]._id : "",
            rating: id > 0 ? this.diaryEntries[id].moodRate : 0,
            title: id > 0 ? this.diaryEntries[id].title : "",
            description: id > 0 ? this.diaryEntries[id].description : "",
          },
        })
        .onOk((payload) => {
          console.log(payload);
          let title = payload.title;
          let description = payload.description;
          let rating = payload.rating;
          let id = payload.id;

          console.log("From variables", title, description, rating, id);
          if (payload.id != "") {
            console.log("Running update");
            DiaryService.updateEntry(
              payload.id,
              payload.title,
              payload.description,
              payload.rating
            ).then(() => {
              console.log("Get entries pls");
              return DiaryService.getDiaryEntries(this.user._id).then((res) => {
                this.diaryEntries = res;
              });
            });
          } else {
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
          }
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
.q-card:hover {
  border: 2px solid black;
  transition: 50ms ease;
}
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