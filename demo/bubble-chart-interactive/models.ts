
export class Order {
    orderCode: string;
    orderId: number;
    customerName: string;
    orderItemCount: number;
    orderFinTotal: number;
    orderCompletionPercent: number;

    constructor(json: any) {
        this.orderCode = json.orderCode;
        this.orderId = json.orderId;
        this.customerName = json.customerName;
        this.orderItemCount = json.orderItemCount;
        this.orderFinTotal = json.orderFinTotal;
        this.orderCompletionPercent = json.orderCompletionPercent;
    }

    toChart() {
        // each order gets a different 'series' object
        // the name must be unique, or ngx-charts will lump the two into the same series
        return {
            name: `Order ${this.orderCode}`,
            series: [{
                name: `${this.customerName}`,
                x: this.orderFinTotal,
                y: this.orderItemCount,
                r: 0.95,
                //
                orderId: this.orderId,
                orderCode: this.orderCode,
            }]
        };
    }
}

export class Store {
    name: string;
    storeId: number;
    storeCode: string;
    orders: Order[];
    averageOrderFinTotal: number;
    averageOrderItemCount: number;
    averageOrderCompletionPercent: number;

    constructor(json: any) {
        this.name = json.name;
        this.storeId = json.storeId;
        this.storeCode = json.storeCode;
        this.orders = json.orders.map(o => new Order(o));
        // calc props
        this.processAggregateData();
    }

    processAggregateData() {
        let finTotal = 0;
        let itmTotal = 0;
        let completionTotal = 0;
        this.orders.forEach((o) => {
            finTotal += o.orderFinTotal;
            itmTotal += o.orderItemCount;
            completionTotal += o.orderCompletionPercent;
        });
        const orderCount = this.orders.length;
        this.averageOrderFinTotal = finTotal / orderCount;
        this.averageOrderItemCount = itmTotal / orderCount;
        this.averageOrderCompletionPercent = completionTotal / orderCount;
    }

    toChartAsStore() {
        return this.orders && this.orders.length > 0 ? this.orders.map(o => o.toChart()) : [];
    }

    toChartAsEnterprise() {
        // each store gets a different 'series' object
        // the name must be unique, or ngx-charts will lump the two into the same series
        return {
            name: `Store ${this.storeCode}`,
            series: [{
                name: this.name,
                x: this.averageOrderFinTotal,
                y: this.averageOrderItemCount,
                r: this.averageOrderCompletionPercent,
                children: this.orders.map(o => o.toChart()),
                //
                storeId: this.storeId,
                storeCode: this.storeCode,
            }]
        };
    }
}

export class Enterprise {
    name: string;
    clientId: number;
    stores: Store[];
    averageOrderFinTotal: number;
    averageOrderItemCount: number;
    averageOrderCompletionPercent: number;

    constructor(json: any) {
        this.name = json.name;
        this.clientId = json.clientId;
        this.stores = json.stores.map(s => new Store(s));
        // calc props
        this.processAggregateData();
    }

    processAggregateData() {
        let finTotal = 0;
        let itmTotal = 0;
        let completionTotal = 0;
        this.stores.forEach((s) => {
            finTotal += s.averageOrderFinTotal;
            itmTotal += s.averageOrderItemCount;
            completionTotal += s.averageOrderCompletionPercent;
        });
        const storeCount = this.stores.length;
        this.averageOrderFinTotal = finTotal / storeCount;
        this.averageOrderItemCount = itmTotal / storeCount;
        this.averageOrderCompletionPercent = completionTotal / storeCount;
    }

    toChart() {
        return this.stores.map(s => s.toChartAsEnterprise());
    }
}

export class BubbleChartInteractiveServerDataModel {

    enterprise: Enterprise;
    chartDrilldownPath: any[];

    constructor() {
        this.chartDrilldownPath = [];
    }

    // updates incoming from server
    setDataFromServer(json: any) {
        this.enterprise = new Enterprise(json.data);
    }

    // Chart data
    toChart() {
        return this.chartDrilldownPath.length > 0 ?
            this.toChartAsStore(this.chartDrilldownPath[0])
            : this.toChartAsEnterprise();
    }
    toChartAsEnterprise() {
        return this.enterprise.toChart();
    }
    toChartAsStore(storeJsonObj: any) {
        const store = this.enterprise.stores.find((s) => {
            return s.storeId === storeJsonObj.storeId;
        });
        return store && store.toChartAsStore();
    }

    // drilldown 
    getChartTitle() {
        const path = this.chartDrilldownPath;
        if (path.length > 0) {
            const current = path[0];
            return `${current.seriesName} (${current.bubbleName})`;
        }
        return 'Top Level';
    }
    getDrilldownDepth() {
        return this.chartDrilldownPath.length;
    }
    resetDrilldown() {
        this.chartDrilldownPath = [];
    }
    drilldown(event) {
        // console.log(event);
        let toExpand;
        const clickedBubble = event.bubble;
        const clickedSeries = event.series;
        if (clickedBubble) {
            toExpand = clickedBubble.children;
            if (toExpand && toExpand.length) {
                // console.log('found children', toExpand);
                this.chartDrilldownPath.push({
                    storeId: clickedBubble.storeId,
                    //
                    seriesName: clickedSeries.name,
                    bubbleName: clickedBubble.name,
                });
                return toExpand;
            }
        }
    }
}
