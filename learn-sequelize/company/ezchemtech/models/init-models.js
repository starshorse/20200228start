var DataTypes = require("sequelize").DataTypes;
var _TB_Calendar = require("./TB_Calendar");
var _TB_Calendar_Item = require("./TB_Calendar_Item");
var _TB_Customer_Contact = require("./TB_Customer_Contact");
var _TB_GET_HOOK_SQLs = require("./TB_GET_HOOK_SQLs");
var _TB_Gmail_Label = require("./TB_Gmail_Label");
var _TB_Gmail_Message = require("./TB_Gmail_Message");
var _TB_Gmail_Message_Label = require("./TB_Gmail_Message_Label");
var _TB_Gmail_Part = require("./TB_Gmail_Part");
var _TB_Google_Auth = require("./TB_Google_Auth");
var _TB_Log_Collector = require("./TB_Log_Collector");
var _TB_Maker_Stock = require("./TB_Maker_Stock");
var _TB_Maker_Stock_d = require("./TB_Maker_Stock_d");
var _TB_Maker_Stock_test = require("./TB_Maker_Stock_test");
var _TB_OC_Config_Qt = require("./TB_OC_Config_Qt");
var _TB_OC_EZct = require("./TB_OC_EZct");
var _TB_OC_Supplier = require("./TB_OC_Supplier");
var _TB_RPA운용현황 = require("./TB_RPA운용현황");
var _TB_SKBP통관대행 = require("./TB_SKBP통관대행");
var _TB_admin_1 = require("./TB_admin_1");
var _TB_calendar_master_event = require("./TB_calendar_master_event");
var _TB_chemical_price = require("./TB_chemical_price");
var _TB_chemical_product = require("./TB_chemical_product");
var _TB_date_table = require("./TB_date_table");
var _TB_e_approval_item = require("./TB_e_approval_item");
var _TB_e_approval_request = require("./TB_e_approval_request");
var _TB_e_approval_signature = require("./TB_e_approval_signature");
var _TB_ez_email_list = require("./TB_ez_email_list");
var _TB_eztable = require("./TB_eztable");
var _TB_inv_summary = require("./TB_inv_summary");
var _TB_mail_invoice = require("./TB_mail_invoice");
var _TB_mro = require("./TB_mro");
var _TB_name변환 = require("./TB_name변환");
var _TB_qt_scraping_request = require("./TB_qt_scraping_request");
var _TB_qt_scraping_result_price = require("./TB_qt_scraping_result_price");
var _TB_qt_scraping_result_product = require("./TB_qt_scraping_result_product");
var _TB_quote_vendor_price = require("./TB_quote_vendor_price");
var _TB_quote_vendor_product = require("./TB_quote_vendor_product");
var _TB_rgstExmpt = require("./TB_rgstExmpt");
var _TB_time_log = require("./TB_time_log");
var _TB_trello_majorissues_cards = require("./TB_trello_majorissues_cards");
var _TB_trello_majorissues_comments = require("./TB_trello_majorissues_comments");
var _TB_trello_majorissues_lists = require("./TB_trello_majorissues_lists");
var _TB_trello_majorissues_members = require("./TB_trello_majorissues_members");
var _TB_vid관리 = require("./TB_vid관리");
var _TB_webhook_url = require("./TB_webhook_url");
var _TB_견적분석 = require("./TB_견적분석");
var _TB_계좌거래내역_bio = require("./TB_계좌거래내역_bio");
var _TB_계좌거래내역_chem = require("./TB_계좌거래내역_chem");
var _TB_고액송금스케줄 = require("./TB_고액송금스케줄");
var _TB_고액송금총괄 = require("./TB_고액송금총괄");
var _TB_국가명관리 = require("./TB_국가명관리");
var _TB_근태관리 = require("./TB_근태관리");
var _TB_근태현황 = require("./TB_근태현황");
var _TB_담당자 = require("./TB_담당자");
var _TB_도시락기본메뉴 = require("./TB_도시락기본메뉴");
var _TB_도시락메뉴 = require("./TB_도시락메뉴");
var _TB_도시락주문 = require("./TB_도시락주문");
var _TB_독후감제출 = require("./TB_독후감제출");
var _TB_매입전자세금계산서 = require("./TB_매입전자세금계산서");
var _TB_매출전자세금계산서 = require("./TB_매출전자세금계산서");
var _TB_발주처 = require("./TB_발주처");
var _TB_배송안내메일 = require("./TB_배송안내메일");
var _TB_법인카드명세서 = require("./TB_법인카드명세서");
var _TB_법인카드사용내역 = require("./TB_법인카드사용내역");
var _TB_분할_납품및세금계산서발행 = require("./TB_분할_납품및세금계산서발행");
var _TB_분할송금 = require("./TB_분할송금");
var _TB_사내소독체크 = require("./TB_사내소독체크");
var _TB_선물환 = require("./TB_선물환");
var _TB_선물환사용 = require("./TB_선물환사용");
var _TB_수입면장메일 = require("./TB_수입면장메일");
var _TB_수입신고내역 = require("./TB_수입신고내역");
var _TB_수입제한 = require("./TB_수입제한");
var _TB_심규정 = require("./TB_심규정");
var _TB_안전교육관리대장 = require("./TB_안전교육관리대장");
var _TB_업무제안 = require("./TB_업무제안");
var _TB_업무진행관리 = require("./TB_업무진행관리");
var _TB_외화계좌거래내역_bio = require("./TB_외화계좌거래내역_bio");
var _TB_외화계좌거래내역_chem = require("./TB_외화계좌거래내역_chem");
var _TB_임직원명부 = require("./TB_임직원명부");
var _TB_자료보호물질 = require("./TB_자료보호물질");
var _TB_재고관리 = require("./TB_재고관리");
var _TB_전자어음_개요 = require("./TB_전자어음_개요");
var _TB_전자어음_할인내역 = require("./TB_전자어음_할인내역");
var _TB_정기업무기본정보 = require("./TB_정기업무기본정보");
var _TB_정기업무수행대상목록 = require("./TB_정기업무수행대상목록");
var _TB_직납안내 = require("./TB_직납안내");
var _TB_직원체온체크 = require("./TB_직원체온체크");
var _TB_진행상태알림 = require("./TB_진행상태알림");
var _TB_차량기본정보 = require("./TB_차량기본정보");
var _TB_차량운행현황 = require("./TB_차량운행현황");
var _TB_차량정비현황 = require("./TB_차량정비현황");
var _TB_테스트 = require("./TB_테스트");
var _TB_테스트2 = require("./TB_테스트2");
var _TB_통관기록 = require("./TB_통관기록");
var _TB_해외명단 = require("./TB_해외명단");
var _TB_해외송금기록 = require("./TB_해외송금기록");
var _TB_해외운송료 = require("./TB_해외운송료");
var _TB_환율 = require("./TB_환율");
var _TB_환율_월평균 = require("./TB_환율_월평균");
var _TB_휴가일수관리 = require("./TB_휴가일수관리");

