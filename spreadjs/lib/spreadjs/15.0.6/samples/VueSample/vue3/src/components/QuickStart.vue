<template>
  <div class="componentContainer" >
    <h3>빠른 시작</h3>
    <div>
      Vue 응용 프로그램에서 스프레드시트를 시작하는 방법은 다음과 같습니다.
      <div>
        <p>1. Vue 응용 프로그램에 참조 파일을 추가합니다.</p>
        <p>2. 데이터와 논리를 제공할 컴포넌트를 추가합니다.</p>
        <p>3. 데이터를 스프레드의 몇 가지 기타 옵션과 바인딩합니다.</p>
        <p>4. 몇 가지 CSS를 추가하여 모양을 사용자 정의합니다.</p>
      </div>
    </div>
    <div class="spreadContainer" >
      <gc-spread-sheets
        :hostClass='"spreadHost"'>

      </gc-spread-sheets>
    </div>
  </div>
</template>
<script>
  export default {
//    name: 'sample-header'
  }
</script>
<style scoped>
  .componentContainer {
    position: absolute;
    padding: 10px;
    left: 242px;
    top: 0;
    bottom: 20px;
    right: 0;
  }
  .spreadContainer {
    padding: 10px;
    box-shadow: 0 0 20px grey;
  }
  .spreadContainer{
    position: absolute;
    left: 0px;
    right: 30px;
    top: 260px;
    bottom: 10px;
  }
  .spreadHost{
    width: 100%;
    height: 100%;
  }


</style>
