<template>
  <div>
    <div>
      <div class="flex justify-between items-center">
        <div class="font-bold text-xl uppercase">
          {{ metric.title }} in Italy
        </div>

        <SelectYear
          :years="years"
          :selected-year="selectedYear"
          :select-year="selectYear"
          class="my-1 flex items-center"
        />
      </div>
    </div>
    <div class="mt-3 pb-2 flex flex-row">
      <div class="flex-1 flex flex-col">
        <div>
          <SelectableButton
            v-for="group in nace"
            :key="group.id"
            :text="group.name"
            :value="group.id"
            :selected-value="markedGroupId"
            :selected-color="metric.id"
            :click="markGroup"
            class="my-1 mr-3"
          />
        </div>
        <div v-if="hasMarkedGroup" class="mt-3 flex flex-wrap justify-between">
          <div
            v-for="subgroup in subgroupsOfMarkedGroupWithValues"
            :key="subgroup.id"
            class="my-3 mr-3 w-1/4"
          >
            <button
              class="text-left"
              :class="subgroup.class"
              @click="markSubgroup(subgroup.id)"
            >
              {{ subgroup.name }}
            </button>
            <br />
            <span class="font-bold" :class="'text-' + metric.id + '-500'">{{
              subgroup.value
            }}</span>
          </div>
        </div>
      </div>

      <NaceChart :chart-data="data" class="flex-1" />
    </div>
  </div>
</template>

<script>
import SelectableButton from '@/components/selectable-button.vue'
import SelectYear from '@/components/select-year.vue'
import NaceChart from '@/components/charts/nace.vue'

import {
  DATASET_COLOR_PIE_NORMAL,
  DATASET_COLOR_METRICS,
  hslToColor
} from '@/components/charts/config'

export default {
  components: {
    SelectableButton,
    SelectYear,
    NaceChart
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    metric: {
      type: Object,
      required: true
    },
    selectedYear: {
      type: String,
      required: true
    },
    selectYear: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      markedGroupId: null,
      markedSubgroupId: null
    }
  },
  computed: {
    nace() {
      return this.$store.state.metrics.nace
    },
    years() {
      return this.$store.getters['metrics/getYears'](this.index)
    },
    hasMarkedGroup() {
      return this.markedGroupId !== null
    },
    hasMarkedSubgroup() {
      return this.markedSubgroupId !== null
    },
    markedGroup() {
      if (!this.hasMarkedGroup) {
        return null
      }

      return this.nace.find((group) => {
        return this.isGroupMarked(group.id)
      })
    },
    markedSubgroup() {
      if (!this.hasMarkedSubgroup) {
        return null
      }

      return this.markedGroupId.subgroups((subgroup) => {
        return this.isSubgroupMarked(subgroup.id)
      })
    },

    dataFromSelectedYear() {
      const data = this.$store.getters['metrics/getDataByNace'](this.index)

      return data.IT.find((year) => {
        return year.year === this.selectedYear
      }).groups.find((g) => {
        return g.id === 'ATECO_2007'
      }).values
    },
    subgroupsOfMarkedGroupWithValues() {
      if (!this.hasMarkedGroup) {
        return null
      }

      return this.markedGroup.subgroups.map((subgroup) => {
        let value = 'NO DATA'

        if (subgroup.id in this.dataFromSelectedYear) {
          value =
            this.dataFromSelectedYear[subgroup.id].toLocaleString('de-DE') +
            ' ' +
            this.metric.unit
        }

        return {
          id: subgroup.id,
          name: subgroup.name,
          value,
          class:
            this.markedSubgroupId === subgroup.id
              ? 'text-' +
                this.metric.id +
                '-500 hover:text-' +
                this.metric.id +
                '-500'
              : 'text-black-500 hover:text-' + this.metric.id + '-500'
        }
      })
    },
    data() {
      const data = this.dataFromSelectedYear

      const metricColor = DATASET_COLOR_METRICS[this.metric.id]

      const normalColor = hslToColor(
        DATASET_COLOR_PIE_NORMAL.hue,
        DATASET_COLOR_PIE_NORMAL.sat,
        DATASET_COLOR_PIE_NORMAL.light
      )
      const transparentColor = 'transparent'
      const markedColor = hslToColor(
        metricColor.hue,
        metricColor.sat,
        metricColor.light
      )
      const hoverColor = markedColor

      const dataset1 = {
        data: [],
        label: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
        hoverBorderColor: transparentColor
      }
      const dataset2 = {
        data: [],
        label: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
        hoverBorderColor: transparentColor
      }

      this.nace.forEach((group) => {
        dataset1.data.push(data[group.id])
        dataset1.label.push(group.name.toUpperCase())

        dataset1.backgroundColor.push(
          this.markedGroupId === group.id ? markedColor : normalColor
        )
        dataset1.hoverBackgroundColor.push(hoverColor)

        group.subgroups.forEach((subgroup) => {
          dataset2.data.push(data[subgroup.id])
          dataset2.label.push(subgroup.name.toUpperCase())

          if (this.markedSubgroupId === subgroup.id) {
            dataset2.backgroundColor.push(markedColor)
            dataset2.hoverBackgroundColor.push(hoverColor)
          } else if (this.markedGroupId === group.id) {
            dataset2.backgroundColor.push(normalColor)
            dataset2.hoverBackgroundColor.push(hoverColor)
          } else {
            dataset2.backgroundColor.push(transparentColor)
            dataset2.hoverBackgroundColor.push(transparentColor)
          }
        })
      })

      return {
        datasets: [dataset1, dataset2]
      }
    }
  },
  methods: {
    isGroupMarked(groupId) {
      return this.markedGroupId === groupId
    },
    isSubgroupMarked(subgroupId) {
      return this.markedSubgroupId === subgroupId
    },
    markGroup(groupId) {
      if (this.isGroupMarked(groupId)) {
        this.markedGroupId = null
        this.markedSubgroupId = null
      } else {
        this.markedGroupId = groupId
        this.markedSubgroupId = null
      }
    },
    markSubgroup(subgroupId) {
      if (this.isSubgroupMarked(subgroupId)) {
        this.markedSubgroupId = null
      } else {
        this.markedSubgroupId = subgroupId
      }
    }
  }
}
</script>
