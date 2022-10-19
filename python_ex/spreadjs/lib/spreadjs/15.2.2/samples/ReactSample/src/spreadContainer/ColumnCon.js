import React, {Component} from 'react';
import {SpreadSheets, Worksheet, Column} from '@grapecity/spread-sheets-react';
import './Style.css'

class ColumnCon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            resizable: true,
            width: 300,
            formatter: '$ #.00'
        };
        this.hostStyle = {
            top: '90px',
            bottom: '74px'
        };
        this.autoGenerateColumns = false;
        let dataTable = [];
        for (let i = 0; i < 42; i++) {
            dataTable.push({price: i + 0.56})
        }
        this.data = dataTable;
    }

    changeProps(props, value) {
        let state = {};
        state[props] = value;
        this.setState(state);
    }

    render() {
        return (
            <div className="componentContainer" style={this.props.style}>
                <h3>GC-Column</h3>
                <div>
                    <p>The sample below shows how to bind some properties of column.</p>
                </div>
                <div className="spreadContainer" style={this.hostStyle}>
                    <SpreadSheets>
                        <Worksheet dataSource={this.data} autoGenerateColumns={this.autoGenerateColumns}>
                            <Column dataField="price" width={this.state.width} formatter = {this.state.formatter} visible = {this.state.visible} resizable={this.state.resizable}/>
                        </Worksheet>
                    </SpreadSheets>
                </div>
                <div className="settingContainer">
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <label><input type="checkbox" checked={this.state.visible} onChange={(e) => {this.changeProps('visible', e.target.checked)}}/>visible</label>
                            </td>
                            <td>
                                <label><input type="checkbox" checked={this.state.resizable} onChange={(e) => {this.changeProps('resizable', e.target.checked)}}/>resizable</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label><input type="text" value={this.state.width} onChange={(e) => {this.changeProps('width', e.target.value)}}/>width</label>
                            </td>
                            <td>
                                <label><input type="text" value={this.state.formatter} onChange={(e) => {this.changeProps('formatter', e.target.value)}}/>formatter</label>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}

export default ColumnCon