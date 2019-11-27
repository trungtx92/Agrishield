import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow, Polygon} from 'google-maps-react';
class MapContainer extends Component {
    constructor(props){
        super(props);
        this.props.data.mapArray = [];
        this.state = {
            data:[],
            showingInfoWindow: false,
            activeMarker:{},
            selectedPlace:{},
            stores:[
                {lat: 47.49855629475769, lng: -122.14184416996333},
                {latitude: 47.359423, longitude: -122.021071},
                {latitude: 47.2052192687988, longitude: -121.988426208496},
                {latitude: 47.6307081, longitude: -122.1434325},
                {latitude: 47.3084488, longitude: -122.2140121},
                {latitude: 47.5524695, longitude: -122.0425407}
            ]
        }
    }

    displayMarkers = () => {
        return this.state.stores.map((store, index) => {
          return <Marker key={index} id={index} position={{
           lat: store.latitude,
           lng: store.longitude
         }}
         onClick={this.onMarkerClick} 
         name={'Kenyatta International Convention Centre'}
         />
        })
    }
    
    onMarkerClick = (props, marker, e) => this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });

    onClose = props => {
        if(this.state.showingInfoWindow){
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render(){
        const mapStyles = {
          };
        return(
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{lat: -20.41821, lng: 148.58729}}
            >
                {this.displayMarkers()}
                <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}>
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
                {
                this.props.data.mapArray.map(pixel => {
                    var color = "";
                    var polygon = [
                        {lat: pixel[0], lng: pixel[2]},
                        {lat: pixel[0], lng: pixel[3]},
                        {lat: pixel[1], lng: pixel[3]},
                        {lat: pixel[1], lng: pixel[2]}
                    ]
                    if(pixel[5] == 1){
                        if(pixel[4] <= 0.5){
                            color = "#c49806";
                        } else {
                            color = "#B9DB3C";
                        }
                        
                    }
                    else {
                        
                        color = "#71a510";
                    }
                    // console.log(polygon)
                    return(
                        <Polygon
                        paths={polygon}
                        strokeColor={color}
                        strokeOpacity={0.8}
                        strokeWeight={2}
                        fillColor={color}
                        fillOpacity={0.8}
                        />
                    )
                    
                })
                }
            </Map>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyA9lUd1tq4AUd-T_rD8x5kL6QjW8wXaAXM',
}) (MapContainer);