import React, {Component} from 'react';
import {SpreadSheets, Worksheet, Column} from '@grapecity/spread-sheets-react';
import './Style.css'
import dataService from '../dataService'

class OutlineCon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showRowOutline: true,
            showColumnOutline: true
        };
        this.hostStyle = {
            top: '90px',
            bottom: '35px'
        };
        this.rowOutlineInfo = [{index: 1, count: 4}, {index: 6, count: 4}];
        this.columnOutlineInfo = [{index: 0, count: 4}];
        this.autoGenerateColumns = false;
        this.data = dataService.getPersonAddressData();
    }

    changeProps(props, value) {
        let state = {};
        state[props] = value;
        this.setState(state);
    }

    render() {
        return (
            <div className="componentContainer" style={this.props.style}>
                <h3>Outline</h3>
                <div>
                    <p>The sample below shows how to use Outline.</p>
                </div>
                <div className="spreadContainer" style={this.hostStyle}>
                    <SpreadSheets>
                        <Worksheet
                            showRowOutline = {this.state.showRowOutline}
                            showColumnOutline = {this.state.showColumnOutline}
                            rowOutlineInfo = {this.rowOutlineInfo}
                            columnOutlineInfo = {this.columnOutlineInfo}
                            dataSource={this.data}
                            autoGenerateColumns={this.autoGenerateColumns}>
                            <Column width={150} dataField="Name"/>
                            <Column width={150} dataField="CountryRegionCode"/>
                            <Column width={100} dataField="City"/>
                            <Column width={200} dataField="AddressLine"/>
                            <Column width={100} dataField="PostalCode"/>
                        </Worksheet>
                    </SpreadSheets>
                </div>
                <div className="settingContainer">
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <label><input type="checkbox" checked={this.state.showRowOutline} onChange={(e) => {this.changeProps('showRowOutline', e.target.checked)}}/>showRowOutline</label>
                            </td>
                            <td>
                                <label><input type="checkbox" checked={this.state.showColumnOutline} onChange={(e) => {this.changeProps('showColumnOutline', e.target.checked)}}/>showColumnOutline</label>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}

export default OutlineCon