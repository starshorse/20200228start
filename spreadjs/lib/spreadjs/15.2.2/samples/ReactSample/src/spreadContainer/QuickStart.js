import React, {Component} from 'react';
import {SpreadSheets, Worksheet, Column} from '@grapecity/spread-sheets-react';
import './Style.css'
import dataService from '../dataService'

class QuickStart extends Component {

    constructor(props) {
        super(props);
        this.spreadBackColor = 'aliceblue';
        this.sheetName = 'Person Address';
        this.hostStyle = {
            top: '240px',
            bottom: '10px'
        };
        this.autoGenerateColumns = false;
        this.data = dataService.getPersonAddressData();
    }

    render() {
        return (
            <div className="componentContainer" style={this.props.style}>
                <h3>Quick Start</h3>
                <div>
                    Steps for getting started with the SpreadJS in React applications:
                    <div>
                        <p>1. Add reference files in your React application.</p>
                        <p>2. Add a component to provide data and logic.</p>
                        <p>3. Bind data and some other options of spread.</p>
                        <p>4. Add some css to customize appearance.</p>
                    </div>
                </div>
                <div className="spreadContainer" style={this.hostStyle}>
                    <SpreadSheets backColor={this.spreadBackColor}>
                        <Worksheet name={this.sheetName} dataSource={this.data}
                                   autoGenerateColumns={this.autoGenerateColumns}>
                            <Column width={150} dataField="Name"/>
                            <Column width={150} dataField="CountryRegionCode"/>
                            <Column width={100} dataField="City"/>
                            <Column width={200} dataField="AddressLine"/>
                            <Column width={100} dataField="PostalCode"/>
                        </Worksheet>
                    </SpreadSheets>
                </div>
            </div>

        )
    }
}

export default QuickStart