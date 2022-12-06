<template>
  <div class="componentContainer" >
    <h3>Quick Start</h3>
    <div>
      Steps for getting started with the SpreadJS in Vue applications:
      <div>
        <p>1. Add reference files in your Vue application.</p>
        <p>2. Add a component to provide data and logic.</p>
        <p>3. Bind data and some other options of spread.</p>
        <p>4. Add some css to customize appearance.</p>
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
