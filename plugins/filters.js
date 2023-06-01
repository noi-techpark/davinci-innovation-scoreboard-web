// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', (value) => {
  if (!value) return ''

  return moment(String(value)).format('DD/MM/YYYY HH:mm')
})

Vue.filter('formatUnix', (value) => {
  if (!value) return ''

  return moment(String(value)).valueOf()
})
