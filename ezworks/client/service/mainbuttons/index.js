angular.module('main_buttons',[])
.service('mainButtons_service',[function(){
	var menuList = [] 
	var autofilter_mode = 0 
	var fullCol_mode = 0 
	const fullCol_title = { 'on':'전체보기' , 'off':'간략보기' } 
	this.get_autofilter_mode = ()=>{ return !autofilter_mode } 
	this.set_autofilter_mode = ( mode )=>{ 
		autofilter_mode = mode 
	}
	var post_set_autofilter_mode_f_list = []
	this.set_autofilter_mode = ()=>{
		this.set_autofilter_mode.addPost = ( ft_name )=>{
			post_set_autofilter_mode_f_list.push( ft_name ) 
		}													
	    this.set_autofilter_mode.execPost = ( option )=>{
		    post_set_autofilter_mode_f_list.forEach((ent)=>ent( option ))  	
		}
	}
	this.get_fullCol_mode = ()=>{ return !fullCol_mode } 
	this.set_fullCol_mode = ( mode )=>{ fullCol_mode = mode } 
	this.create_menuEntry = ( name, title, objEvents_functions, objDependency )=>{
		return {
			name, title, objEvents_functions , objDependency 
		}
	}
}])
