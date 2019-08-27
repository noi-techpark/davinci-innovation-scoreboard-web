export default [
  {
    id: 'metric0',
    title: 'enterprises with innovation activities',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    source: 'ISTAT - Innovation in companies with at least 10 persons employed',
    unit: '',
    groups: [
      {
        id: 'FORMA_INNOVAZ',
        name: 'type of innovation',
        values: {
          PTCON: 'product and/or process innovation activities (only)',
          OMKON: 'organisation and/or marketing innovations (only)',
          PTCOMK:
            'product/process innovation activities and  organisation/marketing innovations'
        }
      }
    ]
  },
  {
    id: 'metric1',
    title: 'enterprises that have introduced product o process innovations',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    source: 'ISTAT - Innovation in companies with at least 10 persons employed',
    unit: '',
    groups: [
      {
        id: 'FORMA_INNOVAZ',
        name: 'type of innovation',
        values: {
          PTON: 'product innovative enterprises  (only)',
          PCON: 'process innovative enterprises  (only)',
          PCPT: 'product and process innovative enterprises',
          DEV_EN: 'Innovations developed by themselves',
          DEV_CO:
            'Innovations developed together with other enterprises or institutions',
          DEV_AD:
            'Innovations developed by adapting or modifying goods or services originally devoloped by others',
          DEV_OT: 'Innovations developed by others'
        }
      }
    ]
  },
  {
    id: 'metric2',
    title: 'innovation expenditure',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    source: 'ISTAT - Innovation in companies with at least 10 persons employed',
    unit: '€',
    groups: []
  },
  {
    id: 'metric3',
    title: 'innovation expenditure per number of persons',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    source: 'ISTAT - Innovation in companies with at least 10 persons employed',
    unit: '€',
    groups: []
  },
  {
    id: 'metric4',
    title: 'research and development personnel in-house',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    source: 'ISTAT - Research and development',
    unit: '',
    groups: []
  },
  {
    id: 'metric5',
    title: 'domestic research and development expenditure in-house',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    source: 'ISTAT - Research and development',
    unit: '€',
    groups: [
      {
        id: 'SETTISTSEC2010',
        name: 'institution',
        values: {
          S20: 'business enterprise sector (excluding private universities)',
          S16: 'public institutions (excluding public universities)',
          S22: 'higher education sector (public and private)',
          S19: 'private non-profit sector'
        }
      }
    ]
  }
]
