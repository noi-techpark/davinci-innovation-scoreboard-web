export default [
  {
    id: 'metric0',
    title: 'enterprises with innovation activities',
    description:
      'The enterprises with innovation activity are those enterprises that undertook activities for new or significantly improved products, processes, organisational methods or marketing methods.',
    source: 'ISTAT - Innovation in companies with at least 10 persons employed',
    decimalPlaces: 0,
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
      'The enterprises with product-process innovation activity are those enterprises that have introduced a product or process innovation during the reference period.',
    source: 'ISTAT - Innovation in companies with at least 10 persons employed',
    decimalPlaces: 0,
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
    description: null,
    source: 'ISTAT - Innovation in companies with at least 10 persons employed',
    decimalPlaces: 0,
    unit: '€',
    groups: []
  },
  {
    id: 'metric3',
    title: 'innovation expenditure per number of persons employed',
    description: null,
    source: 'ISTAT - Innovation in companies with at least 10 persons employed',
    decimalPlaces: 2,
    unit: '€',
    groups: []
  },
  {
    id: 'metric4',
    title: 'research and development personnel in-house',
    description: null,
    source: 'ISTAT - Research and development',
    decimalPlaces: 0,
    unit: '',
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
      },
      {
        id: 'PROFILO_PROF',
        name: 'type',
        values: {
          '60': 'researchers',
          others: 'others'
        }
      },
      {
        id: 'SEXISTAT1',
        name: 'gender',
        values: {
          '1': 'males',
          '2': 'females'
        }
      }
    ]
  },
  {
    id: 'metric5',
    title: 'domestic research and development expenditure in-house',
    description: null,
    source: 'ISTAT - Research and development',
    decimalPlaces: 0,
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
