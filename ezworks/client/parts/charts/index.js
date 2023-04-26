angular.module('myCharts',[])
.controller('myChartsCtrl', ['$scope','spreadJs_service', function( $scope, spreadJs_service ){
	const updateChart_cb_f = ( res_ )=>{
//        const s = new dfd.Series(res_[0])
	    const s = new dfd.DataFrame(  res_.dataFrame , { index: res_.data[1].$data } ) 
//		s.setIndex({ column: '성명', inplace: true }) 
//		s.drop({ columns: '성명', inplace: true }) 
/*		
		const layout = {
			title: {
				text: res_.data[0],
				x: 0 
		  },
		}
*/
const layout = {
            title: {
              text: res_.data[0],
              x: 0,
            },
            legend: {
              bgcolor: "#fcba03",
              bordercolor: "#444",
              borderwidth: 1,
              font: { family: "Arial", size: 10, color: "#fff" },
            },
            width: 1000,
            yaxis: {
              title: res_.data[2],
            },
            xaxis: {
              title: res_.data[3],
            },
          };

          const config = {
           // columns: ["AAPL.Open", "AAPL.Close"], //columns to plot
            displayModeBar: true,
            displaylogo: false,
          };
		s.plot('plot_div').bar({layout, config} ) 
	}
	spreadJs_service.set_chartCb_f_p( updateChart_cb_f ) 
}])
.directive('myCharts', function(){
	return {
		restrict:'E',
		controller:'myChartsCtrl',
		template:` <div id='plot_div'></div> `
	}
})