function initModels(sequelize) {
  var TB_Calendar = _TB_Calendar(sequelize, DataTypes);
  var TB_Calendar_Item = _TB_Calendar_Item(sequelize, DataTypes);
  var TB_Customer_Contact = _TB_Customer_Contact(sequelize, DataTypes);
  var TB_GET_HOOK_SQLs = _TB_GET_HOOK_SQLs(sequelize, DataTypes);
  var TB_Gmail_Label = _TB_Gmail_Label(sequelize, DataTypes);
  var TB_Gmail_Message = _TB_Gmail_Message(sequelize, DataTypes);
  var TB_Gmail_Message_Label = _TB_Gmail_Message_Label(sequelize, DataTypes);
  var TB_Gmail_Part = _TB_Gmail_Part(sequelize, DataTypes);
  var TB_Google_Auth = _TB_Google_Auth(sequelize, DataTypes);
  var TB_Log_Collector = _TB_Log_Collector(sequelize, DataTypes);
  var TB_Maker_Stock = _TB_Maker_Stock(sequelize, DataTypes);
  var TB_Maker_Stock_d = _TB_Maker_Stock_d(sequelize, DataTypes);
  var TB_Maker_Stock_test = _TB_Maker_Stock_test(sequelize, DataTypes);
  var TB_OC_Config_Qt = _TB_OC_Config_Qt(sequelize, DataTypes);
  var TB_OC_EZct = _TB_OC_EZct(sequelize, DataTypes);
  var TB_OC_Supplier = _TB_OC_Supplier(sequelize, DataTypes);
  var TB_RPA운용현황 = _TB_RPA운용현황(sequelize, DataTypes);
  var TB_SKBP통관대행 = _TB_SKBP통관대행(sequelize, DataTypes);
  var TB_admin_1 = _TB_admin_1(sequelize, DataTypes);
  var TB_calendar_master_event = _TB_calendar_master_event(sequelize, DataTypes);
  var TB_chemical_price = _TB_chemical_price(sequelize, DataTypes);
  var TB_chemical_product = _TB_chemical_product(sequelize, DataTypes);
  var TB_date_table = _TB_date_table(sequelize, DataTypes);
  var TB_e_approval_item = _TB_e_approval_item(sequelize, DataTypes);
  var TB_e_approval_request = _TB_e_approval_request(sequelize, DataTypes);
  var TB_e_approval_signature = _TB_e_approval_signature(sequelize, DataTypes);
  var TB_ez_email_list = _TB_ez_email_list(sequelize, DataTypes);
  var TB_eztable = _TB_eztable(sequelize, DataTypes);
  var TB_inv_summary = _TB_inv_summary(sequelize, DataTypes);
  var TB_mail_invoice = _TB_mail_invoice(sequelize, DataTypes);
  var TB_mro = _TB_mro(sequelize, DataTypes);
  var TB_name변환 = _TB_name변환(sequelize, DataTypes);
  var TB_qt_scraping_request = _TB_qt_scraping_request(sequelize, DataTypes);
  var TB_qt_scraping_result_price = _TB_qt_scraping_result_price(sequelize, DataTypes);
  var TB_qt_scraping_result_product = _TB_qt_scraping_result_product(sequelize, DataTypes);
  var TB_quote_vendor_price = _TB_quote_vendor_price(sequelize, DataTypes);
  var TB_quote_vendor_product = _TB_quote_vendor_product(sequelize, DataTypes);
  var TB_rgstExmpt = _TB_rgstExmpt(sequelize, DataTypes);
  var TB_time_log = _TB_time_log(sequelize, DataTypes);
  var TB_trello_majorissues_cards = _TB_trello_majorissues_cards(sequelize, DataTypes);
  var TB_trello_majorissues_comments = _TB_trello_majorissues_comments(sequelize, DataTypes);
  var TB_trello_majorissues_lists = _TB_trello_majorissues_lists(sequelize, DataTypes);
  var TB_trello_majorissues_members = _TB_trello_majorissues_members(sequelize, DataTypes);
  var TB_vid관리 = _TB_vid관리(sequelize, DataTypes);
  var TB_webhook_url = _TB_webhook_url(sequelize, DataTypes);
  var TB_견적분석 = _TB_견적분석(sequelize, DataTypes);
  var TB_계좌거래내역_bio = _TB_계좌거래내역_bio(sequelize, DataTypes);
  var TB_계좌거래내역_chem = _TB_계좌거래내역_chem(sequelize, DataTypes);
  var TB_고액송금스케줄 = _TB_고액송금스케줄(sequelize, DataTypes);
  var TB_고액송금총괄 = _TB_고액송금총괄(sequelize, DataTypes);
  var TB_국가명관리 = _TB_국가명관리(sequelize, DataTypes);
  var TB_근태관리 = _TB_근태관리(sequelize, DataTypes);
  var TB_근태현황 = _TB_근태현황(sequelize, DataTypes);
  var TB_담당자 = _TB_담당자(sequelize, DataTypes);
  var TB_도시락기본메뉴 = _TB_도시락기본메뉴(sequelize, DataTypes);
  var TB_도시락메뉴 = _TB_도시락메뉴(sequelize, DataTypes);
  var TB_도시락주문 = _TB_도시락주문(sequelize, DataTypes);
  var TB_독후감제출 = _TB_독후감제출(sequelize, DataTypes);
  var TB_매입전자세금계산서 = _TB_매입전자세금계산서(sequelize, DataTypes);
  var TB_매출전자세금계산서 = _TB_매출전자세금계산서(sequelize, DataTypes);
  var TB_발주처 = _TB_발주처(sequelize, DataTypes);
  var TB_배송안내메일 = _TB_배송안내메일(sequelize, DataTypes);
  var TB_법인카드명세서 = _TB_법인카드명세서(sequelize, DataTypes);
  var TB_법인카드사용내역 = _TB_법인카드사용내역(sequelize, DataTypes);
  var TB_분할_납품및세금계산서발행 = _TB_분할_납품및세금계산서발행(sequelize, DataTypes);
  var TB_분할송금 = _TB_분할송금(sequelize, DataTypes);
  var TB_사내소독체크 = _TB_사내소독체크(sequelize, DataTypes);
  var TB_선물환 = _TB_선물환(sequelize, DataTypes);
  var TB_선물환사용 = _TB_선물환사용(sequelize, DataTypes);
  var TB_수입면장메일 = _TB_수입면장메일(sequelize, DataTypes);
  var TB_수입신고내역 = _TB_수입신고내역(sequelize, DataTypes);
  var TB_수입제한 = _TB_수입제한(sequelize, DataTypes);
  var TB_심규정 = _TB_심규정(sequelize, DataTypes);
  var TB_안전교육관리대장 = _TB_안전교육관리대장(sequelize, DataTypes);
  var TB_업무제안 = _TB_업무제안(sequelize, DataTypes);
  var TB_업무진행관리 = _TB_업무진행관리(sequelize, DataTypes);
  var TB_외화계좌거래내역_bio = _TB_외화계좌거래내역_bio(sequelize, DataTypes);
  var TB_외화계좌거래내역_chem = _TB_외화계좌거래내역_chem(sequelize, DataTypes);
  var TB_임직원명부 = _TB_임직원명부(sequelize, DataTypes);
  var TB_자료보호물질 = _TB_자료보호물질(sequelize, DataTypes);
  var TB_재고관리 = _TB_재고관리(sequelize, DataTypes);
  var TB_전자어음_개요 = _TB_전자어음_개요(sequelize, DataTypes);
  var TB_전자어음_할인내역 = _TB_전자어음_할인내역(sequelize, DataTypes);
  var TB_정기업무기본정보 = _TB_정기업무기본정보(sequelize, DataTypes);
  var TB_정기업무수행대상목록 = _TB_정기업무수행대상목록(sequelize, DataTypes);
  var TB_직납안내 = _TB_직납안내(sequelize, DataTypes);
  var TB_직원체온체크 = _TB_직원체온체크(sequelize, DataTypes);
  var TB_진행상태알림 = _TB_진행상태알림(sequelize, DataTypes);
  var TB_차량기본정보 = _TB_차량기본정보(sequelize, DataTypes);
  var TB_차량운행현황 = _TB_차량운행현황(sequelize, DataTypes);
  var TB_차량정비현황 = _TB_차량정비현황(sequelize, DataTypes);
  var TB_테스트 = _TB_테스트(sequelize, DataTypes);
  var TB_테스트2 = _TB_테스트2(sequelize, DataTypes);
  var TB_통관기록 = _TB_통관기록(sequelize, DataTypes);
  var TB_해외명단 = _TB_해외명단(sequelize, DataTypes);
  var TB_해외송금기록 = _TB_해외송금기록(sequelize, DataTypes);
  var TB_해외운송료 = _TB_해외운송료(sequelize, DataTypes);
  var TB_환율 = _TB_환율(sequelize, DataTypes);
  var TB_환율_월평균 = _TB_환율_월평균(sequelize, DataTypes);
  var TB_휴가일수관리 = _TB_휴가일수관리(sequelize, DataTypes);


  return {
    TB_Calendar,
    TB_Calendar_Item,
    TB_Customer_Contact,
    TB_GET_HOOK_SQLs,
    TB_Gmail_Label,
    TB_Gmail_Message,
    TB_Gmail_Message_Label,
    TB_Gmail_Part,
    TB_Google_Auth,
    TB_Log_Collector,
    TB_Maker_Stock,
    TB_Maker_Stock_d,
    TB_Maker_Stock_test,
    TB_OC_Config_Qt,
    TB_OC_EZct,
    TB_OC_Supplier,
    TB_RPA운용현황,
    TB_SKBP통관대행,
    TB_admin_1,
    TB_calendar_master_event,
    TB_chemical_price,
    TB_chemical_product,
    TB_date_table,
    TB_e_approval_item,
    TB_e_approval_request,
    TB_e_approval_signature,
    TB_ez_email_list,
    TB_eztable,
    TB_inv_summary,
    TB_mail_invoice,
    TB_mro,
    TB_name변환,
    TB_qt_scraping_request,
    TB_qt_scraping_result_price,
    TB_qt_scraping_result_product,
    TB_quote_vendor_price,
    TB_quote_vendor_product,
    TB_rgstExmpt,
    TB_time_log,
    TB_trello_majorissues_cards,
    TB_trello_majorissues_comments,
    TB_trello_majorissues_lists,
    TB_trello_majorissues_members,
    TB_vid관리,
    TB_webhook_url,
    TB_견적분석,
    TB_계좌거래내역_bio,
    TB_계좌거래내역_chem,
    TB_고액송금스케줄,
    TB_고액송금총괄,
    TB_국가명관리,
    TB_근태관리,
    TB_근태현황,
    TB_담당자,
    TB_도시락기본메뉴,
    TB_도시락메뉴,
    TB_도시락주문,
    TB_독후감제출,
    TB_매입전자세금계산서,
    TB_매출전자세금계산서,
    TB_발주처,
    TB_배송안내메일,
    TB_법인카드명세서,
    TB_법인카드사용내역,
    TB_분할_납품및세금계산서발행,
    TB_분할송금,
    TB_사내소독체크,
    TB_선물환,
    TB_선물환사용,
    TB_수입면장메일,
    TB_수입신고내역,
    TB_수입제한,
    TB_심규정,
    TB_안전교육관리대장,
    TB_업무제안,
    TB_업무진행관리,
    TB_외화계좌거래내역_bio,
    TB_외화계좌거래내역_chem,
    TB_임직원명부,
    TB_자료보호물질,
    TB_재고관리,
    TB_전자어음_개요,
    TB_전자어음_할인내역,
    TB_정기업무기본정보,
    TB_정기업무수행대상목록,
    TB_직납안내,
    TB_직원체온체크,
    TB_진행상태알림,
    TB_차량기본정보,
    TB_차량운행현황,
    TB_차량정비현황,
    TB_테스트,
    TB_테스트2,
    TB_통관기록,
    TB_해외명단,
    TB_해외송금기록,
    TB_해외운송료,
    TB_환율,
    TB_환율_월평균,
    TB_휴가일수관리,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
