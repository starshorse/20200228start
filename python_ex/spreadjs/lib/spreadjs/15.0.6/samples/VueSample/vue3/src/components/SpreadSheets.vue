<template>
  <div class="componentContainer gc-scrollbar-thin" >
    <h3>GC-Spread-Sheets</h3>
    <p>아래 샘플에서는 스프레드의 일부 속성을 바인딩하는 방법을 보여 줍니다.</p>

    <div class="spreadContainer" >
      <gc-spread-sheets
        :newTabVisible='newTabVisible'
        :tabStripVisible ='tabStripVisible'
        :tabStripRatio='tabStripRatio'
        :tabNavigationVisible='tabNavigationVisible'
        :scrollbarShowMax='scrollbarShowMax'
        :scrollbarMaxAlign='scrollbarMaxAlign'
        :showHorizontalScrollbar = 'showHorizontalScrollbar'
        :showVerticalScrollbar = 'showVerticalScrollbar'
        :allowUserZoom = 'allowUserZoom'
        :allowUserResize = 'allowUserResize'
        :grayAreaBackColor = 'grayAreaBackColor'
        :backColor = 'backColor'
        :hostClass='hostClass'

      >
        <gc-worksheet   :dataSource="dataSource"  >
          <gc-column :width="'150'" :dataField="'Name'"></gc-column>
          <gc-column :width="'150'" :dataField="'CountryRegionCode'"></gc-column>
          <gc-column :width="'150'" :dataField="'City'"></gc-column>
          <gc-column :width="'150'" :dataField="'AddressLine'"></gc-column>
          <gc-column :width="'150'" :dataField="'PostalCode'"></gc-column>
        </gc-worksheet>

      </gc-spread-sheets>
    </div>
    <div class="test-btn-list">
      <label >
        <input type="checkbox" :checked="newTabVisible" @click="newTabVisible = !newTabVisible"/>새 탭 표시
      </label>
      <label>
        <input type="checkbox" :checked="tabStripVisible" @click="tabStripVisible = !tabStripVisible"/>탭 스트립 표시
      </label>
      <br>
      <label>
        <input type="checkbox" :checked="tabStripRatio" @click="tabStripRatio = !tabStripRatio">탭 스트립 비율
      </label>
      <label>
        <input type="checkbox" :checked="tabNavigationVisible" @click="tabNavigationVisible = !tabNavigationVisible">탭 탐색 눈에 보이는 것
      </label>
      <br>
      <label>
        <input type="checkbox" :checked="scrollbarShowMax" @click="scrollbarShowMax = !scrollbarShowMax">스크롤 막대 최대값
      </label>
      <label>
        <input type="checkbox" :checked="scrollbarMaxAlign" @click="scrollbarMaxAlign = !scrollbarMaxAlign">스크롤 막대 최대값 맞춤
      </label>
      <br>
      <label>
        <input type="checkbox" :checked="showHorizontalScrollbar" @click="showHorizontalScrollbar = !showHorizontalScrollbar"/>가로 스크롤 막대 표시
      </label>
      <label>
        <input type="checkbox" :checked="showVerticalScrollbar" @click="showVerticalScrollbar = !showVerticalScrollbar"/>세로 스크롤 막대 표시
      </label>
      <br>
      <label>
        <input type="checkbox" :checked="allowUserZoom" @click="allowUserZoom = !allowUserZoom"/>사용자 확대/측소 허용
      </label>
      <label>
        <input type="checkbox" :checked="allowUserResize" @click="allowUserResize = !allowUserResize"/>사용자 크기 조정 허용
      </label>
      <br>
      <label>
        <input type="color"  v-bind:value="grayAreaBackColor" v-on:change="setAreaBackColor"/>회색 영역 배경색
      </label>
      <label>
        <input type="color" v-bind:value="backColor" v-on:change="setBackColor"/>배경색
      </label>
    </div>

  </div>
</template>
<script>
  import DataService from '../static/dataService'

  export default {
    data(){
      return {
        newTabVisible :true,
        tabStripVisible : true,
        tabStripRatio: true,
        tabNavigationVisible: true,
        scrollbarShowMax: true,
        scrollbarMaxAlign: true,
        showHorizontalScrollbar: true,
        showVerticalScrollbar:true,
        allowUserZoom:true,
        allowUserResize:true,
        grayAreaBackColor:"#E4E4E4",
        backColor:"#ffffff",
        dataSource: DataService.getPersonAddressData(),
        hostClass : 'spread-host'
      }
    },
    methods:{
      setAreaBackColor(e){
        this.grayAreaBackColor = e.target.value;
      },
      setBackColor(e){
        this.backColor = e.target.value;
      }

    }


  }
</script>
<style scoped>
  .componentContainer {
    position: absolute;
    padding: 10px;
    left: 242px;
    top: 0;
    bottom: 20px;
    right: 3px;
    overflow-y:auto ;
    overflow-x: hidden;
  }
  .spreadContainer{
    position: absolute;
    top:90px;
    padding: 10px;
    /*width: 100%;*/
    /*height: 240px;*/
    left: 10px;
    right:10px;
    bottom: 150px;
    box-shadow: 0 0 20px grey;
  }
  .test-btn-list{
    /*padding: 20px;*/
    position: absolute;
    bottom: 0px;
    height:130px;
  }
  .test-btn-list label{
    display: inline-flex;
    margin: 3px 20px;
    width: 293px;
    line-height: 23px;
  }
  .spread-host{
    width: 100%;
    height: 100%;
  }

</style>
