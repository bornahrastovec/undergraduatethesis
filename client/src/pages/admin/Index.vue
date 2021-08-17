<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Korisnici"
        :rows="users"
        :columns="columns"
        :row-key="row => row._id"
        selection="multiple"
        :pagination="pagination"
        :selected="selected"
      >
        <template v-slot:pagination="scope">
          <q-btn
            v-if="scope.pagesNumber > 2"
            icon="first_page"
            color="grey-8"
            round
            dense
            flat
            :disable="scope.isFirstPage"
            @click="scope.firstPage"
          />

          <q-btn
            icon="chevron_left"
            color="grey-8"
            round
            dense
            flat
            :disable="scope.isFirstPage"
            @click="scope.prevPage"
          />

          <q-btn
            icon="chevron_right"
            color="grey-8"
            round
            dense
            flat
            :disable="scope.isLastPage"
            @click="scope.nextPage"
          />

          <q-btn
            v-if="scope.pagesNumber > 2"
            icon="last_page"
            color="grey-8"
            round
            dense
            flat
            :disable="scope.isLastPage"
            @click="scope.lastPage"
          />
        </template>
      </q-table>
    </div>
                {{users}}
  </q-page>
</template>

<script>
import { computed } from "vue";

const columns = [
  {
    name: "_id",
    field: "_id",
    required: true,
    label: "ID Korisnika",
    align: "left",
    sortable: true,
  },
  {
    name: "name",
    field: "name",
    required: true,
    label: "Ime",
    align: "left",
  },
  {
    name: "surname",
    required: true,
    label: "Prezime",
    field: "surname",
    align: "left",
  },
  {
    name: "username",
    field: "username",
    required: true,
    label: "Korisničko ime",
    align: "left",
  },
  {
    name: "role",
    field: "role",
    required: true,
    label: "Uloga",
    align: "left",
  },
];

const pagination = {
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 5,
};

import AdminService from "../../services/AdminService";
export default {
  data() {
    return {
      pagination,
      selected: [],
      columns,
      users: [],
      pagesNumber: computed(() => {
        return Math.ceil(this.users.length / pagination.rowsPerPage);
      }),
    };
  },
  created() {
    AdminService.getAllUsers().then((res) => {
      console.log(res.users);
      this.users = res.users;
    });
  },
};
</script>