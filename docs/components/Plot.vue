
<template>
  <div>
    <LLine
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />

  </div>
</template>

<script>
import { Line as LLine} from 'vue-chartjs'
import { Chart as ChartJS, Colors, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(
CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.defaults.borderColor = '#505050';
ChartJS.defaults.color = '#ffffff';

ChartJS.register(Colors);


export default {
  name: 'BarChart',
  components: { LLine },
  props: ['rawPlotData'],
  data() {
    const plotHeader = this.rawPlotData[0];
    const plotData = this.rawPlotData.slice(1);
    return {
      chartData: {
        labels: plotData.map(pd => Number(pd[0])),
        datasets: plotHeader.slice(1).map((ph, i) => ({
          data: plotData.map(pd => pd[i+1]),
          label: ph,
          borderDash: [i*4, i*4],
          pointRadius: 0,
          pointHitRadius: 20
        }))
      },
      chartOptions: {
        scales: {
            y: {
              title: {
                display: true,
                text: "Avg runtime in ms",
              }
            },
            x: {
              title: {
                display: true,
                text: "Path length",
              }
            }

         }
      }
    };
  },
}
</script>
