<template>
  <section class="charts">
    <div class="select">
      <select v-model="setDays">
        <option disabled value>Choose one</option>
        <option value="7">Last week</option>
        <option value="30">Last month</option>
        <option value="90">Last quarter</option>
        <option value="182">Half year</option>
        <option value="365">Last year</option>
      </select>
    </div>
    <apexChart width="100%" height="350" type="bar" :options="chartOptions" :series="series"></apexChart>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import VueApexCharts from "vue-apexcharts";
import { filterClientsByTime } from "../../../shared/helpers";
export default {
  name: "Charts",
  props: ["clients"],
  components: { apexChart: VueApexCharts },
  data() {
    return {
      setDays: 7
    };
  },
  computed: {
    ...mapGetters(["clientData", "appSettings"]),
    series() {
      return [
        {
          data: filterClientsByTime(this.clients, this.setDays),
          name: `total value ${this.appSettings.currencyCode}`
        }
      ];
    },
    changeTimeRange() {
      return {
        type: "datetime",
        min: new Date().setDate(new Date().getDate() - this.setDays)
      };
    },
    chartOptions() {
      return {
        chart: {
          id: "area-datetime",
          type: "bar",
          height: 350,
          zoom: {
            type: "x",
            autoScaleYaxis: true
          }
        },
        annotations: {
          xaxis: [
            {
              x: new Date().getTime(),
              borderColor: "#999",
              yAxisIndex: 0,
              label: {
                show: true,
                text: "Today",
                style: {
                  color: "#fff",
                  background: "#775DD0"
                }
              }
            }
          ]
        },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"]
          }
        },
        markers: {
          size: 0,
          style: "hollow"
        },
        xaxis: this.changeTimeRange,
        title: {
          text: "Clients chart",
          align: "left",
          margin: 10,
          offsetX: 20,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            fontFamily: "Baloo Thambi 2",
            color: "darkblue"
          }
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy"
          }
        },
        plotOptions: {
          bar: {
            columnWidth: "20%",
            rangeBarOverlap: true,
            dataLabels: {
              position: "top"
            }
          }
        },
        fill: {
          type: "solid",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.charts {
  max-width: 900px;
  margin: auto;
}
.select {
  text-align: center;
  margin-bottom: 15px;
  select {
    font-family: $openSans;
    padding: 6px;
  }
}
button {
  @include primary-btn;
  font-size: 14px;
  padding: 3px 8px;
  margin: 5px;
}
</style>
