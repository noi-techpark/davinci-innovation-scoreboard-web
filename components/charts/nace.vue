<script>
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          tooltips: {
            callbacks: {
              label(tooltipItems, data) {
                const dataset = data.datasets[tooltipItems.datasetIndex]
                const value = dataset.data[tooltipItems.index]
                const label =
                  dataset.label === undefined
                    ? data.labels[tooltipItems.index]
                    : dataset.label[tooltipItems.index]

                return label + ': ' + value.toLocaleString('de-DE')
              }
            }
          }
        }
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
