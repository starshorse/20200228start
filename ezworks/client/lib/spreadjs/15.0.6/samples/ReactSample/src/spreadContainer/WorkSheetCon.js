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
                    <p>아래 샘플은 시트의 일부 속성을 바인딩하는 방법을 보여줍니다.</p>
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
                                <label><input type="checkbox" checked={this.state.rowHeaderVisible} onChange={(e) => {this.changeProps('rowHeaderVisible', e.target.checked)}}/>행 머리글 표시</label>
                            </td>
                            <td>
                                <label><input type="checkbox" checked={this.state.columnHeaderVisible} onChange={(e) => {this.changeProps('columnHeaderVisible', e.target.checked)}}/>열 머리글 표시</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label><input type="text" value={this.state.frozenRowCount} onChange={(e) => {this.changeProps('frozenRowCount', e.target.value)}}/>고정된 행 수</label>
                            </td>
                            <td>
                                <label><input type="text" value={this.state.frozenColumnCount} onChange={(e) => {this.changeProps('frozenColumnCount', e.target.value)}}/>고정된 열 수</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label><input type="text" value={this.state.frozenTrailingRowCount} onChange={(e) => {this.changeProps('frozenTrailingRowCount', e.target.value)}}/>고정된 후행 행 수</label>
                            </td>
                            <td>
                                <label><input type="text" value={this.state.frozenTrailingColumnCount} onChange={(e) => {this.changeProps('frozenTrailingColumnCount', e.target.value)}}/>고정된 후행 열 수</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input value={this.state.sheetTabColor} type="color" onChange={(e) => {this.changeProps('sheetTabColor', e.target.value)}}/> 시트 탭 색
                            </td>
                            <td>
                                <input value={this.state.frozenlineColor} type="color" onChange={(e) => {this.changeProps('frozenlineColor', e.target.value)}}/> 고정된 선 색
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input value={this.state.selectionBackColor} type="color" onChange={(e) => {this.changeProps('selectionBackColor', e.target.value)}}/> 선택 영역 배경색
                            </td>
                            <td>
                                <input value={this.state.selectionBorderColor} type="color" onChange={(e) => {this.changeProps('selectionBorderColor', e.target.value)}}/> 선택 영역 테두리 색
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