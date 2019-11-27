import React from 'react';
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChart extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        const options = {
			theme: "light2",
			animationEnabled: true,
			width: 750,
			height: 280,
			zoomEnabled: true,
			zoomType:"xy",
			axisX: {
				stripLines:[
					{
						startValue:new Date("09/26/2019"),
						endValue:new Date("11/15/2020"),
						lineDashType : "longDashDot",
						color:"#ececec",
						labelFontColor: "#a8a8a8",
						labelFontSize: 12
					}
					,{
						value: new Date("09/26/2019"),
						lineDashType : "longDashDot",
						color:"#a8a8a8",
						label : "26/09/2019",
						labelFontColor: "#a8a8a8",
						labelFontSize: 12
					}
				],
				type: "datetime",
				valueFormatString: "MMM YYYY",
				interval:1,
				intervalType: "year",
				labelFontSize: 12
				
			},
			axisY: {
				titleFontColor: "#858796",
				lineColor: "#858796",
				labelFontSize: 12,
				labelFontColor: "#858796",
				tickColor: "#858796",
				includeZero: true,
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [
			{	
				type: "splineArea", 
				name: "NDVI", 
				color: "#71a510",
				showInLegend: false, 
                dataPoints: this.props.dataNDVI
			},
			{	
				type: "splineArea", 
				name: "NDVI", 
				color: "#71a510",
				showInLegend: false, 
                dataPoints: this.props.dataNDVIPredict
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

export default LineChart;
