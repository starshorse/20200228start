import React, {Component} from 'react';
import './NavBar.css'

class NavBar extends Component{

    constructor(props){
        super(props);
        this.itemsDesc = ['빠른 시작','GC-Spread-Sheets','GC-Worksheet','GC-Column','데이터 바인딩','스타일','윤곽선'];
    }
    render(){
        let items = this.itemsDesc.map((data,index)=>{
            return <li key={index}><div className="navItem" style={{color:this.props.activeIndex === index?'#039be5':'#607D8B'}} onClick={()=>{this.props.changeActiveIndex(index)}}>{data}</div></li>
        });
        return(
            <div className="navigationBar">
                <h2>SpreadJS</h2>
                <nav>
                    <ul>
                        {items}
                    </ul>
                </nav>
            </div>
        )
    }
}

export default NavBar