import React, {Component} from 'react';
import {SpreadSheets, Worksheet, Column} from '@grapecity/spread-sheets-react';
import './Style.css'
import dataService from '../dataService'

class SpreadSheetsCon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newTabVisible: true,
            tabStripVisible: true,
            tabStripRatio: true,
            tabNavigationVisible: true,
            scrollbarShowMax: true,
            scrollbarMaxAlign: true,
            showHorizontalScrollbar: true,
            showVerticalScrollbar:true,
            allowUserZoom : true,
            allowUserResize : true,
            spreadBackColor: '#FFFFFF',
            grayAreaBackColor: '#E4E4E4',
        };
        this.hostStyle = {
            top: '90px',
            bottom: '180px'
        };
        this.autoGenerateColumns = false;
        this.data = dataService.getPersonAddressData();
    }

    changeProps(props, value){
        let state = {};
        state[props] = value;
        this.setState(state);
    }

    render() {
        return (
            <div className="componentContainer" style={this.props.style}>
                <h3>GC-Spread-Sheets</h3>
                <div>
                    <p>The sample below shows how to bind some properties of spread.</p>
                </div>
                <div className="spreadContainer" style={this.hostStyle}>
                    <SpreadSheets newTabVisible={this.state.newTabVisible}
                                  tabStripVisible={this.state.tabStripVisible}
                                  tabStripRatio={this.state.tabStripRatio}
                                  tabNavigationVisible={this.state.tabNavigationVisible}
                                  scrollbarMaxAlign={this.state.scrollbarMaxAlign}
                                  scrollbarShowMax={this.state.scrollbarShowMax}
                                  showHorizontalScrollbar={this.state.showHorizontalScrollbar}
                                  showVerticalScrollbar={this.state.showVerticalScrollbar}
                                  backColor={this.state.spreadBackColor} grayAreaBackColor={this.state.grayAreaBackColor}
                                  allowUserZoom={this.state.allowUserZoom} allowUserResize={this.state.allowUserResize}>
                        <Worksheet dataSource={this.data}
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
                                <label><input type="checkbox" checked={this.state.newTabVisible} onChange={(e)=>{this.changeProps('newTabVisible',e.target.checked)}}/>newTabVisible</label>
                            </td>
                            <td>
                                <label><input type="checkbox" checked={this.state.tabStripVisible} onChange={(e)=>{this.changeProps('tabStripVisible',e.target.checked)}}/>tabStripVisible</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label><input type="checkbox" checked={this.state.tabStripRatio} onChange={e => {this.changeProps('tabStripRatio', e.target.checked)}}/>tabStripRatio</label>
                            </td>
                            <td>
                                <label><input type="checkbox" checked={this.state.tabNavigationVisible} onChange={e => {this.changeProps('tabNavigationVisible', e.target.checked)}}/>tabNavigationVisible</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label><input type="checkbox" checked={this.state.scrollbarShowMax} onChange={e => {this.changeProps('scrollbarShowMax', e.target.checked)}}/>scrollbarShowMax</label>
                            </td>
                            <td>
                                <label><input type="checkbox" checked={this.state.scrollbarMaxAlign} onChange={e => {this.changeProps('scrollbarMaxAlign', e.target.checked)}}/>scrollbarMaxAlign</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label><input type="checkbox" checked={this.state.showHorizontalScrollbar} onChange={(e)=>{this.changeProps('showHorizontalScrollbar',e.target.checked)}}/>showHorizontalScrollbar</label>
                            </td>
                            <td>
                                <label><input type="checkbox" checked={this.state.showVerticalScrollbar} onChange={(e)=>{this.changeProps('showVerticalScrollbar',e.target.checked)}}/>showVerticalScrollbar</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label><input type="checkbox" checked={this.state.allowUserZoom} onChange={(e)=>{this.changeProps('allowUserZoom',e.target.checked)}}/>allowUserZoom</label>
                            </td>
                            <td>
                                <label><input type="checkbox" checked={this.state.allowUserResize} onChange={(e)=>{this.changeProps('allowUserResize',e.target.checked)}}/>allowUserResize</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input value={this.state.grayAreaBackColor} type="color" onChange={(e)=>{this.changeProps('grayAreaBackColor',e.target.value)}}/> grayAreaBackColor
                            </td>
                            <td>
                                <input value={this.state.spreadBackColor} type="color" onChange={(e)=>{this.changeProps('spreadBackColor',e.target.value)}}/> backColor
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}

export default SpreadSheetsCon