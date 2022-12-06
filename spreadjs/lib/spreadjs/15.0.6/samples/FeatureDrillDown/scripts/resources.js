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
        export: {
            title: "내보내기",
            exportActions: {
                exportJson: "JSON 내보내기",
                exportExcel: "Excel 내보내기"
            }
        },
        downloadTitle: "파일 저장",
        download: "링크된 파일을 다음 파일로 다운로드하려면 마우스 오른쪽 단추 클릭...",
        showInspector: "검사기 표시",
        hideInspector: "검사기 숨기기",
        importJson: "JSON 가져오기",
        importFile: "파일 가져오기",
        insertTable: "표 삽입",
        insertPicture: "그림 삽입",
        insertComment: "메모 삽입",
        insertSparkline: "스파크라인 삽입",
        insertChart: "차트 삽입",
        insertSlicer: "슬라이서 삽입",
        insertShape: "도형 삽입"
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
        chartEx: "차트",
        shapeEx: "도형",
        slicer: "슬라이서"
    },
    spreadTab: {
        general: {
            title: "일반",
            allowDragDrop: "끌어서 놓기 허용",
            allowDragFill: "끌어서 채우기 허용",
            allowZoom: "확대/축소 허용",
            allowOverflow: "오버플로 허용",
            showDragFillSmartTag: "끌어서 채우기 스마트 태그 표시",
            allowDragMerge: "끌어서 병합 허용",
            allowContextMenu: "컨텍스트 메뉴 허용",
            allowUserDeselect: "사용자 선택 취소 허용"
        },
        calculation: {
            title: "계산",
            referenceStyle: {
                title: "참조 스타일",
                r1c1: "R1C1",
                a1: "A1"
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
        cutCopy: {
            title: "잘라내기/복사",
            cutCopyIndicator: {
                visible: "표시기 표시",
                borderColor: "표시기 테두리 색"
            },
            allowCopyPasteExcelStyle: "Excel 스타일 복사하여 붙여넣기 허용",
            allowExtendPasteRange: "붙여넣기 범위 확장 허용",
            copyPasteHeaderOptions: {
                title: "머리글 옵션",
                option: {
                    noHeaders: "머리글 없음",
                    rowHeaders: "행 머리글",
                    columnHeaders: "열 머리글",
                    allHeaders: "모든 머리글"
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
            title: "크기 조정 제로 표시기",
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
            editObjects: "개체 편집",
            dragInsertRows: "끌어서 행 삽입",
            dragInsertColumns: "끌어서 열 삽입",
            insertRows: "행 삽입",
            insertColumns: "열 삽입",
            deleteRows: "행 삭제",
            deleteColumns: "열 삭제"
        }
    },
    cellTab: {
        style: {
            title: "스타일",
            fontFamily: "글꼴",
            fontSize: "크기",
            foreColor: "전경색",
            backColor: "배경색",
            waterMark: "레이블",
            cellPadding: "안쪽 여백",
            cellLabel: {
                title: "레이블 옵션",
                visibility: "표시 여부",
                visibilityOption: {
                    auto: "자동",
                    visible: "표시 가능",
                    hidden: "숨김"
                },
                alignment: "맞춤",
                alignmentOption: {
                    topLeft: "왼쪽 위",
                    topCenter: "가운데 위",
                    topRight: "오른쪽 위",
                    bottomLeft: "왼쪽 아래",
                    bottomCenter: "가운데 아래",
                    bottomRight: "오른쪽 아래"
                },
                fontFamily: "글꼴",
                fontSize: "크기",
                foreColor: "전경색",
                labelMargin: "여백"
            },
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
            rangeBorderLine: "선",
            rangeBorderColor: "색",
            noBorder: "없음",
            outsideBorder: "바깥쪽 테두리",
            insideBorder: "안쪽 테두리",
            allBorder: "모든 테두리",
            leftBorder: "왼쪽 테두리",
            innerVertical: "안쪽 세로",
            rightBorder: "오른쪽 테두리",
            topBorder: "위쪽 테두리",
            innerHorizontal: "안쪽 가로",
            bottomBorder: "아래쪽 테두리",
            diagonalUpLine: "상향 대각선 선",
            diagonalDownLine: "하향 대각선 선",
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
            light: {
                light1: "밝게 1",
                light2: "밝게 2",
                light3: "밝게 3",
                light7: "밝게 7"
            },
            medium: {
                medium1: "보통 1",
                medium2: "보통 2",
                medium3: "보통 3",
                medium7: "보통 7"
            },
            dark: {
                dark1: "어둡게 1",
                dark2: "어둡게 2",
                dark3: "어둡게 3",
                dark7: "어둡게 7"
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
            showRowOutline: "행 개요 표시",
            showColumnOutline: "열 개요 표시"
        },
        dataValidation: {
            title: "데이터 유효성 검사",
            setButton: "설정",
            clearAllButton: "모두 지우기",
            highlightInvalidData: "Highlight Invalid Data",
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
                            greaterThan: "보다 큼",
                            lessThan: "보다 작음",
                            greaterThanOrEqualTo: "보다 큼 또는 같음",
                            lessThanOrEqualTo: "보다 작음 또는 같음"
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
            customHighlightStyle: {
                title: "Custom HighlightStyle",
                values: {
                    customHighlightStyleType: {
                        title: "Type",
                        option: {
                            circle: "Circle",
                            dogear: "Dogear",
                            icon: "Icon"
                        }
                    },
                    customHighlightStyleColor: "Color",
                    dogearPosition: {
                        title: "Dogear Position",
                        option: {
                            topLeft: "Top Left",
                            topRight: "Top Right",
                            bottomRight: "Bottom Right",
                            bottomLeft: "Bottom Left"
                        }
                    },
                    iconPosition: {
                        title: "Icon Position",
                        option: {
                            outsideLeft: "Outside Left",
                            outsideRight: "Outside Right"
                        }
                    },
                    iconUpload: "Choose File"
                }
            }
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
        monthSparkline: {
            title: "월 스파크라인 설정"
        },
        yearSparkline: {
            title: "년 스파크라인 설정"
        },
        monthYear: {
            data: "데이터",
            month: "월",
            year: "년",
            emptyColor: "빈 색",
            startColor: "시작 색",
            middleColor: "중간 색",
            endColor: "마지막 색",
            colorRange: "색 범위",
            setButton: "설정"
        },
        orientation: {
            vertical: "세로",
            horizontal: "가로"
        },
        axisType: {
            individual: "개인",
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
        //  barCode
        qrCodeSparkline: {
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
        ean8Sparkline: {
            title: "EAN8 설정"
        },
        ean13Sparkline: {
            title: "EAN13 설정",
            values: {
                addOn: "텍스트 추가",
                addOnLabelPosition: "텍스트 추가 위치"
            }
        },
        gs1128Sparkline: {
            title: "GS1_128 설정"
        },
        codabarSparkline: {
            title: "Codabar 설정",
            values: {
                checkDigit: "검사 숫자",
                nwRatio: "전각 및 반각 비율"
            }
        },
        pdf417Sparkline: {
            title: "PDF417 설정",
            values: {
                errorCorrectionLevel: "오류 수정 수준",
                rows: "행",
                columns: "열",
                compact: "컴팩트"
            }
        },
        dataMatrixSparkline: {
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
        code39Sparkline: {
            title: "Code39 설정",
            values: {
                labelWithStartAndStopCharacter: "시작 및 끝 문자가 있는 레이블",
                nwRatio: "전각 및 반각 비율",
                checkDigit: "검사 숫자",
                fullASCII: "전체 ASCII"
            }
        },
        code49Sparkline: {
            title: "Code49 설정",
            values: {
                grouping: "그룹화",
                groupNo: "그룹 번호"
            }
        },
        code93Sparkline: {
            title: "Code93 설정",
            values: {
                checkDigit: "검사 숫자",
                fullASCII: "전체 ASCII"
            }
        },
        code128Sparkline: {
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
            fontTextDecoration: "글꼴 텍스트 장식",
            fontTextAlign: "글꼴 텍스트 맞춤",
            fontSize: "글꼴 크기",
            quietZoneLeft: "왼쪽 자동 영역 크기",
            quietZoneRight: "오른쪽 자동 영역 크기",
            quietZoneTop: "위쪽 자동 영역 크기",
            quietZoneBottom: "아래쪽 자동 영역 크기",
            setButton: "설정"
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
        charset: {
            uft8: "UTF-8",
            shiftJS: "Shift-JIS"
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
        labelPosition: {
            top: "위쪽",
            bottom: "아래쪽"
        },
        addOnLabelPosition: {
            top: "위쪽",
            bottom: "아래쪽"
        },
        fontWeight: {
            normal: "보통",
            bold: "굵게"
        },
        textDecoration: {
            none: "없음",
            underline: "밑줄",
            overline: "윗줄",
            linethrough: "취소선"
        }
    },

    chartExTab: {
        fontSize: "글꼴 크기",
        color: "색",
        lineColor: "선 색",
        fontFamily: "글꼴 패밀리",
        chartType: "차트 유형",
        backColor: "배경색",
        values: {
            chartArea: {
                title: "차트 영역",
                backColor: "배경색",
                color: "색",
                fontSize: "글꼴 크기",
                fontFamily: "글꼴"
            },
            chartTitle: {
                title: "차트 제목",
                text: "텍스트",
                chartType: "차트 유형",
                dataRange: "데이터 범위"
            },
            series: {
                title: "계열",
                seriesIndex: '계열',
                axisGroup: "축 그룹",
                lineWidth: "페이지 너비",
                primary: "기본",
                secondary: "보조"
            },
            legend: {
                title: "범례",
                position: {
                    title: "위치",
                    values: {
                        left: "왼쪽",
                        right: "오른쪽",
                        top: "위쪽",
                        bottom: "아래쪽"
                    }
                },
                showLegend: "범례 표시",
                backColor: "배경색",
                backColorTransparency: "배경색 투명도",
                borderColor: "테두리 색",
                borderColorTransparency: "테두리 색 투명도",
                borderWidth: "테두리 두께"
            },
            dataLabels: {
                title: "데이터 레이블",
                showValue: "값 표시",
                showSeriesName: "계열 이름 표시",
                showCategoryName: "범주 이름 표시",
                position: {
                    title: "위치",
                    values: {

                    }
                },
                color: "색"
            },
            axes: {
                title: "축",
                axisType: {
                    title: "축 유형",
                    values: {
                        primaryCategory: "기본 범주",
                        primaryValue: "기본 값",
                        secondaryCategory: "보조 범주",
                        secondaryValue: "보조 값"
                    }
                },
                aixsTitle: "제목",
                titleColor: "제목 색",
                titleFontSize: "제목 크기",
                titleFontFamily: "제목 글꼴",
                showMajorGridline: "주요 눈금선 표시",
                showMinorGridline: "보조 눈금선 표시",
                showAxis: "축 표시",
                lineColor: "선 색",
                lineWidth: "페이지 너비",
                TickPosition: {
                    majorTitle: "주요 눈금 위치",
                    minorTitle: "보조 눈금 위치",
                    values: {
                        cross: "교차",
                        inside: "내부",
                        none: "없음",
                        outside: "외부"
                    }
                },
                majorUnit: "주 단위",
                minorUnit: "보조 단위",
                majorGridlineWidth: "주요 눈금선 너비",
                minorGridlineWidth: "보조 눈금선 너비",
                majorGridlineColor: "주요 눈금선 색",
                minorGridlineColor: "보조 눈금선 색",
                tickLabelPosition: {
                    title: "눈금 레이블 위치",
                    values: {
                        none: "없음",
                        nextToAxis: "축의 옆"
                    }
                }

            },
            options: {
                title: "옵션",
                useChartAnimation: "애니메이션 사용"
            },
            dataPoint: {
                title: "데이터 요소",
                dataPointIndex: "데이터 요소",
                pointColor: "요소 색",
                pointTransparency: "요소 투명도"
            }

        },
        setButton: "설정",
        combo: {
            title: "누적 막대형-꺾은선형 차트 설정",
            value: {}
        }
    },

    shapeExTab: {
        base: {
            title: "기본 도형 설정",
            values: {
                allowMove: "이동 허용",
                allowResize: "크기 조절 허용",
                canPrint: "인쇄 가능",
                dynamicMove: "동적 이동",
                dynamicSize: "동적 크기",
                width: "너비",
                height: "높이",
                isLocked: "잠금",
                isSelected: "선택함",
                isVisible: "표시됨",
                name: "이름"
            }
        },
        shape: {
            title: "도형 설정",
            values: {
                color: "색",
                backgroundColor: "배경색",
                border: "테두리 스타일",
                borderWidth: "테두리 너비",
                borderColor: "테두리 색",
                capType: "캡 스타일",
                joinType: "조인 유형",
                fontWeight: "글꼴 두께",
                fontSize: "글꼴 크기",
                fontFamily: "글꼴 패밀리",
                hAlign: "가로 맞춤 ",
                vAlign: "세로 맞춤",
                text: "텍스트",
                rotate: "회전",
                align: "텍스트 맞춤"
            }
        },
        group: {
            title: "그룹 도형 설정",
            values: {
                group: "그룹화",
                unGroup: "그룹 해제"
            }
        },
        connector: {
            title: "연결선 도형 설정",
            values: {
                type: "유형",
                beginArrowStyle: "시작 화살표 스타일",
                beginArrowLength: "시작 화살표 높이",
                beginArrowWidth: "시작 화살표 너비",
                endArrowStyle: "끝 화살표 스타일",
                endArrowLength: "끝 화살표 높이",
                endArrowWidth: "끝 화살표 너비",
                startConnector: "시작 연결선",
                endConnector: "끝 연결선"
            }
        },
        connectorType: {
            elbow: "꺾임",
            straight: "직선"
        },
        hAlign: {
            center: "텍스트를 가운데에 맞춤",
            left: "텍스트를 왼쪽에 맞춤",
            right: "텍스트를 오른쪽에 맞춤"
        },
        vAlign: {
            center: "텍스트를 가운데에 맞춤",
            bottom: "텍스트를 아래쪽에 맞춤",
            top: "텍스트를 위쪽에 맞춤"
        },
        capType: {
            flat: "기본",
            square: "정사각형",
            round: "원형"
        },
        joinType: {
            round: "원형",
            miter: "이음매",
            bevel: "3D 가장자리"
        },
        arrowHeadLength: {
            short: "짧게",
            medium: "보통",
            long: "길게"
        },
        arrowHeadWidth: {
            narrow: "좁게",
            medium: "보통",
            wide: "넓게"
        },
        setButton: "설정",
    },
    slicerTab: {
        slicerStyle: {
            title: "슬라이서 스타일",
            light: {
                light1: "밝게 1",
                light2: "밝게 2",
                light3: "밝게 3",
                light5: "밝게 5",
                light6: "밝게 6"
            },
            dark: {
                dark1: "어둡게 1",
                dark2: "어둡게 2",
                dark3: "어둡게 3",
                dark5: "어둡게 5",
                dark6: "어둡게 6"
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
            buttonHeight: "버튼 높이",
            buttonWidth: "버튼 너비"
        },
        property: {
            title: "속성",
            moveAndSize: "위치와 크기 변함",
            moveAndNoSize: "위치만 변함",
            noMoveAndSize: "변하지 않음",
            locked: "잠김"
        }
    },
    colorPicker: {
        themeColors: "테마 색",
        standardColors: "표준 색",
        noFills: "채우기 없음",
        transparency: "투명도"
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
                    below: "아래",
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
            title: "버튼 셀 유형",
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
                linkToolTip: "링크 도구 설명"
            }
        },
        clearCellType: {
            title: "없음"
        },
        setButton: "설정"
    },
    sparklineDialog: {
        title: "스파크라인 익스프레스 설정",
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
                pareto: "파레토",
                month: "월",
                year: "년",
                barCode: "바코드"
            },
            barCodeList: {
                qrCode: "QRcode",
                dataMatrix: "DataMatrix",
                pdf417: "PDF417",
                ean13: "EAN13",
                ean8: "EAN8",
                codaBar: "CodaBar",
                code39: "Code39",
                code93: "Code93",
                code128: "Code128",
                code49: "Code49",
                GS1128: "GS1_128"
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
        },
        monthSparkline: {
            year: "년",
            month: "월",
            emptyColor: "빈 색",
            startColor: "시작 색",
            middleColor: "중간 색",
            endColor: "마지막 색",
            colorRange: "색 범위"
        },
        yearSparkline: {
            year: "년",
            emptyColor: "빈 색",
            startColor: "시작 색",
            middleColor: "중간 색",
            endColor: "마지막 색",
            colorRange: "색 범위"
        },
        ean8: {
            color: "색",
            backgroundColor: "배경색",
        },
        gs1128: {
            showLabel: "레이블 표시",
            labelPosition: "레이블 위치"
        },
        ean13: {
            addOn: "QRCode 텍스트 추가",
            addOnLabelPosition: "레이블 위치에 추가"
        },
        codaBar: {
            checkDigit: "검사 숫자",
            nwRatio: "전각 및 반각 비율"
        },
        code39: {
            labelWithStartAndStopCharacter: "시작 및 끝 문자가 있는 레이블",
            nwRatio: "전각 및 반각 비율",
        },
        code49: {
            grouping: "그룹화",
            groupNo: "그룹 번호"
        },
        code93: {
            checkDigit: "검사 숫자",
            fullASCII: "전체 ASCII"
        },
        code128: {
            codeSet: "코드 집합"
        },
        pdf417: {
            errorCorrectionLevel: "오류 수정 수준",
            rows: "행",
            columns: "열",
            compact: "컴팩트"
        },
        dataMatrix: {
            eccMode: "Ecc 모드",
            ecc200SymbolSize: "Ecc200 기호 크기",
            ecc200EncodingMode: "Ecc200 인코딩 모드",
            ecc00_140Symbol: "Ecc00_140 기호",
            structureAppend: "구조 추가",
            structureNumber: "구조 번호",
            fileIdentifier: "파일 식별자"
        },
        qrCode: {
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
    chartDialog: {
        title: "chartEx 설정",
        chartExType: {
            title: "유형",
            values: {
                columnClustered: "클러스터된 열",
                columnStacked: "누적 막대형",
                columnStacked100: "100% 기준 누적 막대형",
                line: "선",
                lineStacked: "누적 꺾은선형",
                lineStacked100: "100% 기준 누적 꺾은선형",
                lineMarkers: "표식이 있는 꺾은선형",
                lineMarkersStacked: "표식이 있는 누적 꺾은선형",
                lineMarkersStacked100: "표식이 있는 100% 기준 누적 꺾은선형",
                pie: "원형",
                doughnut: "도넛형",
                barClustered: "묶은 가로 막대형",
                barStacked: "누적 막대형",
                barStacked100: "100% 기준 누적 막대형",
                area: "영역",
                areaStacked: "누적 영역형",
                areaStacked100: "100% 기준 누적 영역형",
                xyScatter: "분산형",
                xyScatterSmooth: "곡선 및 표식이 있는 분산형",
                xyScatterSmoothNoMarkers: "곡선이 있는 분산형",
                xyScatterLines: "직선 및 표식이 있는 분산형",
                xyScatterLinesNoMarkers: "직선이 있는 분산형",
                bubble: "거품형",
                stockHLC: "고가-저가-종가",
                stockOHLC: "시가-고가-저가-종가",
                stockVHLC: "거래량-고가-저가-종가-주식형",
                stockVOHLC: "거래량-시가-고가-저가-종가-주식형",
                combo: "묶은 세로 막대형-꺾은선형",
                radar: "방사형",
                radarMarkers: "방사형 표식",
                radarFilled: "채워진 방사형",
                sunburst: "선버스트",
                treemap: "트리맵"
            }
        }
    },
    shapeDialog: {
        title: "shapeEx 설정",
        shapeExType: {
            title: "유형",
            values: {
                connector: '선',
                blockArrows: '블록 화살표',
                flowchart: '순서도',
                callouts: '설명선',
                rectangles: '직사각형',
                equationShapes: '수식 도형',
                basicShapes: '기본 도형',
                starsAndBanners: '별 및 배너'
            }
        }
    },
    slicerDialog: {
        insertSlicer: "슬라이서 삽입"
    },
    richTextDialog: {
        editRichText: "서식 있는 텍스트 편집",
        title: "서식 있는 텍스트"
    },
    passwordDialog: {
        title: "암호",
        error: "잘못된 암호"
    },
    tooltips: {
        style: {
            fontBold: "텍스트를 굵게 표시합니다.",
            fontItalic: "텍스트를 기울임꼴로 표시합니다.",
            fontUnderline: "텍스트에 밑줄을 긋습니다.",
            fontOverline: "텍스트에 윗줄을 긋습니다.",
            fontLinethrough: "텍스트에 취소선을 긋습니다.",
            fontDoubleUnderline: "이중 밑줄 텍스트"
        },
        alignment: {
            leftAlign: "텍스트를 왼쪽에 맞춥니다.",
            centerAlign: "텍스트 가운데에 맞춥니다.",
            rightAlign: "텍스트를 오른쪽에 맞춥니다.",
            topAlign: "텍스트를 위쪽에 맞춥니다.",
            middleAlign: "텍스트를 중간에 맞춥니다.",
            bottomAlign: "텍스트를 아래쪽에 맞춥니다.",
            decreaseIndent: "들여쓰기 수준을 줄입니다.",
            increaseIndent: "들여쓰기 수준을 늘립니다.",
            verticalText: "세로 텍스트"

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
            diagonalUpLine: "상향 대각선 선",
            diagonalDownLine: "하향 대각선 선",
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
        hyperlinkText: "링크 텍스트",
        hyperlinkToolTip: "하이퍼링크 도구 설명"
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
    dialog: {
        ok: "확인",
        cancel: "취소"
    },
    chartDataLabels: {
        center: '가운데',
        insideEnd: '안쪽 끝',
        outsideEnd: '바깥쪽 끝',
        bestFit: '자동 맞춤',
        above: '위',
        below: '아래',
    }
};