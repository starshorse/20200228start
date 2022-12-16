var uiResource = {
    toolBar: {
        zoom: {
            title: "확대/축소",
            zoomOption: {
                twentyFivePercentSize: "25%",
                fiftyPercentSize: "50%",
                seventyFivePercentSize: "75%",
                defaultSize: "100%",
                oneHundredTwentyFivePercentSize: "125%",
                oneHundredFiftyPercentSize: "150%",
                twoHundredPercentSize: "200%",
                threeHundredPercentSize: "300%",
                fourHundredPercentSize: "400%"
            }
        },
        clear: {
            title: "지우기",
            clearActions: {
                clearAll: "모두 지우기",
                clearFormat: "서식 지우기"
            }
        },
        showInspector: "검사기 표시",
        hideInspector: "검사기 숨기기",
        importJson: "JSON 가져오기",
        exportJson: "JSON 내보내기",
        insertTable: "표 삽입",
        insertPicture: "그림 삽입",
        insertComment: "메모 삽입",
        insertSparkline: "스파크라인 삽입",
        insertSlicer: "슬라이서 삽입"
    },
    tabs: {
        spread: "Spread",
        sheet: "시트",
        cell: "셀",
        table: "표",
        data: "데이터",
        comment: "메모",
        picture: "그림",
        sparklineEx: "스파크라인",
        barCodeEx: "바코드",
        slicer: "슬라이서",
        chart: "차트"
    },
    spreadTab: {
        general: {
            title: "일반",
            allowDragDrop: "끌어서 놓기 허용",
            allowDragFill: "끌어서 채우기 허용",
            allowZoom: "확대/축소 허용",
            allowOverflow: "오버플로 허용",
            showDragFillSmartTag: "끌어서 채우기 스마트 태그 표시",
            allowUserDeselect: "사용자 선택 취소 허용"
        },
        calculation: {
            title: "계산",
            referenceStyle: {
                title: "참조 스타일",
                R1C1: "R1C1",
                A1: "A1"
            }
        },
        scrollBar: {
            title: "스크롤 막대",
            showVertical: "세로 스크롤 막대",
            showHorizontal: "가로 스크롤 막대",
            maxAlign: "스크롤 막대 최대 맞춤",
            showMax: "스크롤 막대 최대 표시",
            scrollIgnoreHidden: "숨겨진 행 또는 열 무시 스크롤"
        },
        tabStip: {
            title: "연속 탭",
            visible: "연속 탭 표시",
            newTabVisible: "새 탭 표시",
            editable: "연속 탭 편집 가능",
            showTabNavigation: "탭 탐색 표시"
        },
        color: {
            title: "색",
            spreadBackcolor: "Spread 배경색",
            grayAreaBackcolor: "회색 영역 배경색"
        },
        tip: {
            title: "팁",
            showDragDropTip: "끌어서 놓기 팁 표시",
            showDragFillTip: "끌어서 채우기 팁 표시",
            scrollTip: {
                title: "스크롤 팁",
                values: {
                    none: "없음",
                    horizontal: "가로",
                    vertical: "세로",
                    both: "둘 다"
                }
            },
            resizeTip: {
                title: "팁 크기 조정",
                values: {
                    none: "없음",
                    column: "열",
                    row: "행",
                    both: "둘 다"
                }
            }
        },
        sheets: {
            title: "시트",
            sheetName: "시트 이름",
            sheetVisible: "시트 표시"
        },
        cutCopyIndicator: {
            title: "잘라내기/복사 표시기",
            visible: "표시기 표시",
            borderColor: "테두리 색"
        },
        dragDropFill: {
            title: "끌어서 놓기 / 끌어서 채우기",
            canUserDragDrop: "사용자 끌어서 놓기 가능",
            canUserDragFill: "사용자 끌어서 채우기 가능",
            showDragFillSmartTag: "끌어서 채우기 스마트 태그 표시",
            dragFillType: {
                title: "기본 끌어서 채우기 유형",
                values: {
                    auto: "자동",
                    copyCells: "셀 복사",
                    fillSeries: "연속 데이터 채우기",
                    fillFormattingOnly: "서식만 채우기",
                    fillWithoutFormatting: "서식 없이 채우기"
                }
            }
        },
        spreadTheme: {
            title: "Spread 테마",
            theme: {
                title: "테마",
                option: {
                    spreadJS: "SpreadJS",
                    excel2013White: "Excel2013 흰색",
                    excel2013LightGray: "Excel2013 연한 회색",
                    excel2013DarkGray: "Excel2013 진한 회색",
                    excel2016Colorful: "Excel2016 색상형",
                    excel2016DarkGray: "Excel2016 진한 회색"
                }
            }
        },
        resizeZeroIndicator: {
            title: "숨기기 표식",
            option: {
                defaultValue: "기본값",
                enhanced: "확장"
            }
        }
    },
    sheetTab: {
        general: {
            title: "일반",
            rowCount: "행",
            columnCount: "열",
            name: "이름",
            tabColor: "탭 색"
        },
        freeze: {
            title: "고정",
            frozenRowCount: "머리글 행",
            frozenColumnCount: "머리글 열",
            trailingFrozenRowCount: "바닥글 행",
            trailingFrozenColumnCount: "바닥글 열",
            frozenLineColor: "색",
            freezePane: "고정",
            unfreeze: "고정 취소"
        },
        gridLine: {
            title: "눈금선",
            showVertical: "세로 표시",
            showHorizontal: "가로 표시",
            color: "색"
        },
        header: {
            title: "머리글",
            showRowHeader: "행 머리글 표시",
            showColumnHeader: "열 머리글 표시"
        },
        selection: {
            title: "선택",
            borderColor: "테두리 색",
            backColor: "배경색",
            hide: "선택 항목 숨기기",
            policy: {
                title: "정책",
                values: {
                    single: "단일",
                    range: "범위",
                    multiRange: "다중 범위"
                }
            },
            unit: {
                title: "단위",
                values: {
                    cell: "셀",
                    row: "행",
                    column: "열"
                }
            }
        },
        protection: {
            title: "보호",
            protectSheet: "시트 보호",
            selectLockCells: "잠긴 셀 선택",
            selectUnlockedCells: "잠기지 않은 셀 선택",
            sort: "정렬",
            useAutoFilter: "자동 필터 사용",
            resizeRows: "행 크기 조정",
            resizeColumns: "열 크기 조정",
            editObjects: "개체 편집"
        }
    },
    cellTab: {
        style: {
            title: "스타일",
            fontFamily: "글꼴",
            fontSize: "크기",
            foreColor: "전경색",
            backColor: "배경색",
            borders: {
                title: "테두리",
                values: {
                    bottom: "아래쪽 테두리",
                    top: "위쪽 테두리",
                    left: "왼쪽 테두리",
                    right: "오른쪽 테두리",
                    none: "테두리 없음",
                    all: "모든 테두리",
                    outside: "바깥쪽 테두리",
                    thick: "굵은 상자 테두리",
                    doubleBottom: "아래쪽 이중 테두리",
                    thickBottom: "굵은 아래쪽 테두리",
                    topBottom: "위쪽/아래쪽 테두리",
                    topThickBottom: "위쪽/굵은 아래쪽 테두리",
                    topDoubleBottom: "위쪽/아래쪽 이중 테두리"
                }
            }
        },
        border: {
            title: "테두리",
            label: "테두리",
            rangeBorderLine: "선 스타일",
            rangeBorderColor: "선 색",
            noBorder: "없음",
            outsideBorder: "바깥쪽 테두리",
            insideBorder: "안쪽 테두리",
            allBorder: "모든 테두리",
            leftBorder: "왼쪽 테두리",
            innerVertical: "안쪽 세로",
            rightBorder: "오른쪽 테두리",
            topBorder: "위쪽 테두리",
            innerHorizontal: "안쪽 가로",
            bottomBorder: "아래쪽 테두리"
        },
        alignment: {
            title: "맞춤",
            top: "위쪽",
            middle: "중간",
            bottom: "아래쪽",
            left: "왼쪽",
            center: "가운데",
            right: "오른쪽",
            wrapText: "텍스트 줄 바꿈",
            decreaseIndent: "내어쓰기",
            increaseIndent: "들여쓰기"
        },
        format: {
            title: "서식",
            commonFormat: {
                option: {
                    general: "일반",
                    number: "숫자",
                    currency: "통화",
                    accounting: "회계",
                    shortDate: "간단한 날짜",
                    longDate: "자세한 날짜",
                    time: "시간",
                    percentage: "백분율",
                    fraction: "분수",
                    scientific: "공학용",
                    text: "텍스트"
                }
            },
            percentValue: "0%",
            commaValue: "#,##0.00; (#,##0.00); \"-\"??;@",
            custom: "사용자 정의",
            setButton: "설정"
        },
        merge: {
            title: "셀 병합",
            mergeCells: "병합",
            unmergeCells: "분할"
        },
        cellType: {
            title: "셀 유형"
        },
        conditionalFormat: {
            title: "조건부 서식",
            useConditionalFormats: "조건부 서식"
        },
        protection: {
            title: "보호",
            lock: "잠김",
            sheetIsProtected: "시트가 보호되어 있음",
            sheetIsUnprotected: "시트가 보호되지 않음"
        }
    },
    tableTab: {
        tableStyle: {
            title: "표 스타일",
            groupTitle: {
                light: "밝게",
                medium: "보통",
                dark: "어둡게"
            },
            light: {
                none: "없음",
                light1: "표 스타일 밝게 1",
                light2: "표 스타일 밝게 2",
                light3: "표 스타일 밝게 3",
                light4: "표 스타일 밝게 4",
                light5: "표 스타일 밝게 5",
                light6: "표 스타일 밝게 6",
                light7: "표 스타일 밝게 7",
                light8: "표 스타일 밝게 8",
                light9: "표 스타일 밝게 9",
                light10: "표 스타일 밝게 10",
                light11: "표 스타일 밝게 11",
                light12: "표 스타일 밝게 12",
                light13: "표 스타일 밝게 13",
                light14: "표 스타일 밝게 14",
                light15: "표 스타일 밝게 15",
                light16: "표 스타일 밝게 16",
                light17: "표 스타일 밝게 17",
                light18: "표 스타일 밝게 18",
                light19: "표 스타일 밝게 19",
                light20: "표 스타일 밝게 20",
                light21: "표 스타일 밝게 21"
            },
            medium: {
                medium1: "표 스타일 보통 1",
                medium2: "표 스타일 보통 2",
                medium3: "표 스타일 보통 3",
                medium4: "표 스타일 보통 4",
                medium5: "표 스타일 보통 5",
                medium6: "표 스타일 보통 6",
                medium7: "표 스타일 보통 7",
                medium8: "표 스타일 보통 8",
                medium9: "표 스타일 보통 9",
                medium10: "표 스타일 보통 10",
                medium11: "표 스타일 보통 11",
                medium12: "표 스타일 보통 12",
                medium13: "표 스타일 보통 13",
                medium14: "표 스타일 보통 14",
                medium15: "표 스타일 보통 15",
                medium16: "표 스타일 보통 16",
                medium17: "표 스타일 보통 17",
                medium18: "표 스타일 보통 18",
                medium19: "표 스타일 보통 19",
                medium20: "표 스타일 보통 20",
                medium21: "표 스타일 보통 21",
                medium22: "표 스타일 보통 22",
                medium23: "표 스타일 보통 23",
                medium24: "표 스타일 보통 24",
                medium25: "표 스타일 보통 25",
                medium26: "표 스타일 보통 26",
                medium27: "표 스타일 보통 27",
                medium28: "표 스타일 보통 28"
            },
            dark: {
                dark1: "표 스타일 어둡게 1",
                dark2: "표 스타일 어둡게 2",
                dark3: "표 스타일 어둡게 3",
                dark4: "표 스타일 어둡게 4",
                dark5: "표 스타일 어둡게 5",
                dark6: "표 스타일 어둡게 6",
                dark7: "표 스타일 어둡게 7",
                dark8: "표 스타일 어둡게 8",
                dark9: "표 스타일 어둡게 9",
                dark10: "표 스타일 어둡게 10",
                dark11: "표 스타일 어둡게 11"
            }
        },
        general: {
            title: "일반",
            tableName: "이름"
        },
        options: {
            title: "옵션",
            filterButton: "필터 단추",
            headerRow: "머리글 행",
            totalRow: "요약 행",
            bandedRows: "줄무늬 행",
            bandedColumns: "줄무늬 열",
            firstColumn: "첫째 열",
            lastColumn: "마지막 열"
        }
    },
    dataTab: {
        sort: {
            title: "정렬 및 필터",
            asc: "오름차순 정렬",
            desc: "내림차순 정렬",
            filter: "필터"
        },
        group: {
            title: "그룹",
            group: "그룹",
            ungroup: "그룹 해제",
            showDetail: "세부 정보 표시",
            hideDetail: "세부 정보 숨기기",
            showRowRangeGroup: "행 범위 그룹 표시",
            showColumnRangeGroup: "열 범위 그룹 표시"
        },
        dataValidation: {
            title: "데이터 유효성 검사",
            setButton: "설정",
            clearAllButton: "모두 지우기",
            circleInvalidData: "잘못된 데이터",
            setting: {
                title: "설정",
                values: {
                    validatorType: {
                        title: "유효성 검사기 유형",
                        option: {
                            anyValue: "모든 값",
                            number: "숫자",
                            list: "목록",
                            formulaList: "수식 목록",
                            date: "날짜",
                            textLength: "텍스트 길이",
                            custom: "사용자 정의"
                        }
                    },
                    ignoreBlank: "공백 무시",
                    validatorComparisonOperator: {
                        title: "연산자",
                        option: {
                            between: "해당 범위",
                            notBetween: "제외 범위",
                            equalTo: "같음",
                            notEqualTo: "같지 않음",
                            greaterThan: ">",
                            lessThan: "<",
                            greaterThanOrEqualTo: ">=",
                            lessThanOrEqualTo: "<="
                        }
                    },
                    number: {
                        minimum: "최소값",
                        maximum: "최대값",
                        value: "값",
                        isInteger: "정수"
                    },
                    source: "원본",
                    date: {
                        startDate: "시작 날짜",
                        endDate: "종료 날짜",
                        value: "값",
                        isTime: "시간"
                    },
                    formula: "수식"
                }
            },
            inputMessage: {
                title: "설명 메시지",
                values: {
                    showInputMessage: "셀을 선택하면 표시",
                    title: "제목",
                    message: "메시지"
                }
            },
            highlightStyle:{
                highType:"Type",
                title:"Highlight Style",
                color:"Color",
                type:{
                    circle:"Circle",
                    dogear:"Dogear",
                    icon:"Icon"
                },
                position:"Position",
                dogearPosition:{
                    tl:"Top Left",
                    tr:"Top Right",
                    bl:"Bottom Left",
                    br:"Bottom Right"
                },
                iconPosition:{
                   ol:"Outside Left",
                   or:"Outside Right" 
                }
            },
            errorAlert: {
                title: "오류 메시지",
                values: {
                    showErrorAlert: "잘못된 데이터가 입력 된 후 표시",
                    alertType: {
                        title: "알림 유형",
                        option: {
                            stop: "중지",
                            warning: "경고",
                            information: "정보"
                        }
                    },
                    title: "제목",
                    message: "메시지"
                }
            },
        }
    },
    commentTab: {
        general: {
            title: "일반",
            dynamicSize: "동적 크기",
            dynamicMove: "동적 이동",
            lockText: "텍스트 잠금",
            showShadow: "그림자 표시"
        },
        font: {
            title: "글꼴",
            fontFamily: "글꼴",
            fontSize: "크기",
            fontStyle: {
                title: "스타일",
                values: {
                    normal: "기본",
                    italic: "기울임꼴",
                    oblique: "오블리크",
                    inherit: "상속"
                }
            },
            fontWeight: {
                title: "두께",
                values: {
                    normal: "기본",
                    bold: "굵게",
                    bolder: "더 굵게",
                    lighter: "더 얇게"
                }
            },
            textDecoration: {
                title: "꾸미기",
                values: {
                    none: "없음",
                    underline: "밑줄",
                    overline: "윗줄",
                    linethrough: "취소선"
                }
            }
        },
        border: {
            title: "테두리",
            width: "너비",
            style: {
                title: "스타일",
                values: {
                    none: "없음",
                    hidden: "숨김",
                    dotted: "점선",
                    dashed: "파선",
                    solid: "단색",
                    double: "이중 실선",
                    groove: "오목",
                    ridge: "볼록",
                    inset: "넣기",
                    outset: "빼기"
                }
            },
            color: "색"
        },
        appearance: {
            title: "모양",
            horizontalAlign: {
                title: "가로",
                values: {
                    left: "왼쪽",
                    center: "가운데",
                    right: "오른쪽",
                    general: "일반"
                }
            },
            displayMode: {
                title: "표시 모드",
                values: {
                    alwaysShown: "항상 표시",
                    hoverShown: "마우스가 위치하면 표시"
                }
            },
            foreColor: "전경색",
            backColor: "배경색",
            padding: "안쪽 여백",
            zIndex: "Z-인덱스",
            opacity: "불투명"
        }
    },
    pictureTab: {
        general: {
            title: "일반",
            moveAndSize: "위치와 크기 변함",
            moveAndNoSize: "위치만 변함",
            noMoveAndSize: "변하지 않음",
            fixedPosition: "고정 위치"
        },
        border: {
            title: "테두리",
            width: "너비",
            radius: "반경",
            style: {
                title: "스타일",
                values: {
                    solid: "단색",
                    dotted: "점선",
                    dashed: "파선",
                    double: "이중 실선",
                    groove: "오목",
                    ridge: "볼록",
                    inset: "넣기",
                    outset: "빼기"
                }
            },
            color: "색"
        },
        appearance: {
            title: "모양",
            stretch: {
                title: "늘이기",
                values: {
                    stretch: "늘이기",
                    center: "가운데",
                    zoom: "확대/축소",
                    none: "없음"
                }
            },
            backColor: "배경색"
        }
    },
    sparklineExTab: {
        pieSparkline: {
            title: "원형 스파크라인 설정",
            values: {
                percentage: "백분율",
                color: "색 ",
                setButton: "설정"
            }
        },
        areaSparkline: {
            title: "영역 스파크라인 설정",
            values: {
                line1: "선 1",
                line2: "선 1",
                minimumValue: "최소값",
                maximumValue: "최대값",
                points: "점",
                positiveColor: "양수 색",
                negativeColor: "음수 색",
                setButton: "설정"
            }
        },
        boxplotSparkline: {
            title: "상자 그림 스파크라인 설정",
            values: {
                points: "점",
                boxplotClass: "상자 그림 클래스",
                scaleStart: "크기 조정 시작",
                scaleEnd: "크기 조정 종료",
                acceptableStart: "허용 가능한 시작",
                acceptableEnd: "허용 가능한 끝",
                colorScheme: "색 구성표",
                style: "스타일",
                showAverage: "평균 표시",
                vertical: "세로",
                setButton: "설정"
            }
        },
        bulletSparkline: {
            title: "글머리 기호 스파크라인 설정",
            values: {
                measure: "측정",
                target: "대상",
                maxi: "최대값",
                forecast: "예측",
                good: "좋음",
                bad: "나쁨",
                tickunit: "눈금 단위",
                colorScheme: "색 구성표",
                vertical: "세로",
                setButton: "설정"
            }
        },
        cascadeSparkline: {
            title: "계단식 스파크라인 설정",
            values: {
                pointsRange: "점 범위",
                pointIndex: "점",
                minimum: "최소값",
                maximum: "최대값",
                positiveColor: "양수 색",
                negativeColor: "음수 색",
                labelsRange: "레이블 범위",
                vertical: "세로",
                setButton: "설정"
            }
        },
        compatibleSparkline: {
            title: "호환되는 스파크라인 설정",
            values: {
                data: {
                    title: "데이터",
                    dataOrientation: "데이터 방향",
                    dateAxisData: "날짜 축 데이터",
                    dateAxisOrientation: "날짜 축 방향",
                    displayEmptyCellAs: "빈 셀을 다음으로 표시",
                    showDataInHiddenRowOrColumn: "숨겨진 행 및 열에 데이터 표시"
                },
                show: {
                    title: "표시",
                    showFirst: "첫 항목 표시",
                    showLast: "마지막 항목 표시",
                    showHigh: "높은 항목 표시",
                    showLow: "낮은 항목 표시",
                    showNegative: "음수 표시",
                    showMarkers: "표식 표시"
                },
                group: {
                    title: "그룹",
                    minAxisType: "최소 축 유형",
                    maxAxisType: "최대 축 유형",
                    manualMin: "수동 최소값",
                    manualMax: "수동 최대값",
                    rightToLeft: "오른쪽에서 왼쪽",
                    displayXAxis: "X축 표시"
                },
                style: {
                    title: "스타일",
                    negative: "음수",
                    markers: "표식",
                    axis: "축",
                    series: "계열",
                    highMarker: "높은 표식",
                    lowMarker: "낮은 표식",
                    firstMarker: "첫 표식",
                    lastMarker: "마지막 표식",
                    lineWeight: "라인 두께"
                },
                setButton: "설정"
            }
        },
        hbarSparkline: {
            title: "가로 막대 스파크라인 설정",
            values: {
                value: "값",
                colorScheme: "색 구성표",
                setButton: "설정"
            }
        },
        vbarSparkline: {
            title: "세로 막대 스파크라인 설정",
            values: {
                value: "값",
                colorScheme: "색 구성표",
                setButton: "설정"
            }
        },
        paretoSparkline: {
            title: "파레토 스파크라인 설정",
            values: {
                points: "점",
                pointIndex: "점",
                colorRange: "색 범위",
                highlightPosition: "강조 표시 위치",
                target: "대상",
                target2: "대상 2",
                label: "레이블",
                vertical: "세로",
                setButton: "설정"
            }
        },
        scatterSparkline: {
            title: "분산형 스파크라인 설정",
            values: {
                points1: "점 1",
                points2: "점 2",
                minX: "최소 X",
                maxX: "최대 X",
                minY: "최소 Y",
                maxY: "최대 Y",
                hLine: "가로 선",
                vLine: "세로 선",
                xMinZone: "X 최소 영역",
                xMaxZone: "X 최대 영역",
                yMinZone: "Y 최소 영역",
                yMaxZone: "Y 최대 영역",
                color1: "색 1",
                color2: "색 2",
                tags: "태그",
                drawSymbol: "기호 그리기",
                drawLines: "선 그리기",
                dashLine: "파선",
                setButton: "설정"
            }
        },
        spreadSparkline: {
            title: "Spread 스파크라인 설정",
            values: {
                points: "점",
                scaleStart: "크기 조정 시작",
                scaleEnd: "크기 조정 종료",
                style: "스타일",
                colorScheme: "색 구성표",
                showAverage: "평균 표시",
                vertical: "세로",
                setButton: "설정"
            }
        },
        stackedSparkline: {
            title: "누적 스파크라인 설정",
            values: {
                points: "점",
                colorRange: "색 범위",
                labelRange: "레이블 범위",
                maximum: "최대값",
                targetRed: "대상 빨강",
                targetGreen: "대상 녹색",
                targetBlue: "대상 파랑",
                targetYellow: "대상 노랑",
                color: "색",
                highlightPosition: "강조 표시 위치",
                textOrientation: "텍스트 방향",
                textSize: "텍스트 크기",
                vertical: "세로",
                setButton: "설정"
            }
        },
        variSparkline: {
            title: "분산 스파크라인 설정",
            values: {
                variance: "분산",
                reference: "참조",
                mini: "최소값",
                maxi: "최대값",
                mark: "표시",
                tickunit: "눈금 단위",
                colorPositive: "양수 색",
                colorNegative: "음수 색",
                legend: "범례",
                vertical: "세로",
                setButton: "설정"
            }
        },
        orientation: {
            vertical: "세로",
            horizontal: "가로"
        },
        axisType: {
            individual: "개인",
            group: "그룹",
            custom: "사용자 정의"
        },
        emptyCellDisplayType: {
            gaps: "간격",
            zero: "0",
            connect: "연결"
        },
        boxplotClass: {
            fiveNS: "5NS",
            sevenNS: "7NS",
            tukey: "Tukey",
            bowley: "Bowley",
            sigma: "Sigma3"
        },
        boxplotStyle: {
            classical: "클래식",
            neo: "Neo"
        },
        paretoLabel: {
            none: "없음",
            single: "단일",
            cumulated: "누적"
        },
        spreadStyle: {
            stacked: "누적형",
            spread: "Spread",
            jitter: "지터",
            poles: "기둥",
            stackedDots: "누적 점",
            stripe: "줄무늬"
        },
        setButton: "설정"
    },
    barCodeTab: {
        qrCode: {
            title: "QRCode 설정",
            values: {
                data: "데이터",
                color: "색",
                backgroundColor: "배경색",
                errorCorrectionLevel: "오류 수정 수준",
                model: "모델",
                version: "버전",
                mask: "마스크",
                connection: "연결",
                connectionNo: "연결 번호",
                charCode: "문자 코드",
                charset: "문자 집합"
            }
        },
        ean8: {
            title: "EAN8 설정"
        },
        ean13: {
            title: "EAN13 설정",
            values: {
                addOn: "텍스트 추가",
                addOnLabelPosition: "텍스트 추가 위치"
            }
        },
        gs1128: {
            title: "GS1_128 설정"
        },
        codabar: {
            title: "Codabar 설정",
            values: {
                checkDigit: "검사 숫자",
                nwRatio: "전각 및 반각 막대 비율"
            }
        },
        pdf417: {
            title: "PDF417 설정",
            values: {
                errorCorrectionLevel: "오류 수정 수준",
                rows: "행",
                columns: "열",
                compact: "컴팩트"
            }
        },
        dataMatrix: {
            title: "DataMatrix 설정",
            values: {
                eccMode: "Ecc 모드",
                ecc200SymbolSize: "Ecc200 기호 크기",
                ecc200EndcodingMode: "Ecc200 인코딩 모드",
                ecc00_140Symbole: "Ecc00_140 기호",
                structureAppend: "구조 추가",
                structureNumber: "구조 번호",
                fileIdentifier: "파일 식별자"
            }
        },
        code39: {
            title: "Code39 설정",
            values: {
                labelWithStartAndStopCharacter: "시작 및 끝 문자가 있는 레이블",
                nwRatio: "전각 및 반각 막대 비율",
                checkDigit: "검사 숫자",
                fullASCII: "전체 ASCII"
            }
        },
        code49: {
            title: "Code49 설정",
            values: {
                grouping: "그룹화",
                groupNo: "그룹 번호"
            }
        },
        code93: {
            title: "Code93 설정",
            values: {
                checkDigit: "검사 숫자",
                fullASCII: "전체 ASCII"
            }
        },
        code128: {
            title: "Code128 설정",
            values: {
                codeSet: "코드 집합"
            }
        },
        commonParams: {
            data: "데이터",
            color: "색",
            backgroundColor: "배경색",
            showLabel: "레이블 표시",
            labelPosition: "레이블 위치",
            fontFamily: "글꼴 패밀리",
            fontStyle: "글꼴 스타일",
            fontWeight: "글꼴 두께",
            fontTextDecoration: "텍스트 장식",
            fontTextAlign: "글꼴 텍스트 맞춤",
            fontSize: "글꼴 크기",
            quietZoneLeft: "왼쪽 자동 영역 크기",
            quietZoneRight: "오른쪽 자동 영역 크기",
            quietZoneTop: "위쪽 자동 영역 크기",
            quietZoneBottom: "아래쪽 자동 영역 크기",
            setButton: "설정"
        },
        labelPosition: {
            top: "위쪽",
            bottom: "아래쪽"
        },
        addOnLabelPosition: {
            top: "위쪽",
            bottom: "아래쪽"
        },
        horizontalAlign: {
            left: "왼쪽",
            center: "가운데",
            right: "오른쪽",
            general: "일반"
        },
        nwRatio: {
            two: "2",
            three: "3"
        },
        codeset: {
            auto: "자동",
            a: "A",
            b: "B",
            c: "C"
        },
        eccMode: {
            ecc000: "ECC000",
            ecc050: "ECC050",
            ecc080: "ECC080",
            ecc100: "ECC100",
            ecc140: "ECC140",
            ecc200: "ECC200"
        },
        structureNumber: {
            zero: "0",
            one: "1",
            two: "2",
            three: "3",
            four: "4",
            five: "5",
            six: "6",
            seven: "7",
            eight: "8",
            nine: "9",
            ten: "10",
            eleven: "11",
            twelve: "12",
            thirteen: "13",
            fourteen: "14",
            fifteen: "15"
        },
        errorCorrectionLevel: {
            l: "L",
            m: "M",
            q: "Q",
            h: "H"
        },
        model: {
            one: "1",
            two: "2"
        },
        version: {
            auto: "자동",
            one: "1",
            two: "2",
            three: "3",
            four: "4",
            five: "5",
            six: "6",
            seven: "7",
            eight: "8",
            nine: "9",
            ten: "10",
            eleven: "11",
            twelve: "12",
            thirteen: "13",
            fourteen: "14",
            fifteen: "15",
            sixteen: "16",
            seventeen: "17",
            eighteen: "18",
            nineteen: "19",
            twenty: "20",
            twentyOne: "21",
            twentyTwo: "22",
            twentyThree: "23",
            twentyFour: "24",
            twentyFive: "25",
            twentySix: "26",
            twentySeven: "27",
            twentyEight: "28",
            twentyNine: "29",
            thirty: "30",
            thirtyOne: "31",
            thirtyTwo: "32",
            thirtyThree: "33",
            thirtyFour: "34",
            thirtyFive: "35",
            thirtySix: "36",
            thirtySeven: "37",
            thirtyEight: "38",
            thirtyNine: "39",
            forty: "40"
        },
        mask: {
            auto: "자동",
            one: "1",
            two: "2",
            three: "3",
            four: "4",
            five: "5",
            six: "6",
            seven: "7"
        },
        connectionNo: {
            zero: "0",
            one: "1",
            two: "2",
            three: "3",
            four: "4",
            five: "5",
            six: "6",
            seven: "7",
            eight: "8",
            nine: "9",
            ten: "10",
            eleven: "11",
            twelve: "12",
            thirteen: "13",
            fourteen: "14",
            fifteen: "15"
        },
        structureNumber: {
            zero: "0",
            one: "1",
            two: "2",
            three: "3",
            four: "4",
            five: "5",
            six: "6",
            seven: "7",
            eight: "8",
            nine: "9",
            ten: "10",
            eleven: "11",
            twelve: "12",
            thirteen: "13",
            fourteen: "14",
            fifteen: "15"
        },
        charset: {
            uft8: "UTF-8",
            shiftJIS: "Shift-JIS"
        },
        pdfErrorCorrectionLevel: {
            auto: "자동",
            zero: "0",
            one: "1",
            two: "2",
            three: "3",
            four: "4",
            five: "5",
            six: "6",
            seven: "7",
            eight: "8"
        },
        rows: {
            auto: "자동",
            three: "3",
            four: "4",
            five: "5",
            six: "6",
            seven: "7",
            eight: "8",
            nine: "9",
            ten: "10",
            eleven: "11",
            twelve: "12",
            thirteen: "13",
            fourteen: "14",
            fifteen: "15",
            sixteen: "16",
            seventeen: "17",
            eighteen: "18",
            nineteen: "19",
            twenty: "20",
            twentyOne: "21",
            twentyTwo: "22",
            twentyThree: "23",
            twentyFour: "24",
            twentyFive: "25",
            twentySix: "26",
            twentySeven: "27",
            twentyEight: "28",
            twentyNine: "29",
            thirty: "30",
            thirtyOne: "31",
            thirtyTwo: "32",
            thirtyThree: "33",
            thirtyFour: "34",
            thirtyFive: "35",
            thirtySix: "36",
            thirtySeven: "37",
            thirtyEight: "38",
            thirtyNine: "39",
            forty: "40",
            fortyOne: "41",
            fortyTwo: "42",
            fortyThree: "43",
            fortyFour: "44",
            fortyFive: "45",
            fortySix: "46",
            fortySeven: "47",
            fortyEight: "48",
            fortyNine: "49",
            fifty: "50",
            fiftyOne: "51",
            fiftyTwo: "52",
            fiftyThree: "53",
            fiftyFour: "54",
            fiftyFive: "55",
            fiftySix: "56",
            fiftySeven: "57",
            fiftyEight: "58",
            fiftyNine: "59",
            sixty: "60",
            sixtyOne: "61",
            sixtyTwo: "62",
            sixtyThree: "63",
            sixtyFour: "64",
            sixtyFive: "65",
            sixtySix: "66",
            sixtySeven: "67",
            sixtyEight: "68",
            sixtyNine: "69",
            seventy: "70",
            seventyOne: "71",
            seventyTwo: "72",
            seventyThree: "73",
            seventyFour: "74",
            seventyFive: "75",
            seventySix: "76",
            seventySeven: "77",
            seventyEight: "78",
            seventyNine: "79",
            eighty: "80",
            eightyOne: "81",
            eightyTwo: "82",
            eightyThree: "83",
            eightyFour: "84",
            eightyFive: "85",
            eightySix: "86",
            eightySeven: "87",
            eightyEight: "88",
            eightyNine: "89",
            ninety: "90"

        },
        columns: {
            auto: "자동",
            one: "1",
            two: "2",
            three: "3",
            four: "4",
            five: "5",
            six: "6",
            seven: "7",
            eight: "8",
            nine: "9",
            ten: "10",
            eleven: "11",
            twelve: "12",
            thirteen: "13",
            fourteen: "14",
            fifteen: "15",
            sixteen: "16",
            seventeen: "17",
            eighteen: "18",
            nineteen: "19",
            twenty: "20",
            twentyOne: "21",
            twentyTwo: "22",
            twentyThree: "23",
            twentyFour: "24",
            twentyFive: "25",
            twentySix: "26",
            twentySeven: "27",
            twentyEight: "28",
            twentyNine: "29",
            thirty: "30"
        },
        fontWeight: {
            normal: "기본",
            bold: "굵게"
        },
        textDecoration: {
            none: "없음",
            underline: "밑줄",
            overline: "윗줄",
            linethrough: "취소선"
        },
        setButton: "설정"
    },
    slicerTab: {
        slicerStyle: {
            title: "슬라이서 스타일",
            groupTitle: {
                light: "밝게",
                dark: "어둡게"
            },
            light: {
                light1: "슬라이서 스타일 밝게 1",
                light2: "슬라이서 스타일 밝게 2",
                light3: "슬라이서 스타일 밝게 3",
                light4: "슬라이서 스타일 밝게 4",
                light5: "슬라이서 스타일 밝게 5",
                light6: "슬라이서 스타일 밝게 6"
            },
            other: {
                other1: "슬라이서 스타일 기타 1",
                other2: "슬라이서 스타일 기타 2"
            },
            dark: {
                dark1: "슬라이서 스타일 어둡게 1",
                dark2: "슬라이서 스타일 어둡게 2",
                dark3: "슬라이서 스타일 어둡게 3",
                dark4: "슬라이서 스타일 어둡게 4",
                dark5: "슬라이서 스타일 어둡게 5",
                dark6: "슬라이서 스타일 어둡게 6"
            }
        },
        general: {
            title: "일반",
            name: "이름",
            captionName: "캡션 이름",
            itemSorting: {
                title: "항목 정렬",
                option: {
                    none: "없음",
                    ascending: "오름차순",
                    descending: "내림차순"
                }
            },
            displayHeader: "머리글 표시"
        },
        layout: {
            title: "레이아웃",
            columnNumber: "열 번호",
            buttonHeight: "단추 높이",
            buttonWidth: "단추 너비"
        },
        property: {
            title: "속성",
            moveAndSize: "위치와 크기 변함",
            moveAndNoSize: "위치만 변함",
            noMoveAndSize: "변하지 않음",
            locked: "잠김"
        },
        filter: {
            title: "필터링",
            hideItemsWithNoData: "데이터가 없는 항목 숨기기",
            markNoData: "데이터가 없는 항목을 시각적으로 표시",
            showNoDataLast: "마지막 데이터가 없는 항목 표시"
        }
    },
    colorPicker: {
        themeColors: "테마 색",
        standardColors: "표준 색",
        noFills: "채우기 없음"
    },
    conditionalFormat: {
        setButton: "설정",
        ruleTypes: {
            title: "유형",
            highlightCells: {
                title: "셀 강조 표시 규칙",
                values: {
                    cellValue: "셀 값",
                    specificText: "특정 텍스트",
                    dateOccurring: "발생 날짜",
                    unique: "고유",
                    duplicate: "중복"
                }
            },
            topBottom: {
                title: "상위/하위 규칙",
                values: {
                    top10: "상위 10 개",
                    average: "평균"
                }
            },
            dataBars: {
                title: "데이터 막대",
                labels: {
                    minimum: "최소값",
                    maximum: "최대값",
                    type: "유형",
                    value: "값",
                    appearance: "모양",
                    showBarOnly: "막대만 표시",
                    useGradient: "그라데이션 사용",
                    showBorder: "테두리 표시",
                    barDirection: "막대 방향",
                    negativeFillColor: "음수 색",
                    negativeBorderColor: "음수 테두리",
                    axis: "축",
                    axisPosition: "위치",
                    axisColor: "색"
                },
                valueTypes: {
                    number: "숫자",
                    lowestValue: "최저값",
                    highestValue: "최고값",
                    percent: "백분율",
                    percentile: "백분위수",
                    automin: "자동 최소값",
                    automax: "자동 최소값",
                    formula: "수식"
                },
                directions: {
                    leftToRight: "왼쪽에서 오른쪽",
                    rightToLeft: "오른쪽에서 왼쪽"
                },
                axisPositions: {
                    automatic: "자동",
                    cellMidPoint: "셀 중간점",
                    none: "없음"
                }
            },
            colorScales: {
                title: "색조",
                labels: {
                    minimum: "최소값",
                    midpoint: "중간값",
                    maximum: "최대값",
                    type: "유형",
                    value: "값",
                    color: "색"
                },
                values: {
                    twoColors: "2가지 색조",
                    threeColors: "3가지 색조"
                },
                valueTypes: {
                    number: "숫자",
                    lowestValue: "최저값",
                    highestValue: "최고값",
                    percent: "백분율",
                    percentile: "백분위수",
                    formula: "수식"
                }
            },
            iconSets: {
                title: "아이콘 집합",
                labels: {
                    style: "스타일",
                    showIconOnly: "아이콘만 표시",
                    reverseIconOrder: "아이콘 순서 거꾸로",

                },
                types: {
                    threeArrowsColored: "3방향 화살표(컬러)",
                    threeArrowsGray: "3방향 화살표(회색)",
                    threeTriangles: "삼각형 3개",
                    threeStars: "별 3개",
                    threeFlags: "플래그 3개",
                    threeTrafficLightsUnrimmed: "3색 신호등(테두리 없음)",
                    threeTrafficLightsRimmed: "3색 신호등(테두리)",
                    threeSigns: "3가지 모양",
                    threeSymbolsCircled: "3가지 기호(원)",
                    threeSymbolsUncircled: "3가지 기호(원 없음)",
                    fourArrowsColored: "4방향 화살표(컬러)",
                    fourArrowsGray: "4방향 화살표(회색)",
                    fourRedToBlack: "4색 원 4개",
                    fourRatings: "4등급",
                    fourTrafficLights: "4색 신호등",
                    fiveArrowsColored: "5방향 화살표(컬러)",
                    fiveArrowsGray: "5방향 화살표(회색)",
                    fiveRatings: "5등급",
                    fiveQuarters: "5가지 원",
                    fiveBoxes: "5가지 상자"
                },
                valueTypes: {
                    number: "숫자",
                    percent: "백분율",
                    percentile: "백분위수",
                    formula: "수식"
                }
            },
            removeConditionalFormat: {
                title: "없음"
            }
        },
        operators: {
            cellValue: {
                types: {
                    equalsTo: "같음",
                    notEqualsTo: "다름",
                    greaterThan: "보다 큼",
                    greaterThanOrEqualsTo: "보다 크거나 같음",
                    lessThan: "보다 작음",
                    lessThanOrEqualsTo: "보다 작거나 같음",
                    between: "해당 범위",
                    notBetween: "제외 범위"
                }
            },
            specificText: {
                types: {
                    contains: "포함",
                    doesNotContain: "포함하지 않음",
                    beginsWith: "시작 문자",
                    endsWith: "끝 문자"
                }
            },
            dateOccurring: {
                types: {
                    today: "오늘",
                    yesterday: "어제",
                    tomorrow: "내일",
                    last7Days: "지난 7일",
                    thisMonth: "이번 달",
                    lastMonth: "지난 달",
                    nextMonth: "다음 달",
                    thisWeek: "이번 주",
                    lastWeek: "지난 주",
                    nextWeek: "다음 주"
                }
            },
            top10: {
                types: {
                    top: "위쪽",
                    bottom: "아래쪽"
                }
            },
            average: {
                types: {
                    above: "초과",
                    below: "미만",
                    equalOrAbove: "이상",
                    equalOrBelow: "이하",
                    above1StdDev: "1 표준 편차 초과",
                    below1StdDev: "1 표준 편차 미만",
                    above2StdDev: "2 표준 편차 초과",
                    below2StdDev: "2 표준 편차 미만",
                    above3StdDev: "3 표준 편차 초과",
                    below3StdDev: "3 표준 편차 미만"
                }
            }
        },
        texts: {
            cells: "다음을 포함하는 셀만 서식 지정:",
            rankIn: "다음 순위에 해당하는 값의 서식 지정:",
            inRange: "선택된 범위의 값.",
            values: "다음 조건을 만족하는 값의 서식 지정:",
            average: "선택한 범위의 평균.",
            allValuesBased: "셀 값을 기준으로 모든 셀의 서식 지정:",
            all: "선택한 범위에 있는 다음 값에 모두 서식 지정:",
            and: "및",
            formatStyle: "스타일 사용",
            showIconWithRules: "다음 규칙에 따라 각 아이콘 표시:"
        },
        formatSetting: {
            formatUseBackColor: "배경색",
            formatUseForeColor: "전경색",
            formatUseBorder: "테두리"
        }
    },
    cellTypes: {
        title: "셀 유형",
        buttonCellType: {
            title: "단추 셀 유형",
            values: {
                marginTop: "여백 - 위쪽",
                marginRight: "여백 - 오른쪽",
                marginBottom: "여백 - 아래쪽",
                marginLeft: "여백 - 왼쪽",
                text: "텍스트",
                backColor: "배경색"
            }
        },
        checkBoxCellType: {
            title: "확인란 셀 유형",
            values: {
                caption: "캡션",
                textTrue: "텍스트 True",
                textIndeterminate: "텍스트 미확정",
                textFalse: "텍스트 False",
                textAlign: {
                    title: "텍스트 맞춤",
                    values: {
                        top: "위쪽",
                        bottom: "아래쪽",
                        left: "왼쪽",
                        right: "오른쪽"
                    }
                },
                isThreeState: "3가지 상태"
            }
        },
        comboBoxCellType: {
            title: "콤보 상자 셀 유형",
            values: {
                editorValueType: {
                    title: "편집기 값 유형",
                    values: {
                        text: "텍스트",
                        index: "인덱스",
                        value: "값"
                    }
                },
                itemsText: "항목 텍스트",
                itemsValue: "항목 값"
            }
        },
        hyperlinkCellType: {
            title: "하이퍼링크 셀 유형",
            values: {
                linkColor: "링크 색",
                visitedLinkColor: "방문한 링크 색",
                text: "텍스트",
                linkToolTip: "링크 도구 설명",
                address: "주소"
            }
        },
        clearCellType: {
            title: "없음"
        },
        setButton: "설정",
        insertButton: "삽입"
    },
    sparklineDialog: {
        title: "스파크라인 익스프레스 설정",
        detail: "스파크라인 익스프레스 세부 설정",
        sparklineExType: {
            title: "유형",
            values: {
                line: "선",
                column: "열",
                winLoss: "승패",
                pie: "원형",
                area: "영역",
                scatter: "분산형",
                spread: "Spread",
                stacked: "누적형",
                bullet: "글머리 기호",
                hbar: "가로 막대형",
                vbar: "세로 막대형",
                variance: "분산",
                boxplot: "상자 그림",
                cascade: "계단식 배열",
                pareto: "파레토"
            }
        },
        lineSparkline: {
            dataRange: "데이터 범위",
            locationRange: "위치 범위",
            dataRangeError: "데이터 범위가 잘못되었습니다.",
            singleDataRange: "데이터 범위는 단일 행 또는 열이어야 합니다.",
            locationRangeError: "위치 범위가 잘못되었습니다."
        },
        bulletSparkline: {
            measure: "측정",
            target: "대상",
            maxi: "최대값",
            forecast: "예측",
            good: "좋음",
            bad: "나쁨",
            tickunit: "눈금 단위",
            colorScheme: "색 구성표",
            vertical: "세로"
        },
        hbarSparkline: {
            value: "값",
            colorScheme: "색 구성표"
        },
        varianceSparkline: {
            variance: "분산",
            reference: "참조",
            mini: "최소값",
            maxi: "최대값",
            mark: "표시",
            tickunit: "눈금 단위",
            colorPositive: "양수 색",
            colorNegative: "음수 색",
            legend: "범례",
            vertical: "세로"
        }
    },
    barCodeDialog: {
        title: "바코드 설정",
        detail: "바코드 세부 설정",
        barCodeType: {
            title: "유형",
            values: {
                qrCode:"QRcode",
                dataMatrix:"DataMatrix",
                pdf417:"PDF417",
                ean13:"EAN13",
                ean8:"EAN8",
                codaBar:"Codabar",
                code39:"Code39",
                code93:"Code93",
                code128:"Code128",
                code49:"Code49",
                gs1_128:"GS1_128"
            }
        },
        ean8:{
            dataRange: "데이터 범위",
            locationRange: "위치 범위",
            dataRangeError: "데이터 범위가 잘못되었습니다.",
            singleDataRange: "데이터 범위는 단일 행 또는 열이어야 합니다.",
            locationRangeError: "위치 범위가 잘못되었습니다.",
            color: "색",
            backgroundColor: "배경색",
        },
        gs1_128:{
            showLabel: "레이블 표시",
            labelPosition: "레이블 위치"
        },
        ean13:{
            addOn: "QRCode 텍스트 추가",
            addOnLabelPosition: "레이블 위치에 추가"
        },
        codaBar:{
            checkDigit: "검사 숫자",
            nwRatio: "전각 및 반각 막대 비율"
        },
        code39:{
            labelWithStartAndStopCharacter: "문자가 있는 레이블",
            nwRatio: "전각 및 반각 막대 비율",
        },
        code49:{
            grouping: "그룹화",
            groupNo: "그룹 번호"
        },
        code93:{
            checkDigit: "검사 숫자",
            fullASCII: "전체 ASCII"
        },
        code128:{
            codeSet: "코드 집합"
        },
        pdf417:{
            errorCorrectionLevel: "오류 수정 수준",
            rows: "열",
            columns: "행",
            compact: "컴팩트"
        },
        dataMatrix:{
            eccMode: "Ecc 모드",
            ecc200SymbolSize: "Ecc200 기호 크기",
            ecc200EndcodingMode: "Ecc200 인코딩 모드",
            ecc00_140Symbole: "Ecc00_140 기호",
            structureAppend: "구조 추가",
            structureNumber: "구조 번호",
            fileIdentifier: "파일 식별자"
        },
        qrCode:{
            errorCorrectionLevel: "오류 수정 수준",
            model: "모델",
            version: "버전",
            mask: "마스크",
            connection: "연결",
            connectionNo: "연결 번호",
            charCode: "문자 코드",
            charset: "문자 집합"
        },
        setButton: "설정"
    },
    slicerDialog: {
        insertSlicer: "슬라이서 삽입"
    },
    tooltips: {
        style: {
            fontBold: "텍스트를 굵게 표시합니다.",
            fontItalic: "텍스트를 기울임꼴로 표시합니다.",
            fontUnderline: "텍스트에 밑줄을 긋습니다.",
            fontDoubleUnderline: "텍스트에 이중 밑줄을 표시합니다.",
            fontOverline: "텍스트에 윗줄을 긋습니다.",
            fontLinethrough: "텍스트에 취소선을 긋습니다."
        },
        alignment: {
            leftAlign: "텍스트를 왼쪽에 맞춥니다.",
            centerAlign: "텍스트 가운데에 맞춥니다.",
            rightAlign: "텍스트를 오른쪽에 맞춥니다.",
            topAlign: "텍스트를 위쪽에 맞춥니다.",
            middleAlign: "텍스트를 중간에 맞춥니다.",
            bottomAlign: "텍스트를 아래쪽에 맞춥니다.",
            decreaseIndent: "들여쓰기 수준을 줄입니다.",
            increaseIndent: "들여쓰기 수준을 늘립니다."
        },
        border: {
            outsideBorder: "바깥쪽 테두리",
            insideBorder: "안쪽 테두리",
            allBorder: "모든 테두리",
            leftBorder: "왼쪽 테두리",
            innerVertical: "안쪽 세로",
            rightBorder: "오른쪽 테두리",
            topBorder: "위쪽 테두리",
            innerHorizontal: "안쪽 가로",
            bottomBorder: "아래쪽 테두리",
            noBorder: "없음",
            diagonalUpLine: "대각선 위로",
            diagonalDownLine: "대각선 아래로",
        },
        format: {
            percentStyle: "백분율 스타일",
            commaStyle: "쉼표 스타일",
            increaseDecimal: "자릿수 늘림",
            decreaseDecimal: "자릿수 줄임"
        }
    },
    defaultTexts: {
        buttonText: "단추",
        checkCaption: "검사",
        comboText: "미국, 중국, 일본",
        comboValue: "US, CN, JP",
        hyperlinkText: "SpreadJS",
        hyperlinkToolTip: "SpreadJS 웹 사이트",
        hyperlinkAddress: "http//www.grapecity.com/en/spreadjs"
    },
    messages: {
        invalidImportFile: "잘못된 파일입니다. 가져오기 작업이 실패했습니다.",
        duplicatedSheetName: "시트 이름이 중복되었습니다.",
        duplicatedTableName: "표 이름이 중복되었습니다.",
        rowColumnRangeRequired: "행 또는 열의 범위를 선택하십시오.",
        imageFileRequired: "파일은 이미지여야 합니다.",
        duplicatedSlicerName: "슬라이서 이름이 중복되었습니다.",
        invalidSlicerName: "슬라이서 이름이 잘못되었습니다."
    },
    contextMenu: {
        cutItem: "잘라내기",
        copyItem: "복사",
        pasteItem: "붙여넣기",
        insertItem: "삽입",
        deleteItem: "삭제",
        mergeItem: "병합",
        unmergeItem: "분할"
    },
    dialog: {
        ok: "확인",
        cancel: "취소"
    },
    find: {
        title: "찾기",
        options: "옵션",
        findwhat: "찾을 내용",
        within: { title: "범위", worksheet: "워크시트", workbook: "통합 문서" },
        searchby: { title: "검색 기준", rows: "행", columns: "열" },
        lookin: { title: "찾는 위치", values: "값", formulas: "수식" },
        matchcase: "대/소문자 구분",
        matchexactly: "정확히 일치",
        usewildcards: "와일드카드 사용",
        findall: "모두 찾기",
        findnext: "다음 항목 찾기",
        result: {
            header: {
                sheet: "시트",
                cell: "셀",
                value: "값",
                formula: "수식"
            },
            countssuffix: " 개의 셀을 찾음",
            nomatch: "Spread에서 검색 데이터를 찾을 수 없습니다."
        }
    },
    printSetting: {
        printButton: "인쇄",
        options: {
            title: "옵션",
            range: {
                title: "인쇄 범위",
                items: {
                    activeSheet: "활성 시트",
                    workbook: "전체 통합 문서"
                }
            },
            showBorder: "테두리 표시",
            showGridline: "눈금선 표시",
            headerAndFooter: {
                title: "머리글/바닥글",
                header: {
                    title: "머리글",
                    items: [
                        { text: "(없음)" },
                        { value: { center: "&P페이지" } },
                        { value: { right: "&A" } },
                        { value: { center: "&P페이지", right: "&A" } }
                    ],
                    custom: "사용자 정의 머리글"
                },
                footer: {
                    title: "바닥글",
                    items: [
                        { text: "(없음)" },
                        { value: { center: "&N 중 &P페이지" } },
                        { value: { left: "&B기밀&B", center: "&D", right: "&P페이지" } }
                    ],
                    custom: "사용자 정의 바닥글"
                },
                custom: {
                    left: "왼쪽 섹션",
                    center: "가운데 섹션",
                    right: "오른쪽 섹션",
                    items: [
                        { text: "(없음)" },
                        { text: "페이지 번호", value: "&P" },
                        { text: "총 페이지 수", value: "&N" },
                        { text: "시트 이름", value: "&A" },
                        { text: "통합 문서 이름", value: "&F" },
                        { text: "현재 날짜", value: "&D" },
                        { text: "현재 날짜 및 시간", value: "&D &T" }
                    ],
                    insert: "삽입",
                    image: {
                        value: "&G",
                        emptylist: "(찾아보기...)"
                    },
                    insertPicture: "그림 삽입",
                    tooltips: {
                        insert: "섹션을 선택하고 삽입 지점을 배치한 후 삽입할 항목을 선택합니다.",
                        insertPicture: "섹션을 선택하고 삽입 지점을 배치한 후 삽입할 업로드된 이미지 하나를 선택합니다.",
                        imageList: "머리글 / 바닥글에 업로드할 이미지를 찾아보고 선택하십시오.\n이미지는 200px x 200px보다 커지 않은 것이 좋습니다."
                    }
                },
                preview: "미리 보기"
            }

        }
    },
    fileMenu: {
        items: {
            new: "새로 만들기",
            save: "저장",
            password: "암호:",
            browse: "찾아보기",
            close: "닫기",
            filename: "파일 이름:",
            open: {
                title: "열기"
            },
            print: {
                title: "인쇄"
            },
            settings: {
                title: "설정"
            }
        }
    },
    settingPane: {
        title: {
            comment: "메모",
            slicer: "슬라이서",
        }
    },
    functions: {
        setting: {
            defaultDescription: "함수를 선택하고 설명을 가져옵니다.",
            filterPlaceHolder: "검색 기능"
        },
        categories: {
            datebase: {
                text: "데이터베이스",
                items: [
                    "DAVERAGE",
                    "DCOUNT",
                    "DCOUNTA",
                    "DGET",
                    "DMAX",
                    "DMIN",
                    "DPRODUCT",
                    "DSTDEV",
                    "DSTDEVP",
                    "DSUM",
                    "DVAR",
                    "DVARP"
                ]
            },
            dateandtime: {
                text: "날짜/시간",
                items: [
                    "DATE",
                    "DATEDIF",
                    "DATEVALUE",
                    "DAY",
                    "DAYS360",
                    "EDATE",
                    "EOMONTH",
                    "HOUR",
                    "MINUTE",
                    "MONTH",
                    "NETWORKDAYS",
                    "NOW",
                    "SECOND",
                    "TIME",
                    "TIMEVALUE",
                    "TODAY",
                    "WEEKDAY",
                    "WEEKNUM",
                    "WORKDAY",
                    "YEAR",
                    "YEARFRAC"
                ]
            },
            engineering: {
                text: "공학",
                items: [
                    "BESSELI",
                    "BESSELJ",
                    "BESSELK",
                    "BESSELY",
                    "BIN2DEC",
                    "BIN2HEX",
                    "BIN2OCT",
                    "COMPLEX",
                    "CONVERT",
                    "DEC2BIN",
                    "DEC2HEX",
                    "DEC2OCT",
                    "DELTA",
                    "ERF",
                    "ERFC",
                    "GESTEP",
                    "HEX2BIN",
                    "HEX2DEC",
                    "HEX2OCT",
                    "IMABS",
                    "IMAGINARY",
                    "IMARGUMENT",
                    "IMCONJUGATE",
                    "IMCOS",
                    "IMDIV",
                    "IMEXP",
                    "IMLN",
                    "IMLOG10",
                    "IMLOG2",
                    "IMPOWER",
                    "IMPRODUCT",
                    "IMREAL",
                    "IMSIN",
                    "IMSQRT",
                    "IMSUB",
                    "IMSUM",
                    "OCT2BIN",
                    "OCT2DEC",
                    "OCT2HEX"
                ]
            },
            financial: {
                text: "재무",
                items: [
                    "ACCRINT",
                    "ACCRINTM",
                    "AMORDEGRC",
                    "AMORLINC",
                    "COUPDAYBS",
                    "COUPDAYS",
                    "COUPDAYSNC",
                    "COUPNCD",
                    "COUPNUM",
                    "COUPPCD",
                    "CUMIPMT",
                    "CUMPRINC",
                    "DB",
                    "DDB",
                    "DISC",
                    "DOLLARDE",
                    "DOLLARFR",
                    "DURATION",
                    "EFFECT",
                    "FV",
                    "FVSCHEDULE",
                    "INTRATE",
                    "IPMT",
                    "IRR",
                    "ISPMT",
                    "MDURATION",
                    "MIRR",
                    "NOMINAL",
                    "NPER",
                    "NPV",
                    "ODDFPRICE",
                    "ODDFYIELD",
                    "ODDLPRICE",
                    "ODDLYIELD",
                    "EURO",
                    "EUROCONVERT",
                    "PMT",
                    "PPMT",
                    "PRICE",
                    "PRICEDISC",
                    "PRICEMAT",
                    "PV",
                    "RATE",
                    "RECEIVED",
                    "SLN",
                    "SYD",
                    "TBILLEQ",
                    "TBILLPRICE",
                    "TBILLYIELD",
                    "VDB",
                    "XIRR",
                    "XNPV",
                    "YIELD",
                    "YIELDDISC",
                    "YIELDMAT"
                ]
            },
            information: {
                text: "정보",
                items: [
                    "ERROR.TYPE",
                    "ISBLANK",
                    "ISERR",
                    "ISERROR",
                    "ISEVEN",
                    "ISLOGICAL",
                    "ISNA",
                    "ISNONTEXT",
                    "ISNUMBER",
                    "ISODD",
                    "ISREF",
                    "ISTEXT",
                    "N",
                    "NA",
                    "TYPE"
                ]
            },
            logical: {
                text: "논리",
                items: [
                    "AND",
                    "FALSE",
                    "IF",
                    "IFERROR",
                    "NOT",
                    "OR",
                    "TRUE"
                ]
            },
            lookupAndReference: {
                text: "찾기/참조",
                items: [
                    "ADDRESS",
                    "CHOOSE",
                    "COLUMN",
                    "COLUMNS",
                    "HLOOKUP",
                    "INDEX",
                    "LOOKUP",
                    "MATCH",
                    "OFFSET",
                    "ROW",
                    "ROWS",
                    "TRANSPOSE",
                    "VLOOKUP"
                ]
            },
            mathAndTrigonometry: {
                text: "수학/삼각",
                items: [
                    "ABS",
                    "ACOS",
                    "ACOSH",
                    "ASIN",
                    "ASINH",
                    "ATAN",
                    "ATAN2",
                    "ATANH",
                    "CEILING",
                    "COMBIN",
                    "COS",
                    "COSH",
                    "DEGREES",
                    "EVEN",
                    "EXP",
                    "FACT",
                    "FACTDOUBLE",
                    "FLOOR",
                    "GCD",
                    "INT",
                    "LCM",
                    "LN",
                    "LOG",
                    "LOG10",
                    "MDETERM",
                    "MINVERSE",
                    "MMULT",
                    "MOD",
                    "MROUND",
                    "MULTINOMIAL",
                    "ODD",
                    "PI",
                    "POWER",
                    "PRODUCT",
                    "QUOTIENT",
                    "RADIANS",
                    "RAND",
                    "RANDBETWEEN",
                    "ROMAN",
                    "ROUND",
                    "ROUNDDOWN",
                    "ROUNDUP",
                    "SERIESSUM",
                    "SIGN",
                    "SIN",
                    "SINH",
                    "SQRT",
                    "SQRTPI",
                    "SUBTOTAL",
                    "SUM",
                    "SUMIF",
                    "SUMIFS",
                    "SUMPRODUCT",
                    "SUMSQ",
                    "SUMX2MY2",
                    "SUMX2PY2",
                    "SUMXMY2",
                    "TAN",
                    "TANH",
                    "TRUNC"
                ]
            },
            statistical: {
                text: "통계",
                items: [
                    "AVEDEV",
                    "AVERAGE",
                    "AVERAGEA",
                    "AVERAGEIF",
                    "AVERAGEIFS",
                    "BETADIST",
                    "BETAINV",
                    "BINOMDIST",
                    "CHIDIST",
                    "CHIINV",
                    "CHITEST",
                    "CONFIDENCE",
                    "CORREL",
                    "COUNT",
                    "COUNTA",
                    "COUNTBLANK",
                    "COUNTIF",
                    "COUNTIFS",
                    "COVAR",
                    "CRITBINOM",
                    "DEVSQ",
                    "EXPONDIST",
                    "FDIST",
                    "FINV",
                    "FISHER",
                    "FISHERINV",
                    "FORECAST",
                    "FREQUENCY",
                    "FTEST",
                    "GAMMADIST",
                    "GAMMAINV",
                    "GAMMALN",
                    "GEOMEAN",
                    "GROWTH",
                    "HARMEAN",
                    "HYPGEOMDIST",
                    "INTERCEPT",
                    "KURT",
                    "LARGE",
                    "LINEST",
                    "LOGEST",
                    "LOGINV",
                    "LOGNORMDIST",
                    "MAX",
                    "MAXA",
                    "MEDIAN",
                    "MIN",
                    "MINA",
                    "MODE",
                    "NEGBINOMDIST",
                    "NORMDIST",
                    "NORMINV",
                    "NORMSDIST",
                    "NORMSINV",
                    "PEARSON",
                    "PERCENTILE",
                    "PERCENTRANK",
                    "PERMUT",
                    "POISSON",
                    "PROB",
                    "QUARTILE",
                    "RANK",
                    "RSQ",
                    "SKEW",
                    "SLOPE",
                    "SMALL",
                    "STANDARDIZE",
                    "STDEV",
                    "STDEVA",
                    "STDEVP",
                    "STDEVPA",
                    "STEYX",
                    "TDIST",
                    "TINV",
                    "TREND",
                    "TRIMMEAN",
                    "TTEST",
                    "VAR",
                    "VARA",
                    "VARP",
                    "VARPA",
                    "WEIBULL",
                    "ZTEST"
                ]
            },
            text: {
                text: "텍스트",
                items: [
                    "CHAR",
                    "CLEAN",
                    "CODE",
                    "CONCATENATE",
                    "DOLLAR",
                    "EXACT",
                    "FIND",
                    "FIXED",
                    "LEFT",
                    "LEN",
                    "LOWER",
                    "MID",
                    "PROPER",
                    "REPLACE",
                    "REPT",
                    "RIGHT",
                    "SEARCH",
                    "SUBSTITUTE",
                    "T",
                    "TEXT",
                    "TRIM",
                    "UPPER",
                    "VALUE"
                ]
            }
        }
    },
    addChartElement: {
        axes: {
            axes: '축',
            moreAxisOption: '추가 축 옵션'
        },
        axisTitles: {
            axisTitles: '축 제목',
            moreAxisTitlesOption: '추가 축 제목 옵션'
        },
        chartTitle: {
            chartTitle: '차트 제목',
            moreChartTitleOption: '추가 차트 제목 옵션'
        },
        gridLines: {
            gridLines: '눈금선',
            moreGridLinesOption: '추가 눈금선 옵션'
        },
        dataLabels: {
            dataLabels: '데이터 레이블',
            moreDataLabelsOption: '추가 데이터 레이블 옵션'
        },
        legend: {
            legend: '범례',
            moreLegendOption: '추가 범례 옵션'
        },
        primaryHorizontal: '기본 가로',
        primaryVertical: '기본 세로',
        secondaryHorizontal: '보조 가로',
        secondaryVertical: '보조 세로',
        none: '없음',
        aboveChart: '차트 위',
        primaryMajorHorizontal: '기본 주 가로',
        primaryMajorVertical: '기본 주 세로',
        primaryMinorHorizontal: '기본 부 가로',
        primaryMinorVertical: '기본 부 세로',
        secondaryMajorHorizontal: '보조 주 가로',
        secondaryMajorVertical: '보조 주 세로',
        secondaryMinorHorizontal: '보조 부 가로',
        secondaryMinorVertical: '보조 부 세로',
        center: '가운데',
        insideEnd: '안쪽 끝',
        outsideEnd: '바깥쪽 끝',
        bestFit: '자동 맞춤',
        above: '초과',
        below: '미만',
        show: '표시',
        right: '오른쪽',
        top: '위쪽',
        left: '왼쪽',
        bottom: '아래쪽'
    },
    richTextDialog: {
        editRichText: "서식 있는 텍스트 편집",
        title:"서식 있는 텍스트"
    },
    shape: {
        connector: '선',
        blockArrows: '블록 화살표',
        flowchart: '순서도',
        callouts: '설명선',
        rectangles: '직사각형',
        equationShapes:'수식 도형',
        basicShapes: '기본 도형',
        starsAndBanners: '별 및 배너'
    }
};