class Chart {
    constructor(title="Chart") {
        this.title = title;
        this.dataPoints = [];
    }

    addDataPoint(x, y) {
        this.dataPoints.push({x: x, y: y});
    }

    renderChart() {
        var chart = new CanvasJS.Chart("chartContainer",
            {
                title:{
                    text: this.title
                },
                axisX: {
                    interval:1,
                    minimum: 1,
                    gridColor: "white",
                },
                axisY: {
                    gridColor: "white",
                },
                data: [
                    {
                        type: "line",
                        dataPoints: this.dataPoints,
                    }
                ]
            }
        );

        chart.render();
    }



}