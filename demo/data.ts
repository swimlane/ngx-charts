export let single = [
  {
    name: 'Germany',
    value: 46268
  },
  {
    name: 'USA',
    value: 53041
  },
  {
    name: 'France',
    value: 42503
  },
  {
    name: 'United Kingdom',
    value: 41787
  },
  {
    name: 'Spain',
    value: 29863
  },
  {
    name: 'Italy',
    value: 35925
  }
];

export let multi = [
  {
    name: 'Germany',
    series: [
      {
        name: '2010',
        value: 46268
      },
      {
        name: '2000',
        value: 23685
      },
      {
        name: '1990',
        value: 22219
      }
    ]
  },

  {
    name: 'USA',
    series: [
      {
        name: '2010',
        value: 48377
      },
      {
        name: '2000',
        value: 36449
      },
      {
        name: '1990',
        value: 23954
      }
    ]
  },

  {
    name: 'France',
    series: [
      {
        name: '2010',
        value: 42503
      },
      {
        name: '2000',
        value: 22466
      },
      {
        name: '1990',
        value: 21833
      }
    ]
  },

  {
    name: 'United Kingdom',
    series: [
      {
        name: '2010',
        value: 38363
      },
      {
        name: '2000',
        value: 26296
      },
      {
        name: '1990',
        value: 18632
      }
    ]
  }
];

export let countries = [
  'Abkhazia', 'Afghanistan', 'Akrotiri and Dhekelia', 'Aland', 'Albania',
  'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla',
  'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Ascension Island',
  'Australia', 'Austria', 'Azerbaijan', 'Bahamas, The', 'Bahrain', 'Bangladesh',
  'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan',
  'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei',
  'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada',
  'Cape Verde', 'Cayman Islands', 'Central Africa Republic', 'Chad', 'Chile',
  'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros',
  'Congo', 'Cook Islands', 'Costa Rica', 'Cote d\'lvoire', 'Croatia', 'Cuba',
  'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica',
  'Dominican Republic', 'East Timor Ecuador', 'Egypt', 'El Salvador',
  'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands',
  'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'Gabon',
  'Cambia, The', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece',
  'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guemsey', 'Guinea',
  'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary',
  'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man',
  'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan',
  'Kenya', 'Kiribati', 'Korea, N', 'Korea, S', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
  'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein',
  'Lithuania', 'Luxembourg', 'Macao', 'Macedonia', 'Madagascar', 'Malawi',
  'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania',
  'Mauritius', 'Mayotte', 'Mexico', 'Micronesia', 'Moldova', 'Monaco',
  'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar',
  'Nagorno-Karabakh', 'Namibia', 'Nauru', 'Nepal', 'Netherlands',
  'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger',
  'Nigeria', 'Niue', 'Norfolk Island', 'Northern Cyprus',
  'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau',
  'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
  'Pitcaim Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Romania',
  'Russia', 'Rwanda', 'Sahrawi Arab Democratic Republic', 'Saint-Barthelemy',
  'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin',
  'Saint Pierre and Miquelon', 'Saint Vincent and Grenadines', 'Samos',
  'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia',
  'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia',
  'Solomon Islands', 'Somalia', 'Somaliland', 'South Africa', 'South Ossetia',
  'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard', 'Swaziland', 'Sweden',
  'Switzerland', 'Syria', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo',
  'Tokelau', 'Tonga', 'Transnistria', 'Trinidad and Tobago', 'Tristan da Cunha',
  'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom',
  'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City',
  'Venezuela', 'Vietnam', 'Virgin Islands, British', 'Virgin Islands, U.S.',
  'Wallis and Futuna', 'Yemen', 'Zambia', 'Zimbabwe'
];

export function generateGraph(nodeCount: number) {
  const nodes = [];
  const links = [];
  for (let i = 0; i < nodeCount; i++) {
    const country = countries[Math.floor(Math.random() * countries.length)];
    nodes.push({
      value: country,
    });
    for (let j = 0; j < nodes.length - 1; j++) {
      if (Math.random() < 0.03) {
        links.push({
          source: country,
          target: nodes[j].value,
        });
      }
    }
  }
  return { links, nodes };
}

export function generateData(seriesLength: number, includeMinMaxRange: boolean): any[] {
  const results = [];

  const domain: Date[] = []; // array of time stamps in milliseconds

  for (let j = 0; j < 5; j++) {
    // random dates between Sep 12, 2016 and Sep 24, 2016
    domain.push(new Date(Math.floor(1473700105009 +  Math.random() * 1000000000)));
  }

  for (let i = 0; i < seriesLength; i++) {
    const country = countries[Math.floor(Math.random() * countries.length)];
    const series = {
      name: country,
      series: []
    };

    for (let j = 0; j < domain.length; j++) {
      const value = Math.floor(2000 + Math.random() * 5000);
      // let timestamp = Math.floor(1473700105009 + Math.random() * 1000000000);
      const timestamp = domain[j];
      if (includeMinMaxRange) {
        const errorMargin = 0.02 + Math.random() * 0.08;

        series.series.push({
          value,
          name: timestamp,
          min: Math.floor(value * (1 - errorMargin)),
          max: Math.ceil(value * (1 + errorMargin))
        });
    } else {
        series.series.push({
          value,
          name: timestamp
        });
      }
    }

    results.push(series);
  }
  return results;
}
