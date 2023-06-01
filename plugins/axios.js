// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export default function({ $axios, app }) {
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)

    if ([401, 403].includes(code)) {
      app.$auth.logout()
    }

    return Promise.reject(error)
  })
}
