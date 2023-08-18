// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const cors = require("cors");
server.use(middlewares);
server.use(router);
server.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
server.options("*", cors());
server.listen(3001, () => {
  console.log("JSON Server is running");
});
/*
Client Code.. 

<!Doctype html>
<html ng-app="myNgRs">
<head>
	<link rel="stylesheet" href="styles.css">
	<link rel="stylesheet" href="../bower_components/bootstrap/dist/css/bootstrap.min.css">
	<script src="../bower_components/angular/angular.min.js"></script>
	<script src="../bower_components/angular-resource/angular-resource.min.js"></script>
</head>
<body>
	<div ng-controller="myNgRsCtl">
		<h1>Hello World  Json-server  db.json</h1>
		<button class="btn btn-info" id="insert" >POST</button> 
		<button class="btn btn-info" id="update" >PUT</button> 
		<button class="btn btn-info" id="delete" >DELETE</button> 
		<p id="result">Result</p>
	</div>
	<script>
    angular.module('myNgRs',
		   ['ngResource'])
	.controller('myNgRsCtl',['$scope','$resource','$injector', function($scope ,$resource, $injector){
		var result = document.getElementById('result')
        document.getElementById('insert').addEventListener('click',async function(e){
			let data  = {"id":4, "content":"Angular","completed": true } 
			let result = await $http({ method:'POST', url:'http://localhost:3001/todos' , data ,  headers: { 'Context-Type':'application/json' } }) 
			result.innerText = JSON.stringify( resuslt ) 
		})
        document.getElementById('update').addEventListener('click', async function(e){
			let data  = {"id":4, "content":"React","completed": false } 
			let result = await $http({ method:'PUT', url:`http://localhost:3001/todos/${ data.id }` , data ,  headers: { 'Context-Type':'application/json' } }) 
			result.innerText = JSON.stringify( resuslt ) 
		})
        document.getElementById('delete').addEventListener('click', async function(e){
			let data  = {"id":4} 
			let result = await $http({ method:'DELETE', url:`http://localhost:3001/todos/${ data.id }` , data ,  headers: { 'Context-Type':'application/json' } }) 
			result.innerText = JSON.stringify( resuslt ) 
		})
		let $http = $injector.get('$http') 
		$http.get('http://localhost:3001/todos').then(( response )=>{
			console.log( response.data ) 
			result.innerText = JSON.stringify( response.data ) 
		})
     }
	]);
	</script>
	<script src="../bower_components/datatables/media/js/jquery.js"></script>
	<script src="../bower_components/datatables/media/js/jquery.dataTables.min.js"></script>
	<script src="../bower_components/datatables/media/js/dataTables.bootstrap4.min.js"></script>
</body>
</html>
*/
