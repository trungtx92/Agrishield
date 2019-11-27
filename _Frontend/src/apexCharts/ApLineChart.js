import React from 'react';
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ApLineChart extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        const options = {
			theme: "light2",
			animationEnabled: true,
			width:750,
			height: 280,
			zoomEnabled: true,
			zoomType:"xy",
			axisX: {
				type: "datetime",
				valueFormatString: "MMM YYYY",
				interval:1,
				intervalType: "year",
				labelFontSize: 12
				
			},
			axisY: {
				title: "Rainfall",
				labelFontSize: 12,
				titleFontColor: "#1d9acb",
				lineColor: "#1d9acb",
				labelFontColor: "#1d9acb",
				tickColor: "#1d9acb",
				includeZero: false
			},
			axisY2: {
				title: "Temprature",
				labelFontSize: 12,
				titleFontColor: "#FD5602",
				lineColor: "#FD5602",
				labelFontColor: "#FD5602",
				tickColor: "#FD5602",
				includeZero: false
			},
			toolTip: {
				shared: true
			},
			data: [
				{type: "line", 
				name: "Rainfall", 
				lineColor:"#1d9acb",
				showInLegend: false, 
				yValueFormatString: "### mm",
                dataPoints: this.props.dataRainfall
			},
			{
				type: "line",
				name: "Temperature",
				lineColor: "#FD5602",
				axisYType: "secondary",
				showInLegend: false,
				xValueFormatString: "DD MM YYYY",
				yValueFormatString: "### °C",
				dataPoints: this.props.dataTemp
			}
			]
		}
      return (
        <div>
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>
		</div>


      );
    }
  }

export default ApLineChart;
