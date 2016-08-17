export var pieData = {
  "d0Domain": [
    "complete",
    "not complete"
  ],
  "series": [
    {
      total: function(){
        return 3;
      },
      array: [
        {
          "vals": [
            {
              "label": [
                [
                  "complete"
                ],
                "complete"
              ],
              "value": 1,
              "formattedLabel": [
                'complete'
              ]
            }
          ]
        },
        {
          "vals": [
            {
              "label": [
                [
                  "not complete"
                ],
                "not complete"
              ],
              "value": 2,
              "formattedLabel": [
                "not complete"
              ]
            }
          ]
        }
      ]
    }
  ]
};

export var barData = {
  "d0Domain": [
    "complete",
    "not complete"
  ],
  "m0Domain": [-1, 2],
  "series": [
    {
      array: [
        {
          "vals": [
            {
              "label": [
                [
                  "complete"
                ],
                "complete"
              ],
              "value": -1,
              "formattedLabel": [
                'complete'
              ]
            }
          ]
        },
        {
          "vals": [
            {
              "label": [
                [
                  "not complete"
                ],
                "not complete"
              ],
              "value": 2,
              "formattedLabel": [
                "not complete"
              ]
            }
          ]
        }
      ]
    }]
};

export var lineData = {
  series: [{
    array: [],
    name: '',
    maxValue: 0
  }],
  d0Domain: ['app 1', 'app 2', 'app 3'],
  d1Domain: ['app 1', 'app 2', 'app 3'],
  m0Domain: [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]
};

['app 1', 'app 2', 'app 3'].map((app) => {
  let val = Math.random() * 100;
  lineData.series[0].array.push({
    vals: [
      {
        label: [[app, app], app],
        formattedLabel: [app],
        value: val
      }
    ],
    maxValue: 100
  });
  lineData.series[0].name = app;
  lineData.series[0].maxValue = 100;

  lineData.d0Domain.push(app);
  lineData.m0Domain = [Math.min(val, lineData.m0Domain[0]), Math.max(val, lineData.m0Domain[1])];
});
