var data = {
    "selected": 1,
    "tabs": [
        {
            "title": "파일",
            "name": "file"
        },
        {
            "title": "홈",
            "name": "home",
            "collapse": ["groupStyle2", "groupFont", "groupAlignment", "*groupStyle3", "groupStyle1"],
            "groupCollapseItems": ["groupStyle1"],
            "groups": [
                {
                    "tools": [
                        {
                            "type": "group",
                            "collapseGroup": "groupFont",
                            "centerAlign": true,
                            "items": [
                                {
                                    "type": "input-group",
                                    "name": "fontFamily",
                                    "width": 70,
                                    "dropdown": ["Arial", "Arial Black", "Calibri", "Cambria", "Century", "Courier New", "Comic Sans MS", "Garamond", "Georgia", "맑은 고딕", "Mangal", "Meiryo", "MS Gothic", "MS Mincho", "MS PGothic", "MS PMincho", "Roboto", "Tahoma", "Times", "Times New Roman", "Trebuchet MS", "Verdana", "Wingdings"]
                                },
                                {
                                    "type": "input-group",
                                    "name": "fontSize",
                                    "width": 40,
                                    "dropdown": [8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72]
                                },
                            ]
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite Bold",
                            "name": "bold",
                            "text": "굵게",
                            "tooltip": "굵게",
                            "collapseGroup": "groupStyle1",
                            "toggle": true,
                            "nolabel": true
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite Italic",
                            "name": "italic",
                            "text": "기울임꼴",
                            "tooltip": "기울임꼴",
                            "collapseGroup": "groupStyle1",
                            "toggle": true,
                            "nolabel": true
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite Underline",
                            "name": "underline",
                            "text": "밑줄",
                            "tooltip": "밑줄",
                            "collapseGroup": "groupStyle1",
                            "toggle": true,
                            "nolabel": true
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite UnderlineDouble",
                            "name": "doubleUnderline",
                            "text": "이중 밑줄",
                            "tooltip": "이중 밑줄",
                            "collapseGroup": "groupStyle1",
                            "toggle": true,
                            "nolabel": true
                        },
                        {
                            "type": "group",
                            "collapseGroup": "groupStyle3",
                            "tooltip": "테두리",
                            "items": [
                                {
                                    "type": "icon-group",
                                    "iconClass": "sprite BorderBottomNoToggle",
                                    "name": "border",
                                    "text": "테두리",
                                    "header": "테두리",
                                    "minWidth": 280,
                                    "dropdown": [
                                        { "value": "bottom", "text": "아래쪽 테두리", "iconClass": "sprite BorderBottom" },
                                        { "value": "top", "text": "위쪽 테두리", "iconClass": "sprite BorderTop" },
                                        { "value": "left", "text": "왼쪽 테두리", "iconClass": "sprite BorderLeft" },
                                        { "value": "right", "text": "오른쪽 테두리", "iconClass": "sprite BorderRight" },
                                        "",
                                        { "value": "none", "text": "테두리 없음", "iconClass": "sprite BorderNone" },
                                        { "value": "all", "text": "모든 테두리", "iconClass": "sprite BordersAll" },
                                        { "value": "outside", "text": "외부 테두리", "iconClass": "sprite BorderOutside" },
                                        { "value": "thick", "text": "굵은 상자 테두리", "iconClass": "sprite BorderThickOutside" },
                                        "",
                                        { "value": "doublebottom", "text": "아래쪽 이중 테두리", "iconClass": "sprite BorderDoubleBottom" },
                                        { "value": "thickbottom", "text": "굵은 아래쪽 테두리", "iconClass": "sprite BorderThickBottom" },
                                        { "value": "top-bottom", "text": "위쪽 및 아래쪽 테두리", "iconClass": "sprite BorderTopAndBottom" },
                                        { "value": "top-thickbottom", "text": "위쪽/굵은 아래쪽 테두리", "iconClass": "sprite BorderTopAndThickBottom" },
                                        { "value": "top-doublebottom", "text": "위쪽/아래쪽 이중 테두리", "iconClass": "sprite BorderTopAndDoubleBottom" },
                                        "",
                                        { "value": "more", "text": "더 많은 테두리...", "iconClass": "sprite BordersMoreDialog" }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "group",
                            "collapseGroup": "groupStyle3",
                            "tooltip": "채우기 색",
                            "items": [
                                {
                                    "type": "setcolor-group",
                                    "iconClass": "sprite FillBackColorSplitDropdown",
                                    "name": "backColor",
                                    "text": "채우기 색",
                                    "colorPickerOptions": { "nofill": { "show": true, "text": "채우기 없음", "color": "white" }, "header": "채우기 색" }
                                }
                            ]
                        },
                        {
                            "type": "group",
                            "collapseGroup": "groupStyle3",
                            "tooltip": "글꼴 색",
                            "items": [
                                {
                                    "type": "setcolor-group",
                                    "iconClass": "sprite GroupBasicText",
                                    "name": "foreColor",
                                    "text": "글꼴 색",
                                    "colorPickerOptions": { "autocolor": { "show": false, "text": "자동", "color": "black" }, "header": "글꼴 색" }
                                }
                            ]
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite Overline",
                            "name": "overline",
                            "text": "윗줄",
                            "tooltip": "윗줄",
                            "collapseGroup": "groupStyle2",
                            "toggle": true
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite Strikethrough",
                            "name": "strikethrough",
                            "text": "취소선",
                            "tooltip": "취소선",
                            "collapseGroup": "groupStyle2",
                            "toggle": true
                        },
                        {
                            "type": "dropdown",
                            "minWidth": 210,
                            "iconClass": "glyphicon glyphicon-menu-down",
                            "name": "font",
                            "header": "글꼴",
                            "items": []
                        }
                    ]
                },
                {
                    "tools": [
                        {
                            "type": "dropdown",
                            "iconClass": "sprite AlignCenter",
                            "name": "align",
                            "tooltip": "맞춤",
                            "header": "맞춤",
                            "items": ["indent", "outdent"],
                            "rows": [
                                {
                                    "type": "icon-group",
                                    "items": [
                                        {
                                            "iconClass": "sprite AlignTopExcel",
                                            "name": "valign-top",
                                            "text": "위쪽",
                                            "toggle": true,
                                            "nolabel": true,
                                            "toggleGroup": "valign"
                                        },
                                        {
                                            "iconClass": "sprite AlignMiddleExcel",
                                            "name": "valign-center",
                                            "text": "가운데",
                                            "toggle": true,
                                            "nolabel": true,
                                            "toggleGroup": "valign"
                                        },
                                        {
                                            "iconClass": "sprite AlignBottomExcel",
                                            "name": "valign-bottom",
                                            "text": "아래쪽",
                                            "toggle": true,
                                            "nolabel": true,
                                            "toggleGroup": "valign"
                                        }
                                    ]
                                },
                                {
                                    "type": "icon-group",
                                    "items": [
                                        {
                                            "iconClass": "sprite AlignLeft",
                                            "name": "halign-left",
                                            "text": "왼쪽",
                                            "toggle": true,
                                            "nolabel": true,
                                            "toggleGroup": "halign"
                                        },
                                        {
                                            "iconClass": "sprite AlignCenter",
                                            "name": "halign-center",
                                            "text": "가운데",
                                            "toggle": true,
                                            "nolabel": true,
                                            "toggleGroup": "halign"
                                        },
                                        {
                                            "iconClass": "sprite AlignRight",
                                            "name": "halign-right",
                                            "text": "오른쪽",
                                            "toggle": true,
                                            "nolabel": true,
                                            "toggleGroup": "halign"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite MergeCenter",
                            "name": "cellmerge",
                            "text": "병합하고 가운데 맞춤",
                            "collapseGroup": "groupAlignment",
                            "toggle": true
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite WrapText",
                            "name": "wordwrap",
                            "text": "텍스트 줄 바꿈",
                            "collapseGroup": "groupAlignment",
                            "toggle": true
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite CellAlignmentOptions",
                            "name": "verticalText",
                            "text": "세로 텍스트",
                            "collapseGroup": "groupAlignment",
                            "toggle": true
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite IndentIncrease",
                            "name": "indent",
                            "text": "들여쓰기",
                            "collapseGroup": "groupIndent"
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite IndentDecrease",
                            "name": "outdent",
                            "text": "내어쓰기",
                            "collapseGroup": "groupIndent"
                        }
                    ]
                },
                {
                    "tools": [
                        {
                            "type": "group",
                            "tooltip": "셀 형식",
                            "items": [
                                {
                                    "type": "dropdown-only",
                                    "iconClass": "sprite DollarSign",
                                    "name": "cellformat",
                                    "text": "셀 형식",
                                    "dropdown": [
                                        { "value": "nullValue", "text": "일반", "iconClass": "sprite DataTypeGeneral" },
                                        { "value": "0.00", "text": "숫자", "iconClass": "sprite DataTypeNumber" },
                                        { "value": "$#,##0.00", "text": "통화", "iconClass": "sprite DataTypeCurrency" },
                                        { "value": "$ #,##0.00;$ (#,##0.00);$ \"-\"??;@", "text": "회계", "iconClass": "sprite DataTypeCurrencyBasic" },
                                        { "value": "m/d/yyyy", "text": "짧은 날짜", "iconClass": "sprite DataTypeShortDate" },
                                        { "value": "dddd, mmmm dd, yyyy", "text": "긴 날짜", "iconClass": "sprite DataTypeLongDate" },
                                        { "value": "h:mm:ss AM/PM", "text": "시간", "iconClass": "sprite DataTypeTime" },
                                        { "value": "0%", "text": "백분율", "iconClass": "sprite PercentStyle" },
                                        { "value": "# ?/?", "text": "분수", "iconClass": "sprite DataTypeStandard" },
                                        { "value": "0.00E+00", "text": "지수", "iconClass": "sprite DataTypeScientific" },
                                        { "value": "@", "text": "텍스트", "iconClass": "sprite DataTypeText" },
                                        "",
                                        { "value": "custom", "text": "사용자 정의 서식" }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "group",
                            "tooltip": "숫자 형식",
                            "items": [
                                {
                                    "type": "dropdown-only",
                                    "iconClass": "sprite PercentStyle",
                                    "name": "numberformat",
                                    "text": "숫자 형식",
                                    "dropdown": [
                                        { "value": "percentStyle", "text": "백분율 스타일", "iconClass": "sprite PercentStyle" },
                                        { "value": "commaStyle", "text": "쉼표 스타일", "iconClass": "sprite CommaStyle" },
                                        { "value": "increaseDecimal", "text": "자릿수 늘림", "iconClass": "sprite DecimalsIncrease" },
                                        { "value": "decreaseDecimal", "text": "자릿수 줄임", "iconClass": "sprite DecimalsDecrease" }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "tools": [
                        {
                            "type": "group",
                            "tooltip": "셀 유형",
                            "items": [
                                {
                                    "type": "dropdown-only",
                                    "iconClass": "sprite CellProperties",
                                    "name": "celltype",
                                    "text": "셀 유형",
                                    "dropdown": [
                                        { "value": "button", "text": "단추 셀 유형" },
                                        { "value": "checkbox", "text": "체크박스 셀 유형" },
                                        { "value": "combobox", "text": "콤보 상자 셀 유형" },
                                        { "value": "hyperlink", "text": "하이퍼링크 셀 유형" }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "tools": [
                        {
                            "type": "icon",
                            "iconClass": "sprite Lock",
                            "name": "protectsheet",
                            "text": "시트 보호",
                            "tooltips": ["시트 보호", "시트 보호 해제"],
                            "toggle": true
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite Lock",
                            "name": "unlockcells",
                            "text": "셀 잠금 해제",
                            "tooltips": ["셀 잠금", "셀 잠금 해제"],
                            "toggle": true,
                            "checked": true
                        }
                    ]
                },
                {
                    "tools": [
                        {
                            "type": "group",
                            "tooltip": "삽입 및 삭제",
                            "items": [
                                {
                                    "type": "dropdown-only",
                                    "iconClass": "sprite InsertCellMenu",
                                    "name": "cellsgroup",
                                    "text": "삽입 및 삭제",
                                    "dropdown": [
                                        { "value": "insertRows", "text": "행 삽입", "iconClass": "sprite InsertRow" },
                                        { "value": "insertColumns", "text": "열 삽입", "iconClass": "sprite InsertColumns" },
                                        { "value": "insert-shiftCellsRight", "text": "셀 삽입 및 오른쪽으로 밀기", "iconClass": "sprite InsertColumnLeft" },
                                        { "value": "insert-shiftCellsDown", "text": "셀 삽입 및 아래로 밀기", "iconClass": "sprite InsertRowAbove" },
                                        { "value": "deleteRows", "text": "행 삭제", "iconClass": "sprite CellsDelete" },
                                        { "value": "deleteColumns", "text": "열 삭제", "iconClass": "sprite CellsDeleteSmart" },
                                        { "value": "delete-shiftCellsLeft", "text": "셀 삭제 및 왼쪽으로 밀기", "iconClass": "sprite CellsDelete" },
                                        { "value": "delete-shiftCellsUp", "text": "셀 삭제 및 위로 밀기", "iconClass": "sprite CellsDeleteSmart" }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "group",
                            "tooltip": "지우기",
                            "items": [
                                {
                                    "type": "dropdown-only",
                                    "iconClass": "sprite ClearMenu",
                                    "name": "clearformat",
                                    "text": "지우기",
                                    "dropdown": [
                                        { "value": "clearAll", "text": "모두 지우기", "iconClass": "sprite ClearAll" },
                                        { "value": "clearFormatting", "text": "서식 지우기", "iconClass": "sprite ClearAllFormatting" },
                                        { "value": "clear", "text": "지우기", "iconClass": "sprite Clear" }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "tools": [
                        {
                            "ignore": true,
                            "type": "icon",
                            "iconClass": "sprite Clear",
                            "name": "conditionalformat",
                            "text": "조건부 서식"
                        }
                    ]
                },
                {
                    "tools": [
                        {
                            "type": "icon",
                            "iconClass": "sprite SearchUI",
                            "name": "find",
                            "text": "찾기"
                        }
                    ]
                }
            ]
        },
        {
            "title": "삽입",
            "name": "insert",
            "collapse": ["*groupInsert"],
            "groups": [
                {
                    "tooltip": "삽입",
                    "tools": [
                        {
                            "type": "icon",
                            "iconClass": "sprite InsertTable icon-text",
                            "name": "insertTable",
                            "text": "표",
                            "collapseGroup": "groupInsert"
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite InsertPictureDialog icon-text",
                            "name": "insertPicture",
                            "text": "그림",
                            "collapseGroup": "groupInsert"
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite InsertLink icon-text",
                            "name": "insertLink",
                            "text": "링크",
                            "header": "링크 edd 삽입",
                            "collapseGroup": "groupInsert"
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite InsertNewComment icon-text",
                            "name": "insertComment",
                            "text": "주석",
                            "collapseGroup": "groupInsert"
                        },
                        {
                            "type": "group",
                            "tooltip": "스파크라인",
                            "collapseGroup": "groupInsert",
                            "items": [
                                {
                                    "type": "dropdown-only",
                                    "iconClass": "sprite SparklineLineInsert icon-text",
                                    "name": "insertSparkline",
                                    "haslabel": true,
                                    "text": "스파크라인",
                                    "dropdown": [
                                        { "value": "line", "text": "꺾은선형 스파크라인" },
                                        { "value": "column", "text": "열 스파크라인" },
                                        { "value": "winloss", "text": "승패 스파크라인" },
                                        { "value": "pie", "text": "원형 스파크라인" },
                                        { "value": "area", "text": "영역 스파크라인" },
                                        { "value": "scatter", "text": "분산형 스파크라인" },
                                        { "value": "spread", "text": "분배 스파크라인" },
                                        { "value": "stacked", "text": "누적 스파크라인" },
                                        { "value": "boxplot", "text": "상자 그림 스파크라인" },
                                        { "value": "cascade", "text": "계단식 배열 스파크라인" },
                                        { "value": "pareto", "text": "파레토 스파크라인" },
                                        { "value": "bullet", "text": "글머리 기호 스파크라인" },
                                        { "value": "hbar", "text": "가로 막대형 스파크라인" },
                                        { "value": "vbar", "text": "세로 막대형 스파크라이니" },
                                        { "value": "vari", "text": "분산 스파크라인" }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "group",
                            "tooltip": "바코드",
                            "collapseGroup": "groupInsert",
                            "items": [
                                {
                                    "type": "dropdown-only",
                                    "iconClass": "barcode icon-text",
                                    "name": "insertBarCode",
                                    "haslabel": true,
                                    "text": "바코드",
                                    "dropdown": [
                                        { "value": "qrCode", "text": "QRCode" },
                                        { "value": "dataMatrix", "text": "DataMatrix" },
                                        { "value": "codabar", "text": "Codabar" },
                                        { "value": "pdf417", "text": "PDF417" },
                                        { "value": "ean8", "text": "EAN8" },
                                        { "value": "ean13", "text": "EAN13" },
                                        { "value": "gs1_128", "text": "GS1_128" },
                                        { "value": "code39", "text": "Code39" },
                                        { "value": "code49", "text": "Code49" },
                                        { "value": "code93", "text": "Code93" },
                                        { "value": "code128", "text": "Code128" }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "group",
                            "tooltip": "차트",
                            "collapseGroup": "groupInsert",
                            "items": [
                                {
                                    "type": "dropdown-only",
                                    "iconClass": "chartIconBase ChartInsert icon-text",
                                    "name": "insertChart",
                                    "haslabel": true,
                                    "text": "차트",
                                    "dropdown": [
                                        {
                                            "value": "column1",
                                            "text": "세로 막대형 차트",
                                            "header": "세로 막대형 차트",
                                            "iconClass": "chartIcon ColumnChart",
                                            "childrenList": [
                                                {
                                                    "type": "dropdown-only",
                                                    "name": "columnChart",
                                                    "haslabel": true,
                                                    "text": "세로 막대형 차트",
                                                    "dropdown": [
                                                        { "value": "clusteredColumn", "text": "묶은 세로 막대형", "header": "묶은 세로 막대형", "iconClass": "chartIconBase clustered-column-icon" },
                                                        { "value": "stackedColumn", "text": "누적 세로 막대형", "header": "누적 세로 막대형", "iconClass": "chartIconBase stacked-column-icon" },
                                                        { "value": "100%StackedColumn", "text": "100% 기준 누적 세로 막대형", "header": "100% 기준 누적 세로 막대형", "iconClass": "chartIconBase stacked100-column-icon" }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "value": "line1", "text": "꺾은선형 차트", "header": "꺾은선형 차트", "iconClass": "chartIcon LineChart", "childrenList": [
                                                {
                                                    "type": "dropdown-only",
                                                    "name": "lineChart",
                                                    "haslabel": true,
                                                    "text": "꺾은선형 차트",
                                                    "dropdown": [
                                                        { "value": "line", "text": "선", "header": "선", "iconClass": "chartIconBase line-icon" },
                                                        { "value": "StackedLine", "text": "누적 꺾은선형", "header": "누적 꺾은선형", "iconClass": "chartIconBase stacked-line-icon" },
                                                        { "value": "100%StackedLine", "text": "100% 기준 누적 꺾은선형", "header": "100% 기준 누적 꺾은선형", "iconClass": "chartIconBase stacked100-line-icon" },
                                                        { "value": "lineWithMarkers", "text": "표식이 있는 꺾은선형", "header": "표식이 있는 꺾은선형", "iconClass": "chartIconBase line-markers-icon" },
                                                        { "value": "stackedLineWithMarkers", "text": "표식이 있는 누적 꺾은선형", "header": "표식이 있는 누적 꺾은선형", "iconClass": "chartIconBase stacked-line-markers-icon" },
                                                        { "value": "100%StackedLineWithMarkers", "text": "표식이 있는 100% 기준 누적 꺾은선형", "header": "표식이 있는 100% 기준 누적 꺾은선형", "iconClass": "chartIconBase stacked100-line-markers-icon" }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "value": "pie1", "text": "원형 차트", "header": "원형 차트", "iconClass": "chartIcon PieChart", "childrenList": [
                                                {
                                                    "type": "dropdown-only",
                                                    "name": "pieChart",
                                                    "haslabel": true,
                                                    "text": "원형 차트",
                                                    "dropdown": [
                                                        { "value": "pie", "text": "원형", "header": "원형", "iconClass": "chartIconBase pie-icon" },
                                                        { "value": "doughnut", "text": "도넛형", "header": "도넛형", "iconClass": "chartIconBase doughnut-icon" }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "value": "bar1", "text": "막대형 차트", "header": "막대형 차트", "iconClass": "chartIcon BarChart", "childrenList": [
                                                {
                                                    "type": "dropdown-only",
                                                    "name": "barChart",
                                                    "haslabel": true,
                                                    "text": "막대형 차트",
                                                    "dropdown": [
                                                        { "value": "clusteredBar", "text": "묶은 가로 막대형", "header": "묶은 가로 막대형", "iconClass": "chartIconBase clustered-bar-icon" },
                                                        { "value": "stackedBar", "text": "누적 가로 막대형", "header": "누적 가로 막대형", "iconClass": "chartIconBase stacked-bar-icon" },
                                                        { "value": "100%StackedBar", "text": "100% 기준 누적 가로 막대형", "header": "100% 기준 누적 가로 막대형", "iconClass": "chartIconBase stacked100-bar-icon" }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "value": "area1", "text": "영역형 차트", "header": "영역형 차트", "iconClass": "chartIcon AreaChart", "childrenList": [
                                                {
                                                    "type": "dropdown-only",
                                                    "name": "areaChart",
                                                    "haslabel": true,
                                                    "text": "영역형 차트",
                                                    "dropdown": [
                                                        { "value": "area", "text": "영역형", "header": "영역형", "iconClass": "chartIconBase area-icon" },
                                                        { "value": "stackedArea", "text": "누적 영역형", "header": "누적 영역형", "iconClass": "chartIconBase stacked-area-icon" },
                                                        { "value": "100%StackedArea", "text": "100% 기준 누적 영역형", "header": "100% 기준 누적 영역형", "iconClass": "chartIconBase stacked100-area-icon" }
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            "value": "xyScatter1", "text": "XY(분산형) 차트", "header": "XY(분산형) 차트", "iconClass": "chartIcon XyScatterChart", "childrenList": [
                                                {
                                                    "type": "dropdown-only",
                                                    "name": "xyScatterChart",
                                                    "haslabel": true,
                                                    "text": "XY(분산형) 차트",
                                                    "dropdown": [
                                                        { "value": "xyScatter", "text": "XY(분산형)", "header": "XY(분산형)", "iconClass": "chartIconBase XYScatter-icon" },
                                                        { "value": "xyScatterLines", "text": "XY(분산형) 직선", "header": "XY(분산형) 직선", "iconClass": "chartIconBase XYScatter-line-icon" },
                                                        { "value": "xyScatterLinesNoMarkers", "text": "표식이 없는 XY(분산형) 직선", "header": "표식이 없는 XY(분산형) 직선", "iconClass": "chartIconBase XYScatter-line-noMarkers-icon" },
                                                        { "value": "xyScatterSmooth", "text": "XY(분산형) 곡선", "header": "XY(분산형) 곡선", "iconClass": "chartIconBase XYScatter-smooth-icon" },
                                                        { "value": "xyScatterSmoothNoMarkers", "text": "표식이 없는 XY(분산형) 곡선", "header": "표식이 없는 XY(분산형) 곡선", "iconClass": "chartIconBase XYScatter-smooth-noMarkers-icon" },
                                                        { "value": "bubble", "text": "거품형", "header": "거품형", "iconClass": "chartIconBase bubble-icon" }
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            "value": "radar", "text": "방사형 차트", "iconClass": "radarChartContainer ", "childrenList": [
                                                {
                                                    "type": "dropdown-only",
                                                    "name": "radarChart",
                                                    "haslabel": true,
                                                    "text": "방사형 차트",
                                                    "dropdown": [
                                                        { "value": "radar", "text": "방사형", "iconClass": "chartIconBase radar-icon" },
                                                        { "value": "radarFilled", "text": "채워진 방사형", "iconClass": "chartIconBase radarFilled-icon" },
                                                        { "value": "radarMarkers", "text": "방사형 표식", "iconClass": "chartIconBase radarMarkers-icon" },
                                                    ]
                                                },
                                            ]
                                        },
                                        { "value": "sunburst", "text": "선버스트", "iconClass": "sunburst-icon" },
                                        { "value": "treemap", "text": "트리맵", "iconClass": "treemap-icon" }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "group",
                            "collapseGroup": "groupInsert",
                            "items": [{
                                "value": "shape",
                                "name": "Shape",
                                "iconClass": "shape icon-text",
                                "type": "shape-panel",
                                "haslabel": true
                            }]
                        },
                        {
                            "type": "dropdown",
                            "iconClass": "glyphicon glyphicon-menu-down",
                            "name": "insertDropdown",
                            "header": "삽입",
                            "items": []
                        }
                    ]
                }
            ]
        },
        {
            "title": "수식",
            "name": "formulas",
            "collapse": ["*groupFormula"],
            "groups": [
                {
                    "tooltip": "수식",
                    "tools": [
                        {
                            "ignore": true,
                            "type": "group",
                            "tooltip": "합계",
                            "collapseGroup": "groupFormula",
                            "items": [
                                {
                                    "type": "icon-group",
                                    "iconClass": "glyphicon glyphicon-usd icon-text",
                                    "name": "autoSum",
                                    "haslabel": true,
                                    "text": "자동 합계",
                                    "header": "자동 합계",
                                    "dropdown": [
                                        { "value": "sum", "text": "합계" },
                                        { "value": "average", "text": "평균" },
                                        { "value": "count", "text": "숫자 개수" },
                                        { "value": "max", "text": "최대값" },
                                        { "value": "min", "text": "최소값" }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite Formula icon-text",
                            "name": "insertFormula",
                            "text": "수식 삽입",
                            "collapseGroup": "groupFormula"
                        },
                        {
                            "ignore": true,
                            "type": "icon",
                            "iconClass": "glyphicon glyphicon-paperclip icon-text",
                            "name": "nameManager",
                            "text": "이름 관리자",
                            "collapseGroup": "groupFormula"
                        },
                        {
                            "type": "dropdown",
                            "iconClass": "glyphicon glyphicon-menu-down",
                            "name": "setFormula",
                            "header": "수식",
                            "items": []
                        }
                    ]
                }, {
                    "tooltip": "지금 계산",
                    "tools": [
                        {
                            "type": "icon",
                            "iconClass": "sprite CalculationOptionsMenu icon-text",
                            "name": "calculateNow",
                            "text": "지금 계산"
                        }
                    ]
                }
            ]
        },
        {
            "title": "데이터",
            "name": "data",
            "collapse": ["groupDetail", "groupSort", "groupGroup"],
            "groups": [
                {
                    "tooltip": "정렬/필터",
                    "tools": [
                        {
                            "type": "icon",
                            "iconClass": "sprite SortAscendingWord",
                            "name": "sortAZ",
                            "text": "오름차순 정렬",
                            "collapseGroup": "groupSort"
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite SortDescendingWord",
                            "name": "sortZA",
                            "text": "내림차순 정렬",
                            "collapseGroup": "groupSort"
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite FiltersMenu",
                            "name": "filter",
                            "text": "필터 버튼 표시",
                            "collapseGroup": "groupSort"
                        },
                        {
                            "type": "dropdown",
                            "iconClass": "sprite SortFilterMenu",
                            "name": "sortAndFilter",
                            "text": "정렬 및 필터",
                            "header": "정렬 및 필터",
                            "items": []
                        }
                    ]
                },
                {
                    "tooltip": "그룹",
                    "tools": [
                        {
                            "type": "icon",
                            "iconClass": "sprite OutlineGroup",
                            "name": "group",
                            "text": "그룹",
                            "collapseGroup": "groupGroup"
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite OutlineUngroup",
                            "name": "ungroup",
                            "text": "그룹 해제",
                            "collapseGroup": "groupGroup"
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite ShowDetailsPage",
                            "name": "showDetail",
                            "text": "세부 정보 표시",
                            "collapseGroup": "groupDetail"
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite HideDetails",
                            "name": "hideDetail",
                            "text": "세부 정보 숨기기",
                            "collapseGroup": "groupDetail"
                        },
                        {
                            "type": "checkbox",
                            "checked": true,
                            "text": "아래 행에 정리",
                            "name": "summaryBelow",
                            "collapseGroup": "groupDetailSummary"
                        },
                        {
                            "type": "checkbox",
                            "checked": true,
                            "text": "오른쪽 열에 정리",
                            "name": "summaryRight",
                            "collapseGroup": "groupDetailSummary"
                        },
                        {
                            "type": "dropdown",
                            "iconClass": "sprite GroupTableStyleOptions",
                            "altIconClass": "glyphicon glyphicon-menu-right",
                            "name": "groupSetting",
                            "text": "그룹 설정",
                            "header": "그룹 설정",
                            "minWidth": "300px",
                            "items": ["summaryBelow", "summaryRight"]
                        }
                    ]
                },
                {
                    "tooltip": "데이터 유효성 검사",
                    "tools": [
                        {
                            "type": "icon",
                            "iconClass": "sprite DataValidationCircleInvalid icon-text",
                            "name": "circleInvalidData",
                            "text": "잘못된 데이터",
                            "toggle": true
                        },
                        {
                            "type": "icon",
                            "iconClass": "sprite DataValidation icon-text",
                            "name": "selectValidator",
                            "text": "유효성 검사기 선택",
                            "header": "데이터 유효성 검사기"
                        }
                    ]
                }
            ]
        },
        {
            "title": "보기",
            "name": "view",
            "collapse": ["*groupShow"],
            "groups": [
                {
                    "tooltip": "표시/숨기기",
                    "tools": [
                        {
                            "type": "checkbox",
                            "checked": true,
                            "text": "수식 입력줄",
                            "tooltip": "수식 입력줄 표시",
                            "collapseGroup": "groupShow",
                            "name": "showFormulaBar"
                        },
                        {
                            "type": "checkbox",
                            "checked": true,
                            "text": "눈금선",
                            "tooltip": "눈금선 표시",
                            "collapseGroup": "groupShow",
                            "name": "showGridlines"
                        },
                        {
                            "type": "checkbox",
                            "checked": true,
                            "text": "제목",
                            "tooltip": "제목 보기",
                            "collapseGroup": "groupShow",
                            "name": "showHeadings"
                        },
                        {
                            "type": "checkbox",
                            "checked": true,
                            "text": "시트 탭",
                            "tooltip": "시트 탭 표시",
                            "collapseGroup": "groupShow",
                            "name": "showSheetTabs"
                        },
                        {
                            "type": "dropdown",
                            "iconClass": "glyphicon glyphicon-menu-down",
                            "name": "showHideDropdown",
                            "header": "표시/숨기기",
                            "items": []
                        }
                    ]
                },
                {
                    "tools": [
                        {
                            "type": "group",
                            "items": [
                                {
                                    "type": "dropdown-only",
                                    "iconClass": "sprite FreezePanes icon-text",
                                    "name": "freezePanes",
                                    "haslabel": true,
                                    "text": "틀 고정",
                                    "dropdown": [
                                        { "value": "freezePanes", "text": "창 고정" },
                                        { "value": "freezeTopRow", "text": "첫 행 고정" },
                                        { "value": "freezeFirstColumn", "text": "첫 열 고정" },
                                        { "value": "freezeBottomRow", "text": "끝 행 고정" },
                                        { "value": "freezeLastColumn", "text": "마지막 열 고정" },
                                        "",
                                        { "value": "unfreeze", "text": "틀 고정 취소" }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "title": "표",
            "hidden": false,
            "name": "table",
            "groups": [
                {
                    tools: [
                        {
                            "type": "input",
                            "name": "tableName",
                            "text": "이름"
                        }
                    ]
                },
                {
                    "tools": [
                        {
                            "type": "group",
                            "tooltip": "슬라이서 삽입",
                            "items": [
                                {
                                    "type": "dropdown-only",
                                    "iconClass": "glyphicon glyphicon-filter icon-text",
                                    "name": "insertSlicer",
                                    "text": "슬라이서 삽입",
                                    "haslabel": true,
                                    "dropdown": [
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "tools": [
                        {
                            "type": "group",
                            "tooltip": "스타일 옵션",
                            "items": [
                                {
                                    "type": "dropdown-only",
                                    "iconClass": "glyphicon glyphicon-info-sign icon-text",
                                    "name": "tableOption",
                                    "text": "스타일 옵션",
                                    "haslabel": true,
                                    "dropdown": [
                                        { "value": "tableHeaderRow", "text": "머리글 행", "toggle": true, "checked": true },
                                        { "value": "tableTotalRow", "text": "요약 행", "toggle": true },
                                        { "value": "tableFirstColumn", "text": "첫째 열", "toggle": true },
                                        { "value": "tableLastColumn", "text": "마지막 열", "toggle": true },
                                        { "value": "tableBandedRows", "text": "줄무늬 행", "toggle": true, "checked": true },
                                        { "value": "tableBandedColumns", "text": "줄무늬 열", "toggle": true },
                                        { "value": "tableFilterButton", "text": "필터 버튼", "toggle": true }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "tools": [
                        {
                            "type": "group",
                            "tooltip": "표 스타일",
                            "items": [
                                {
                                    "type": "icon-group",
                                    "iconClass": "glyphicon glyphicon-th",
                                    "name": "tableStyles",
                                    "text": "표 스타일",
                                    "header": "표 스타일",
                                    "dropdown": [
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "title": "차트",
            "hidden": false,
            "name": "chart",
            "groups": [
                {
                    "tools": [
                        {
                            "type": "group",
                            "tooltip": "유형",
                            "collapseGroup": "groupInsert",
                            "items": [
                                {
                                    "type": "dropdown-only",
                                    "iconClass": "chartIconBase ChartInsert icon-text",
                                    "name": "typeChart",
                                    "haslabel": true,
                                    "text": "유형",
                                    "dropdown": [
                                        {
                                            "value": "column1", "text": "세로 막대형 차트", "header": "세로 막대형 차트", "findCss": "세로 막대형 차트 유형 변경됨", "iconClass": "chartIcon ColumnChart", "childrenList": [
                                                {
                                                    "type": "dropdown-only",
                                                    "name": "columnChartTypeChanged",
                                                    "haslabel": true,
                                                    "text": "세로 막대형 차트 유형 변경됨",
                                                    "dropdown": [
                                                        { "value": "columnClustered", "text": "묶은 세로 막대형", "header": "묶은 세로 막대형", "iconClass": "chartIconBase clustered-column-icon" },
                                                        { "value": "columnStacked", "text": "누적 세로 막대형", "header": "누적 세로 막대형", "iconClass": "chartIconBase stacked-column-icon" },
                                                        { "value": "columnStacked100", "text": "100% 기준 누적 세로 막대형", "header": "100% 기준 누적 세로 막대형", "iconClass": "chartIconBase stacked100-column-icon" }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "value": "line1", "text": "Line Chart", "header": "꺾은선형 차트", "findCss": "Line Chart Type Changed", "iconClass": "chartIcon LineChart", "childrenList": [
                                                {
                                                    "type": "dropdown-only",
                                                    "name": "lineChartTypeChanged",
                                                    "haslabel": true,
                                                    "text": "꺾은선형 차트 유형 변경됨",
                                                    "dropdown": [
                                                        { "value": "line", "text": "선형", "header": "선형", "iconClass": "chartIconBase line-icon" },
                                                        { "value": "lineStacked", "text": "누적 꺾은선형", "header": "누적 꺾은선형", "iconClass": "chartIconBase stacked-line-icon" },
                                                        { "value": "lineStacked100", "text": "100% 기준 누적 꺾은선형", "header": "100% 기준 누적 꺾은선형", "iconClass": "chartIconBase stacked100-line-icon" },
                                                        { "value": "lineMarkers", "text": "표식이 있는 꺾은선형", "header": "표식이 있는 꺾은선형", "iconClass": "chartIconBase line-markers-icon" },
                                                        { "value": "lineMarkersStacked", "text": "표식이 있는 누적 꺾은선형", "header": "표식이 있는 누적 꺾은선형", "iconClass": "chartIconBase stacked-line-markers-icon" },
                                                        { "value": "lineMarkersStacked100", "text": "표식이 있는 100% 기준 누적 꺾은선형", "header": "표식이 있는 100% 기준 누적 꺾은선형", "iconClass": "chartIconBase stacked100-line-markers-icon" }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "value": "pie1", "text": "원형 차트", "header": "원형 차트", "findCss": "원형 차트 유형 변경됨", "iconClass": "chartIcon PieChart", "childrenList": [
                                                {
                                                    "type": "dropdown-only",
                                                    "name": "pieChartTypeChanged",
                                                    "haslabel": true,
                                                    "text": "원형 차트 유형 변경됨",
                                                    "dropdown": [
                                                        { "value": "pie", "text": "원형", "header": "원형", "iconClass": "chartIconBase pie-icon" },
                                                        { "value": "doughnut", "text": "도넛형", "header": "도넛형", "iconClass": "chartIconBase doughnut-icon" }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "value": "bar1", "text": "막대형 차트", "header": "막대형 차트", "findCss": "막대형 차트 유형 변경됨", "iconClass": "chartIcon BarChart", "childrenList": [
                                                {
                                                    "type": "dropdown-only",
                                                    "name": "barChartTypeChanged",
                                                    "haslabel": true,
                                                    "text": "막대형 차트 유형 변경됨",
                                                    "dropdown": [
                                                        { "value": "barClustered", "text": "묶은 가로 막대형", "header": "묶은 가로 막대형", "iconClass": "chartIconBase clustered-bar-icon" },
                                                        { "value": "barStacked", "text": "누적 가로 막대형", "header": "누적 가로 막대형", "iconClass": "chartIconBase stacked-bar-icon" },
                                                        { "value": "barStacked100", "text": "100% 기준 누적 가로 막대형", "header": "100% 기준 누적 가로 막대형", "iconClass": "chartIconBase stacked100-bar-icon" }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "value": "area1", "text": "영역형 차트", "header": "영역형 차트", "findCss": "영역형 차트 유형 변경됨", "iconClass": "chartIcon AreaChart", "childrenList": [
                                                {
                                                    "type": "dropdown-only",
                                                    "name": "areaChartTypeChanged",
                                                    "haslabel": true,
                                                    "text": "영역형 차트 유형 변경됨",
                                                    "dropdown": [
                                                        { "value": "area", "text": "영역형", "header": "영역형", "iconClass": "chartIconBase area-icon" },
                                                        { "value": "areaStacked", "text": "누적 영역형", "header": "누적 영역형", "iconClass": "chartIconBase stacked-area-icon" },
                                                        { "value": "areaStacked100", "text": "100% 기준 누적 영역형", "header": "100% 기준 누적 영역형", "iconClass": "chartIconBase stacked100-area-icon" }
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            "value": "xyScatter1", "text": "XY(분산형) 차트", "header": "XY(분산형) 차트", "findCss": "XY분산형 차트 유형 변경됨", "iconClass": "chartIcon XyScatterChart", "childrenList": [
                                                {
                                                    "type": "dropdown-only",
                                                    "name": "xyScatterChartTypeChanged",
                                                    "haslabel": true,
                                                    "text": "XY분산형 차트 유형 변경됨",
                                                    "dropdown": [
                                                        { "value": "xyScatter", "text": "XY(분산형)", "header": "XY(분산형)", "iconClass": "chartIconBase XYScatter-icon" },
                                                        { "value": "xyScatterLines", "text": "XY(분산형) 직선", "header": "XY(분산형) 직선", "iconClass": "chartIconBase XYScatter-line-icon" },
                                                        { "value": "xyScatterLinesNoMarkers", "text": "표식이 없는 XY(분산형) 직선", "header": "표식이 없는 XY(분산형) 직선", "iconClass": "chartIconBase XYScatter-line-noMarkers-icon" },
                                                        { "value": "xyScatterSmooth", "text": "XY(분산형) 곡선", "header": "XY(분산형) 곡선", "iconClass": "chartIconBase XYScatter-smooth-icon" },
                                                        { "value": "xyScatterSmoothNoMarkers", "text": "표식이 없는 XY(분산형) 곡선", "header": "표식이 없는 XY(분산형) 곡선", "iconClass": "chartIconBase XYScatter-smooth-noMarkers-icon" },
                                                        { "value": "bubble", "text": "거품형", "header": "거품형", "iconClass": "chartIconBase bubble-icon" }
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            "value": "radar1", "text": "방사형 차트", "findCss": "방사형 차트 유형 변경됨", "iconClass": "radarChartContainer ", "childrenList": [
                                                {
                                                    "type": "dropdown-only",
                                                    "name": "radarChartTypeChanged",
                                                    "haslabel": true,
                                                    "text": "방사형 차트 변경됨",
                                                    "dropdown": [
                                                        { "value": "radar", "text": "방사형", "iconClass": "radar-icon" },
                                                        { "value": "radarFilled", "text": "채워진 방사형", "iconClass": "radarFilled-icon" },
                                                        { "value": "radarMarkers", "text": "방사형 표식", "iconClass": "radarMarkers-icon" },
                                                    ]
                                                },
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "tools": [
                        {
                            "type": "group",
                            "tooltip": "빠른 레이아웃",
                            "items": [
                                {
                                    "type": "dropdown-quickLayout",
                                    "iconClass": "icon-chart-base-middle icon-chart-quick-layout icon-text",
                                    "name": "chartQuickLayout",
                                    "text": "빠른 레이아웃",
                                    "haslabel": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "tools": [
                        {
                            "type": "group",
                            "tooltip": "요소 추가",
                            "items": [
                                {
                                    "type": "dropdown-addChartElement",
                                    "iconClass": "icon-chart-base-middle icon-chart-add-element icon-text",
                                    "name": "addChartElement",
                                    "text": "요소",
                                    "haslabel": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "tools": [
                        {
                            "type": "group",
                            "tooltip": "색",
                            "items": [
                                {
                                    "type": "dropdown-colorTemplate",
                                    "iconClass": "icon-chart-base-middle icon-chart-change-color icon-text",
                                    "name": "chart-color",
                                    "text": "색",
                                    "haslabel": true,
                                    "chartColors": {
                                        "colorful": {
                                            "name": 'Colorful', "colors": [
                                                {
                                                    tip: '파랑, 주황, 회색, 황금색, 파랑, 녹색',
                                                    items: ['accent 1', 'accent 2', 'accent 3', 'accent 4', 'accent 5', 'accent 6']
                                                },
                                                {
                                                    tip: '파랑, 주황, 회색, 황금색, 파랑, 녹색',
                                                    items: ['accent 1', 'accent 3', 'accent 5', 'accent 1 -40', 'accent 3 -40', 'accent 5 -40']
                                                },
                                                {
                                                    tip: '파랑, 주황, 회색, 황금색, 파랑, 녹색',
                                                    items: ['accent 2', 'accent 4', 'accent 6', 'accent 2 -40', 'accent 4 -40', 'accent 6 -40']
                                                },
                                                {
                                                    tip: '파랑, 주황, 회색, 황금색, 파랑, 녹색',
                                                    items: ['accent 6', 'accent 5', 'accent 4', 'accent 6 -40', 'accent 5 -40', 'accent 4 -40']
                                                }
                                            ]
                                        },
                                        "monochromatic": {
                                            "name": 'Monochromatic', "colors": [
                                                {
                                                    tip: '파랑 그라데이션, 어둡게-밝게',
                                                    items: { startColor: 'accent 1 -50', stopColor: 'accent 1 50' }
                                                },
                                                {
                                                    tip: '주황 그라데이션, 어둡게-밝게',
                                                    items: { startColor: 'accent 2 -50', stopColor: 'accent 2 50' }
                                                },
                                                {
                                                    tip: '회색 그라데이션, 어둡게-밝게',
                                                    items: { startColor: 'accent 3 -50', stopColor: 'accent 3 50' }
                                                },
                                                {
                                                    tip: '황금색 그라데이션, 어둡게-밝게',
                                                    items: { startColor: 'accent 4 -50', stopColor: 'accent 4 50' }
                                                },
                                                {
                                                    tip: '파랑 그라데이션, 어둡게-밝게',
                                                    items: { startColor: 'accent 5 -50', stopColor: 'accent 5 50' }
                                                },
                                                {
                                                    tip: '녹색 그라데이션, 어둡게-밝게',
                                                    items: { startColor: 'accent 6 -50', stopColor: 'accent 6 50' }
                                                },
                                                {
                                                    tip: '진한 회색, 연한 회색, 회색, 진한 회색, 연한 회색, 회색',
                                                    items: ['text 1 11.5', 'text 1 45', 'text 1 25', 'text 1 1.5', 'text 1 70', 'text 1 40']
                                                },
                                                {
                                                    tip: '파랑 그라데이션, 밝게-어둡게',
                                                    items: { startColor: 'accent 1 50', stopColor: 'accent 1 -50' }
                                                },
                                                {
                                                    tip: '주황 그라데이션, 밝게-어둡게',
                                                    items: { startColor: 'accent 2 50', stopColor: 'accent 2 -50' }
                                                },
                                                {
                                                    tip: '회색 그라데이션, 밝게-어둡게',
                                                    items: { startColor: 'accent 3 50', stopColor: 'accent 3 -50' }
                                                },
                                                {
                                                    tip: '황금색 그라데이션, 밝게-어둡게',
                                                    items: { startColor: 'accent 4 50', stopColor: 'accent 4 -50' }
                                                },
                                                {
                                                    tip: '파랑 그라데이션, 밝게-어둡게',
                                                    items: { startColor: 'accent 5 50', stopColor: 'accent 5 -50' }
                                                },
                                                {
                                                    tip: '녹색 그라데이션, 밝게-어둡게',
                                                    items: { startColor: 'accent 6 50', stopColor: 'accent 6 -50' }
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "tools": [
                        {
                            "type": "icon",
                            "iconClass": "icon-chart-base-middle switchRowColumn icon-text",
                            "name": "switchRowCol",
                            "text": "행/열 전환",
                        },
                    ]
                },
            ]
        },
        {
            "title": "도형",
            "hidden": true,
            "name": "shape",
            "groups": [{
                "tools": [{
                    "type": "shape-color-preset",
                    "name": "shapeColorPreset",
                    "type": "shapeColorPreset",
                    "text": "그룹 도형",
                    "items": [{
                        "type": "icon-group",
                        "value": "rgb(68, 114, 194)",
                        "text": "파랑"
                    }, {
                        "type": "icon-group",
                        "value": "rgb(255, 215, 0)",
                        "text": "황금색"
                    }, {
                        "type": "icon-group",
                        "value": "rgb(163, 163, 163)",
                        "text": "회색"
                    }, {
                        "type": "icon-group",
                        "value": "rgb(113, 171, 72)",
                        "text": "녹색"
                    }, {
                        "type": "icon-group",
                        "value": "rgb(255, 165, 0)",
                        "text": "주황"
                    }]
                }, {
                    "type": "group",
                    "tooltip": "도형 색 설정",
                    "items": [{
                        "type": "setcolor-group",
                        "iconClass": "sprite FillBackColorSplitDropdown",
                        "name": "shapeFillColor",
                        "text": "채우기 색",
                        "colorPickerOptions": { "nofill": { "show": false, "text": "채우기 없음", "color": "white" }, "header": "채우기 색" }
                    }, {
                        "type": "setcolor-group",
                        "iconClass": "glyphicon glyphicon-pencil",
                        "name": "shapeOutlineColor",
                        "text": "채우기 색",
                        "colorPickerOptions": { "nofill": { "show": false, "text": "채우기 없음", "color": "white" }, "header": "윤곽선 색" }
                    }, {
                        "type": "dropdown-only",
                        "iconClass": "glyphicon glyphicon-minus icon-text",
                        "name": "shapeLineStyle",
                        "haslabel": true,
                        "text": "선 스타일",
                        "header": "선 스타일",
                        "dropdown": [
                            { "value": "solid", "iconClass": "line-style-thin", "hiddenLabel": true },
                            { "value": "squareDot", "iconClass": "line-style-dotted", "hiddenLabel": true },
                            { "value": "dash", "iconClass": "line-style-dashed", "hiddenLabel": true },
                            { "value": "longDash", "iconClass": "line-style-medium-dashed", "hiddenLabel": true },
                            { "value": "dashDot", "iconClass": "line-style-dash-dot", "hiddenLabel": true },
                            { "value": "longDashDot", "iconClass": "line-style-medium-dash-dot", "hiddenLabel": true },
                            { "value": "longDashDotDot", "iconClass": "line-style-medium-dash-dot-dot", "hiddenLabel": true },
                            { "value": "sysDash", "iconClass": "line-style-slanted-dashed", "hiddenLabel": true },
                            { "value": "sysDot", "iconClass": "line-style-medium-dotted", "hiddenLabel": true },
                            { "value": "sysDashDot", "iconClass": "line-style-medium-dashed-dot", "hiddenLabel": true },
                            { "value": "dashDotDot", "iconClass": "line-style-dash-dot-dot", "hiddenLabel": true },
                            { "value": "roundDot", "iconClass": "line-style-dotted", "hiddenLabel": true }
                        ]
                    }]
                }, {
                    "type": "icon",
                    "iconClass": "icon-text shape-group",
                    "name": "shapeGroup",
                    "text": "그룹 도형",
                }]
            }]
        }
    ]
};
