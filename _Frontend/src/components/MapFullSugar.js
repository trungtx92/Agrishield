import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow, Polygon} from 'google-maps-react';
class MapFullSugar extends Component {
    constructor(props){
        super(props);
        this.state = {
            zoomValue: 10,
            data:[],
            dataGeojson: {features:[]}
        }
    }
    componentDidMount(){
        var dataFromFile = JSON.parse(this.readTextFile("resources/geojson/data-writer.geojson"))
        this.setState({dataGeojson: dataFromFile});
        // console.log(new Date("03/25/2015"));
    }
    readTextFile = file => {
        var rawFile = new XMLHttpRequest();
        var allText;
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = () => {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    allText = rawFile.responseText;
                    this.setState({
                        fundData: allText
                    });
                }
            }
        };
        rawFile.send(null);
        return allText;
      };
    render(){
        const mapStyles = {
            width: '100%',
            height: '160%'
          };
        return(
            <div>
            <Map
                google={this.props.google}
                zoom={this.props.zoom}
                style={mapStyles}
                initialCenter={{lat: -20.41821, lng: 148.58729}}
            >
            {
            this.state.dataGeojson.features.map(feature=>{
                var polygon = []
                for(var i = 0; i < feature.geometry.coordinates[0][0].length; i ++){
                    polygon.push({lat: feature.geometry.coordinates[0][0][i][1], lng: feature.geometry.coordinates[0][0][i][0]})
                    }
                    
                    return(
                        <Polygon
                        paths={polygon}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={0.1}
                        fillColor="#009b27"
                        fillOpacity={'100%'}
                        />
                    )
                })
            }
            <Polygon
                paths={this.props.dataField}
                strokeColor="#0000FF"
                strokeOpacity={0.8}
                strokeWeight={0.1}
                fillColor="rgb(240, 100, 0)"
                fillOpacity={'100%'}
            />
            </Map>
            </div>
        );
    }
    
}
export default GoogleApiWrapper({
    apiKey: 'YOUR_KEY',
}) (MapFullSugar);