import React, {Component} from 'react';

class InfoTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            data:[]
        }
    }
    render(){
        console.log(this.props.data)
        return(
            <div className="info-table">
                <div className="info-cell">
                    <p>Country <h6><strong>{this.props.data[0][0]}</strong></h6> </p>  
                </div>
                {/* <hr/> */}
                <div className="info-cell">
                    <p>State<h6><strong>{this.props.data[0][1]}</strong></h6> </p>
                    
                </div>
                {/* <hr/> */}
                <div className="info-cell">
                    <p>Town<h6><strong>{this.props.data[0][2]}</strong></h6></p>
                    
                </div>
                {/* <hr/> */}
                <div className="info-cell">
                    <p>Postcode<h6><strong>{this.props.data[0][3]}</strong></h6></p>
                    
                </div>
                <div className="info-cell">
                    <p>Mill<h6><strong>{this.props.data[0][4]}</strong></h6></p>
                    
                </div>
                <div className="info-cell">
                    <p>Company<h6><strong>{this.props.data[0][5]}</strong></h6></p>
                </div>   
                <div className="info-cell">
                    <p>Area (ha)<h6><strong>{this.props.data[0][7].toFixed(1)}</strong></h6></p>
                </div> 
{/*                 
                <div className="info-cell">
                    <p>Latitude<h6><strong>{this.props.data[0][8]}</strong></h6></p>
                    
                </div>
                <div className="info-cell">
                    <p>Longitude<h6><strong>{this.props.data[0][9]}</strong></h6></p>
                    
                </div> 
                <div className="info-cell">
                    <p>Crop<h6><strong>{"Sugarcane"}</strong></h6></p>
                </div>     */}
            </div>
        );
    }
}

export default InfoTable;
