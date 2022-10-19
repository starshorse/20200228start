import React, {Component} from 'react';
import {SpreadSheets, Worksheet, Column} from '@grapecity/spread-sheets-react';
import './Style.css'
import dataService from '../dataService'

class WorkSheetCon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rowHeaderVisible: true,
            columnHeaderVisible: true,
            frozenRowCount: 3,
            frozenColumnCount: 2,
            frozenTrailingRowCount: 0,
            frozenTrailingColumnCount: 0,
            sheetTabColor: '#61E6E6',
            forzenlineColor: '#000000',
            selectionBackColor: '#D0D0D0',
            selectionBorderColor: '#217346'
        };
        this.hostStyle = {
            top: '90px',
            bottom: '172px'
        };
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
                <h3>GC-Worksheet</h3>
                <div>
                    <p>The sample below shows how to bind some properties of sheet.</p>
                </div>
                <div className="spreadContainer" style={this.hostStyle}>
                    <SpreadSheets>
                        <Worksheet rowCount={this.state.rowCount} colCount={this.state.colCount}
                                   frozenRowCount={this.state.frozenRowCount}
                                   frozenColumnCount={this.state.frozenColumnCount}
                                   rowHeaderVisible={this.state.rowHeaderVisible}
                                   columnHeaderVisible={this.state.columnHeaderVisible}
                                   frozenTrailingRowCount={this.state.frozenTrailingRowCount}
                                   frozenTrailingColumnCount={this.state.frozenTrailingColumnCount}
                                   sheetTabColor={this.state.sheetTabColor} frozenlineColor={this.state.frozenlineColor}
                                   selectionBackColor={this.state.selectionBackColor}
                                   selectionBorderColor={this.state.selectionBorderColor}
                                   dataSource={this.data} autoGenerateColumns={this.autoGenerateColumns}>
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
                                <label><input type="checkbox" checked={this.state.rowHeaderVisible} onChange={(e) => {this.changeProps('rowHeaderVisible', e.target.checked)}}/>rowHeaderVisible</label>
                            </td>
                            <td>
                                <label><input type="checkbox" checked={this.state.columnHeaderVisible} onChange={(e) => {this.changeProps('columnHeaderVisible', e.target.checked)}}/>columnHeaderVisible</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label><input type="text" value={this.state.frozenRowCount} onChange={(e) => {this.changeProps('frozenRowCount', e.target.value)}}/>frozenRowCount</label>
                            </td>
                            <td>
                                <label><input type="text" value={this.state.frozenColumnCount} onChange={(e) => {this.changeProps('frozenColumnCount', e.target.value)}}/>frozenColumnCount</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label><input type="text" value={this.state.frozenTrailingRowCount} onChange={(e) => {this.changeProps('frozenTrailingRowCount', e.target.value)}}/>frozenTrailingRowCount</label>
                            </td>
                            <td>
                                <label><input type="text" value={this.state.frozenTrailingColumnCount} onChange={(e) => {this.changeProps('frozenTrailingColumnCount', e.target.value)}}/>frozenTrailingColumnCount</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input value={this.state.sheetTabColor} type="color" onChange={(e) => {this.changeProps('sheetTabColor', e.target.value)}}/> sheetTabColor
                            </td>
                            <td>
                                <input value={this.state.frozenlineColor} type="color" onChange={(e) => {this.changeProps('frozenlineColor', e.target.value)}}/> frozenlineColor
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input value={this.state.selectionBackColor} type="color" onChange={(e) => {this.changeProps('selectionBackColor', e.target.value)}}/> selectionBackColor
                            </td>
                            <td>
                                <input value={this.state.selectionBorderColor} type="color" onChange={(e) => {this.changeProps('selectionBorderColor', e.target.value)}}/> selectionBorderColor
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>

        )
    }
}

export default WorkSheetCon