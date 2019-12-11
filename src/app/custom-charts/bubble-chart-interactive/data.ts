const bubbleDemoDataFromServer1 = {
  data: {
    name: "Papa's",
    clientId: 102,
    stores: [
      {
        name: 'Mamma Jamma',
        storeId: 69,
        storeCode: '420',
        orders: [
          {
            orderCode: '12345',
            orderId: 54321,
            customerName: 'Fred Flintstone',
            orderItemCount: 10,
            orderFinTotal: 101.5,
            orderCompletionPercent: 0.9
          },
          {
            orderCode: '67890',
            orderId: 9876,
            customerName: 'Pooh Bear',
            orderItemCount: 99,
            orderFinTotal: 1010.5,
            orderCompletionPercent: 0.3
          }
        ]
      },
      {
        name: 'Mamma Joe',
        storeId: 79,
        storeCode: '430',
        orders: [
          {
            orderCode: '23356',
            orderId: 65432,
            customerName: 'Mean One',
            orderItemCount: 1,
            orderFinTotal: 7.5,
            orderCompletionPercent: 0.6
          },
          {
            orderCode: '23456',
            orderId: 65431,
            customerName: 'Hey You',
            orderItemCount: 12,
            orderFinTotal: 104.5,
            orderCompletionPercent: 0.1
          }
        ]
      }
    ]
  }
};

const bubbleDemoDataFromServer2 = {
  data: {
    name: "Papa's",
    clientId: 102,
    stores: [
      {
        name: 'Mamma Jamma',
        storeId: 69,
        storeCode: '420',
        orders: [
          {
            orderCode: '12345',
            orderId: 54321,
            customerName: 'Fred Flintstone',
            orderItemCount: 35,
            orderFinTotal: 101.5,
            orderCompletionPercent: 1
          },
          {
            orderCode: '67890',
            orderId: 9876,
            customerName: 'Pooh Bear',
            orderItemCount: 56,
            orderFinTotal: 30.5,
            orderCompletionPercent: 0.7
          }
        ]
      },
      {
        name: 'Mamma Joe',
        storeId: 79,
        storeCode: '430',
        orders: [
          {
            orderCode: '23356',
            orderId: 65432,
            customerName: 'Mean One',
            orderItemCount: 100,
            orderFinTotal: 7.5,
            orderCompletionPercent: 0.9
          },
          {
            orderCode: '23456',
            orderId: 65431,
            customerName: 'Hey You',
            orderItemCount: 12,
            orderFinTotal: 1004.5,
            orderCompletionPercent: 0.3
          }
        ]
      }
    ]
  }
};

export const bubbleDemoData = [bubbleDemoDataFromServer1, bubbleDemoDataFromServer2];
