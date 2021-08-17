<template>
  <div>
    <div v-if="noOfDataEntered > 2">
      <canvas id="mood-chart"></canvas>
    </div>
    <h3 v-if="noOfDataEntered < 2">
      Nedovoljno podataka za prikaz grafa raspoloženja
    </h3>
  </div>
</template>

<script>
import Chart from "chart.js";
import MoodChart from "../../services/chart-data/MoodChartData";

export default {
  name: "MoodChart",
  props: ["userId"],
  data() {
    return {
      noOfDataEntered: 0,
    };
  },
  async mounted() {
    const data = await MoodChart(this.$props.userId);

    const ctx = document.getElementById("mood-chart");

    this.noOfDataEntered = data.data.datasets[0].data.length;

    if (this.noOfDataEntered > 2) {
      new Chart(ctx, data);
    }
  },
  created() {},
};
</script>