$( async function(){
// await $.get
	function fetchingData( url ){
		return new Promise(( resolve, reject )=>{
			$.get( url, ( response )=>{
				resolve( response );
			})
		})
	}
    function fetchingPost( url, data ){
		return new Promise(( resolve, reject )=>{
			$.post( url, data, ( response )=>{
				resolve( response );
			})
		})
	}

	let response = await fetchingData('/admin/login/info' ) ;
	let org_name = response.org_name
	let first = org_name[0].toUpperCase(); 
	let second = org_name[1].toUpperCase();
	org_name = first + second + org_name.slice( 2, org_name.length )
	$('#org_name').html( org_name );
	$('#user_name').html( response.user_name );

/////////////////////////////////////////////////////////////////////////////////////////
//  Toast UI Tree 
////////////////////////////////////////////////////////////////////////////////////////	

	response = await fetchingData('/tbl_editor/user_config_tree') 	
	if( response.sTATUS == -1 ){
		alert('User Config load failure') 
	}
	console.log( response.DATA )
	var data3 = response.DATA 

	const Tree = tui.Tree; 

	var util = {
		addEventListener: function(element, eventName, handler) {
			if (element.addEventListener) {
				element.addEventListener(eventName, handler, false);
			} else {
				element.attachEvent('on' + eventName, handler);
			}
		}
	};

	var addChildBtn = document.getElementById('addChildBtn'); 
	 // Custom template string
        var customInternalNode =
		'<div class="tui-tree-content-wrapper tui-tree-root-btn" style="padding-left: {{indent}}px">' +
                '<button type="button" class="tui-tree-toggle-btn tui-js-tree-toggle-btn">' +
                    '<span class="tui-ico-tree"></span>' +
                    '{{stateLabel}}' +
                '</button>' +
		'<span class="tui-tree-text tui-js-tree-text" style="font-size: 1.6em">' +
                    '{{text}}' +
                '</span>' +
            '</div>' +
            '<ul class="tui-tree-subtree tui-js-tree-subtree">' +
                '{{{children}}}' + // Mustache's format
            '</ul>';
        var customLeafNode =
            '<div class="tui-tree-content-wrapper tui-tree-root-btn" style="padding-left: {{indent}}px">' +
		'<span class="tui-tree-text tui-js-tree-text" style="font-size: 1.2em">' +
                    '{{text}}' +
                '</span>' +
            '</div>';
        var tree = new tui.Tree('#tree', {
            data: data3,
            nodeDefaultState: 'opened',
            template: {
                internalNode: // Change to Mustache's format
				'<div class="tui-tree-content-wrapper" style="padding-left: {{indent}}px">' + // Example for using indent value
				'<button type="button" class="tui-tree-toggle-btn tui-js-tree-toggle-btn">' +
                            '<span class="tui-ico-tree"></span>' +
                            '{{stateLabel}}' +
                        '</button>' +
				'<span class="tui-tree-text tui-js-tree-text" style="font-size: 1.6em">' +
                            '<span class="tui-tree-ico tui-ico-folder"></span>' +
                            '{{text}}' +
                        '</span>' +
                    '</div>' +
                    '<ul class="tui-tree-subtree tui-js-tree-subtree">' +
                        '{{{children}}}' + // Mustache's format
                    '</ul>',
                leafNode:
                    '<div class="tui-tree-content-wrapper" style="padding-left: {{indent}}px">' + // Example for using indent value
				'<span class="tui-tree-text {{textClass}}" style="font-size: 1.2em">' +
                            '<span class="tui-tree-ico tui-ico-pin"></span>' +
                            '{{text}}' +
                        '</span>' +
                    '</div>'
            },
            renderTemplate: function(tmpl, props) {
                var id = props.id;
                var depth = this.getDepth(id);
                var isFirstDepth = (this.getDepth(id) === 1);
                var isLeaf = this.isLeaf(id);
                if (isFirstDepth) { // customizing node template
                    if (isLeaf) {
                        tmpl = customLeafNode;
                    } else {
                        tmpl = customInternalNode;
                    }
                }
                props.indent = 20 * depth; // customizing indent
                return Mustache.render(tmpl, props);
            }
		});
		tree.enableFeature('Draggable', {
			helperClassName: 'tui-tree-drop',
			lineClassName: 'tui-tree-line',
			isSortable: true
		}).enableFeature('Selectable', {
			selectedClassName: 'tui-tree-selected',
		}).enableFeature('Editable', {
			editableClassName: tree.classNames.textClass, 
			dataKey: 'text',
			defaultValue: 'new node',
			inputClassName: 'myInput'
		})

//////////////////////////////////////////////////////////////////////////////////////////	
// custome area .. 
	var pos_top 
	var pos_left 
	var node = { id: null , data : null, select_flag: false };
	const getTreeData = ( tree )=>{
		let newTreeData ={} 
		tree.eachAll( function( node, node_id ){
			let node_data = tree.getNodeData( node_id ) 
			node_data['children'] = []
			node_data['pid'] = node['_parentId'];
			newTreeData[ node_id] = node_data 
		});
		//		console.log( newTreeData )
		for( [ key , value ] of Object.entries( newTreeData )){
			if( value.pid != null)
				newTreeData[value.pid].children.push( value )
		}
		//		console.log( newTreeData[tree.getRootNodeId()].children )
		return  newTreeData[tree.getRootNodeId()].children 
	}
//////////////////////////////////////////////////////////////////////////////////////////	
//  Register Event 
/////////////////////////////////////////////////////////////////////////////////////////	
		var rootNodeId = tree.getRootNodeId(); 
	   
	    util.addEventListener( addChildBtn , 'click', function(){
			tree.add({ text:'새 목록' }, rootNodeId );
		})
		$('#tree_deleteConfirm').on('click', function(e){
			tree.remove(node.id); 
			$('#exampleModalCenter').modal('hide');
		})
	    const show_deleteConfirm = ( nodeText )=>{
			let message = `항목 [${ nodeText }]를 삭제하시겠습니까?` ;
			$('#exampleModalLongTitle').html('삭제확인' )
			$('#exampleModalContent').html(message);
			$('#exampleModalCenter').modal('show');
		}
//
//////////////////////////////////////////////////////////////////////////////////////////

	tree.on('select', function( eventData ){
		node['id'] = eventData.nodeId  ;
		node['data'] = tree.getNodeData( eventData.nodeId );
		node['select_flag'] = true ; 
		console.log( node );
	});
	tree.on('afterDraw', async function( evt ){
		if( tree.isMovingNode ){
			console.log('isMovingNode');
		}
		console.log('afterDraw' + evt.nodeId ); 
		let cur_treeData = getTreeData( tree )
		console.log( cur_treeData ) 
		let data = { data : JSON.stringify( cur_treeData ) } 
		let response = await fetchingPost('/tbl_editor/user_config_tree', data )  

	})
	tree.on('beforeDraw', function( evt ){
		if( tree.isMovingNode ){
			console.log('isMovingNode');
		}
		console.log('beforeDraw' + evt.nodeId ); 
	})
	$('.tui-tree-wrap').on('contextmenu', function(e){
		e.preventDefault(); 
		if( e.pageY == undefined )
			return; 
		pos_top = e.pageY
		pos_left = e.pageX + 20  
		//		 console.log( e.originalEvent.srcElement.innerText)
		console.log( tree ) 
		if( node.select_flag ){
			$('.context-menu-one').contextMenu();
			node.select_flag = false ; 
		}
	})
	$.contextMenu({
        selector: '.context-menu-one',
        trigger: 'left',
        callback: function(key, options) {
			let nodeData 
			switch(key){
				case 'open':
						break;
				case 'edit':
					    nodeData = tree.getNodeData( node.id ) 
					    if( nodeData['edit'] != false )
							tree.editNode( node.id ); 
					    break;
				case 'delete':
					    nodeData = tree.getNodeData( node.id ) 
					    show_deleteConfirm( nodeData.text ); 
						break; 
				default:	
			}
        },
        items: {
            "open": {name: "Open", icon: "fa-beer"},
            "edit": {name: "Edit", icon: "edit"},
            "delete": {name: "Delete", icon: "delete"},
            "sep1": "---------",
            "quit": {name: "Quit", icon: function($element, key, item){ return 'context-menu-icon context-menu-icon-quit'; }}
        },
		position: function( opt, x, y){
			opt.$menu.css({ top: pos_top, left:pos_left }); 
		}
    });
})
