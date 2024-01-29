$( function(){
	$.get('/admin/login/info', ( response )=>{
		 let org_name = response.org_name
		 let first = org_name[0].toUpperCase(); 
		 let second = org_name[1].toUpperCase();
		 org_name = first + second + org_name.slice( 2, org_name.length )
		 $('#org_name').html( org_name );
		 $('#user_name').html( response.user_name );
	})
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
	var data = [
            {text: ' 목록A', children: [
                {text: 'ezTbl'},
                {text: '정기업무알림'},
                {text: '외환계좌거래내역'},
                {text: 'sub-A4'},
                {text: 'sub-A5', state: 'closed', children: [
                    {text:'sub-A5A', children:[
                        {text:'sub-A5A1'}
                    ]},
                    {text:'sub_A5B'}
                ]},
                {text: 'sub-A6'},
                {text: 'sub-A7'},
                {text: 'sub-A8'},
                {text: 'sub-A9', state: 'closed', children: [
                    {text:'sub-A9A'},
                    {text:'sub-A9B'}
                ]},
                {text: 'sub-A10'},
                {text: 'sub-A11'},
                {text: 'sub-A12'}
            ]},
            {text: '목록B', state:'closed', children: [
                {text:'sub-B1'},
                {text:'sub-B2'},
                {text:'sub-B3'}
            ]}
        ];
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
            data: data,
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
        }).enableFeature('Draggable', {
        helperClassName: 'tui-tree-drop',
        lineClassName: 'tui-tree-line',
        isSortable: true
      });
	 $('.tui-tree-wrap').click( function(e){
		 console.log( e.originalEvent.srcElement.innerText)
//		 alert('clicked'); 
	 })
	var contextMenu = new tui.ContextMenu(document.querySelector('.tui-tree-wrap'));

	function onClick(e, cmd) {
		console.log(cmd);
	}

	contextMenu.register('.tui-tree-wrap', onClick, [
		{title: 'New Folder'},
		{
			title: 'New File',
			menu: [
				{title: '20170101.xls'},
				{title: 'image.png', command: 'export-to-png'},
				{title: 'image.jpg', command: 'export-to-jpg'}
			]
		},
		{separator: true},
		{title: 'Rename'},
		{title: 'Delete'},
		{title: 'Copy', disable: true},
		{title: 'Paste', disable: true}
	]);
})
