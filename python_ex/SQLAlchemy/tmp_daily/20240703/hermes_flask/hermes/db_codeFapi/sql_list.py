db_name = 'ezoffice'

def set_dbName( dbName ):
    global db_name 
    db_name = dbName 

create_table_service_info = f'''
create table TB_고객서비스_codeFApi( seq int identity primary key , 서비스명 nvarchar(128) not null , org_name nvarchar(128 ) , db_name nvarchar(128) not null , enabled  int default 0 , 인증년월  nvarchar(10) not null , 인증분류코드 nvarchar(10) )
'''

def update_table_service_info( org_name , auth_id , auth_y_M , auth_pass , buz_num ):
    update_table_service_info = f'''
    declare @org_name nvarchar(50) , @auth_y_M nvarchar(50) , @auth_id  nvarchar(10) , @auth_pass nvarchar(200) , @buz_num nvarchar(50) 
    set @org_name = '{ org_name }'
    set @auth_y_M = '{ auth_y_M }' 
    set @auth_id = '{ auth_id }'
    set @buz_num = '{ buz_num }'
    set @auth_pass = '{ auth_pass }'
    merge [ezoffice].[dbo].[TB_고객서비스_codeFApi] T
    using (
       select case when @auth_id = '001' then 
                  '계좌거래목록' 
                   when @auth_id = '002' then 
                  '전자세금계산서목록' 
             end  as 서비스명,  org_name = @org_name , db_name = @org_name, 
             인증년월 = @auth_y_M , 인증분류코드 = @auth_id,  
             사업자번호 = @buz_num , 인증비번 =  @auth_pass 
    )S on T.org_name = S.org_name  and T.인증분류코드 = S.인증분류코드 
    when matched  then 
          update set 
            T.서비스명 = S.서비스명 ,  T.인증년월 = S.인증년월, 
            T.사업자번호 = S.사업자번호, T.인증비번 = S.인증비번 
    when not matched by target then 
        insert( 서비스명, org_name , db_name , 인증년월 , 인증분류코드 , 사업자번호 , 인증비번 )
        values( S.서비스명, S.org_name, S.db_name, S.인증년월, S.인증분류코드, S.사업자번호, S.인증비번 ); 
    ''' 
    return update_table_service_info

def create_table_accountList_codeFApi( db_name = 'ezchemtech' ):
    create_table_accountList = f'''
    CREATE TABLE [dbo].[TB_{ db_name }_계좌목록_codeFApi](
            [seq] [int] IDENTITY(1,1) NOT NULL,
            [기관코드] [varchar](20) NULL,
            [resAccount] [nvarchar](512) NULL,
            [resAccountBalance] [money] NULL,
            [resAccountDeposit] [int] NULL,
            [resAccountNickName] [varchar](512) NULL,
            [resAccountStartDate] [int] NULL,
            [resAccountEndDate] [varchar](512) NULL,
            [resAccountName] [varchar](512) NULL,
            [resAccountDisplay] [varchar](512) NULL,
            [resAccountCurrency] [varchar](512) NULL,
            [resLastTranDate] [varchar](512) NULL,
            [resOverdraftAcctYN] [varchar](512) NULL,
            [resLoanKind] [varchar](512) NULL,
            [resLoanBalance] [varchar](512) NULL,
            [resLoanStartDate] [varchar](512) NULL,
            [resLoanEndDate] [varchar](512) NULL
    )
    '''
    return create_table_accountList     

def create_table_transactions_codeFApi( db_name = 'ezchemtech' ): 
    create_table_transactions = f'''
    CREATE TABLE [dbo].[TB_{ db_name }_계좌거래내역_codeFApi](
            [resAccountTrDate] [varchar](20) NULL,
            [resAccountTrTime] [varchar](512) NULL,
            [resAccountOut] [varchar](512) NULL,
            [resAccountIn] [varchar](512) NULL,
            [resAccountDesc1] [varchar](512) NULL,
            [resAccountDesc2] [varchar](512) NULL,
            [resAccountDesc3] [varchar](512) NULL,
            [resAccountDesc4] [varchar](512) NULL,
            [resAfterTranBalance] [varchar](512) NULL,
            [accountList_seq] [int] NULL,
            [resAccount] [varchar](512) NULL,
            [기관코드] [varchar](20) NULL
    ) ON [PRIMARY]
    '''    
    return create_table_transactions 
 

def create_table_account_krTransaction( db_name = 'ezchemtech' ):
    create_table_account_krTransaction = f'''
    CREATE TABLE [{ db_name }].[dbo].[TB_계좌거래내역_1](
            [seq] [int] IDENTITY(1,1) NOT NULL,
            [계좌명칭] [nvarchar](20) NOT NULL,
            [계좌번호] [nvarchar](20) NOT NULL,
            [거래일시] [datetime] NOT NULL,
            [거래일자] [date] NOT NULL,
            [거래구분] [nvarchar](10) NOT NULL,
            [입금액] [bigint] NULL,
            [출금액] [bigint] NULL,
            [잔액] [bigint] NULL,
            [적요] [nvarchar](500) NOT NULL,
            [CT_no] [nvarchar](12) NULL,
            [송장번호] [nvarchar](15) NULL,
            [관세] [int] NULL,
            [부가세] [int] NULL,
            [입출금코드] [nvarchar](20) NULL,
            [비고] [nvarchar](500) NULL,
            [입출금정리여부] [nvarchar](100) NULL,
            [RegDate] [datetime] NULL,
            [UpdateDate] [datetime] NULL,
     CONSTRAINT [PK_TB_계좌거래내역_1] PRIMARY KEY CLUSTERED 
    (
            [seq] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    ALTER TABLE [{ db_name }].[dbo].[TB_계좌거래내역_1] ADD  CONSTRAINT [DF__TB_계좌거래내역_1__RegDa__477199F1]  DEFAULT (getdate()) FOR [RegDate]
    ALTER TABLE [{ db_name }].[dbo].[TB_계좌거래내역_1] ADD  CONSTRAINT [DF__TB_계좌거래내역_1__Updat__4865BE2A]  DEFAULT (getdate()) FOR [UpdateDate]
    '''
    return create_table_account_krTransaction 

def create_table_account_foreignTransaction( db_name = 'ezchemtech' ):
    create_table_account_foreignTransaction = f'''
    CREATE TABLE [{ db_name }].[dbo].[TB_외화계좌거래내역_1](
            [seq] [int] IDENTITY(1,1) NOT NULL,
            [회사구분] [nvarchar](10) NOT NULL,
            [계좌명칭] [nvarchar](20) NOT NULL,
            [계좌번호] [nvarchar](20) NOT NULL,
            [거래일시] [datetime] NOT NULL,
            [거래일자] [date] NOT NULL,
            [통화] [nvarchar](5) NOT NULL,
            [거래구분] [nvarchar](10) NOT NULL,
            [입금액] [decimal](15, 2) NULL,
            [출금액] [decimal](15, 2) NULL,
            [잔액] [decimal](15, 2) NOT NULL,
            [적요] [nvarchar](100) NOT NULL,
            [수출계좌번호] [nvarchar](50) NULL,
            [해외수입업자] [nvarchar](60) NULL,
            [환율] [decimal](9, 4) NULL,
            [사용여부] [nvarchar](2) NULL,
            [원화환산금액] [int] NULL,
            [Maker] [nvarchar](50) NULL,
            [비고] [nvarchar](100) NULL,
            [RegDate] [datetime] NULL,
            [UpdateDate] [datetime] NULL,
     CONSTRAINT [PK_TB_외화계좌거래내역_1] PRIMARY KEY CLUSTERED 
    (
            [seq] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    ALTER TABLE [{ db_name }].[dbo].[TB_외화계좌거래내역_1] ADD  CONSTRAINT [DF__TB_외화계좌거래_1__RegDa__2C88998B]  DEFAULT (getdate()) FOR [RegDate]
    ALTER TABLE [{ db_name }].[dbo].[TB_외화계좌거래내역_1] ADD  CONSTRAINT [DF__TB_외화계좌거래_1__Updat__2D7CBDC4]  DEFAULT (getdate()) FOR [UpdateDate]
    '''
    return create_table_account_foreignTransaction 



def create_table_sellOut_tax_codeFApi( db_name ):
    create_table_sellOut_tax_codeFApi = f'''
    CREATE TABLE [TB_{ db_name }_매출전자세금계산서내역_codeFApi]
    (
        [resReportingDate]	DATE,
        [resApprovalNo]	VARCHAR(512),
        [resIssueDate]	DATE,
        [resSendDate]	DATE,
        [resSupplierRegNumber]	BIGINT,
        [resSupplierEstablishNo]	VARCHAR(512),
        [resContractorRegNumber]	BIGINT,
        [resContractorEstablishNo]	VARCHAR(512),
        [resSupplierCompanyName]	VARCHAR(512),
        [resContractorCompanyName]	VARCHAR(512),
        [resSupplierName]	VARCHAR(512),
        [resContractorName]	VARCHAR(512),
        [resTotalAmount]	MONEY,
        [resSupplyValue]	MONEY,
        [resTaxAmt]	MONEY,
        [resETaxInvoiceType]	VARCHAR(512),
        [resIssueNm]	VARCHAR(512),
        [resNote]	VARCHAR(512),
        [resReceiptOrCharge]	VARCHAR(512),
        [resEmail]	VARCHAR(512),
        [resEmail1]	VARCHAR(512),
        [resEmail2]	VARCHAR(512),
        [resRepItems]	VARCHAR(512)
    );
    '''
    return create_table_sellOut_tax_codeFApi

def create_table_sellIn_tax_codeFApi( db_name ):
    create_table_sellIn_tax_codeFApi = f'''
    CREATE TABLE [ezoffice].[dbo].[TB_{ db_name}_매입전자세금계산서내역_codeFApi] 
    (
        [resReportingDate]	DATE,
        [resApprovalNo]	VARCHAR(512),
        [resIssueDate]	DATE,
        [resSendDate]	DATE,
        [resSupplierRegNumber]	BIGINT,
        [resSupplierEstablishNo]	VARCHAR(512),
        [resContractorRegNumber]	BIGINT,
        [resContractorEstablishNo]	VARCHAR(512),
        [resSupplierCompanyName]	VARCHAR(512),
        [resContractorCompanyName]	VARCHAR(512),
        [resSupplierName]	VARCHAR(512),
        [resContractorName]	VARCHAR(512),
        [resTotalAmount]	MONEY,
        [resSupplyValue]	MONEY,
        [resTaxAmt]	MONEY,
        [resETaxInvoiceType]	VARCHAR(512),
        [resIssueNm]	VARCHAR(512),
        [resNote]	VARCHAR(512),
        [resReceiptOrCharge]	VARCHAR(512),
        [resEmail]	VARCHAR(512),
        [resEmail1]	VARCHAR(512),
        [resEmail2]	VARCHAR(512),
        [resRepItems]	VARCHAR(512)
    );

    '''
    return create_table_sellIn_tax_codeFApi 

def create_table_sellIn_tax( db_name ):
    create_table_sellIn_tax = f'''
    CREATE TABLE [{ db_name }].[dbo].[TB_매입전자세금계산서_1](
            [seq] [int] IDENTITY(1,1) NOT NULL,
            [년월] [int] NOT NULL,
            [작성일자] [date] NOT NULL,
            [승인번호] [nvarchar](30) NOT NULL,
            [전송일자] [date] NULL,
            [공급자사업자no] [nvarchar](15) NOT NULL,
            [수요자사업자no] [nvarchar](15) NOT NULL,
            [종사업장번호] [int] NULL,
            [통계용공급자사업자no] [nvarchar](15) NULL,
            [상호] [nvarchar](100) NOT NULL,
            [대표자명] [nvarchar](50) NULL,
            [주소] [nvarchar](500) NULL,
            [합계금액] [int] NOT NULL,
            [공급가액] [int] NOT NULL,
            [세액] [int] NOT NULL,
            [분류] [nvarchar](10) NOT NULL,
            [종류] [nvarchar](10) NULL,
            [유형] [nvarchar](10) NULL,
            [비고] [nvarchar](100) NULL,
            [구분] [nvarchar](10) NULL,
            [공급자이메일] [nvarchar](100) NULL,
            [원가구분] [nvarchar](10) NULL,
            [송장번호] [nvarchar](30) NULL,
            [예비1] [nvarchar](500) NULL,
            [예비2] [nvarchar](500) NULL,
            [예비3] [nvarchar](500) NULL,
            [RegDate] [datetime] NULL,
            [UpdateDate] [datetime] NULL,
     CONSTRAINT [PK_TB_매입전자세금계산서_1] PRIMARY KEY CLUSTERED 
    (
            [seq] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
    ALTER TABLE [{ db_name }].[dbo].[TB_매입전자세금계산서_1] ADD  CONSTRAINT [DF__TB_매입전자세금{ db_name }__RegDa__6ABAD62E]  DEFAULT (getdate()) FOR [RegDate]
    GO
    ALTER TABLE [{ db_name }].[dbo].[TB_매입전자세금계산서_1] ADD  CONSTRAINT [DF__TB_매입전자세금{ db_name }__Updat__6BAEFA67]  DEFAULT (getdate()) FOR [UpdateDate]
    GO
    '''
    return create_table_sellIn_tax 

def post_process_sellIn_init( db_name ):
    post_process_sellIn_init = f'''
      insert into [{ db_name }].[dbo].[TB_매입전자세금계산서_1]( 년월, 작성일자, 승인번호, 전송일자, 공급자사업자no , 수요자사업자no , 상호, 대표자명 , 합계금액 , 공급가액 , 세액, 분류, 종류 , 유형, 비고, 구분, 공급자이메일 )
      select  format( resReportingDate,'yyyyMM') as 년월, resReportingDate as 작성일자 , resApprovalNo as 승인번호 ,  resSendDate as 전송일자 ,format(resSupplierRegNumber, '###-##-#####') as 공급자사업자no, format(resContractorRegNumber, '###-##-#####') as 수요자사업자no , resContractorCompanyName as 상호 , resContractorName as 대표자명,
      convert( bigint, resTotalAmount )as 합계금액 , convert( bigint, resSupplyValue ) as 공급가액 , convert( bigint , resTaxAmt ) as 세액, 
      case when resETaxInvoiceType = '일반(수정)' then '수정세금계산서' 
      else  '세금계산서' end  as 분류
      ,resETaxInvoiceType as  종류, resIssueNm as 유형,  resNote as 비고, resReceiptOrCharge  as 구분, resEmail as 공급자이메일
      from [ezoffice].[dbo].[TB_ezchemtech_매입전자세금계산서내역_codeFApi]
    '''
    return post_process_sellIn_init 

def post_process_sellIn_merge( db_name, period = -7 ):
    post_process_sellIn_merge = f'''
      merge [{ db_name }].[dbo].[TB_매입전자세금계산서_1] T
     using(
     select  format( resReportingDate,'yyyyMM') as 년월, resReportingDate as 작성일자 , resApprovalNo as 승인번호 ,  resSendDate as 전송일자 ,format(resSupplierRegNumber, '###-##-#####') as 공급자사업자no, format(resContractorRegNumber, '###-##-#####') as 수요자사업자no , resContractorCompanyName as 상호 , resContractorName as 대표자명,
      convert( bigint, resTotalAmount )as 합계금액 , convert( bigint, resSupplyValue ) as 공급가액 , convert( bigint , resTaxAmt ) as 세액, 
      case when resETaxInvoiceType = '일반(수정)' then '수정세금계산서' 
      else  '세금계산서' end  as 분류
      ,resETaxInvoiceType as  종류, resIssueNm as 유형,  resNote as 비고, resReceiptOrCharge  as 구분, resEmail as 공급자이메일
      from [ezoffice].[dbo].[TB_{ db_name }_매입전자세금계산서내역_codeFApi] where cast( [resIssueDate] as date ) > dateadd( day , { period } , getdate() )
       ) as S 
      on T.승인번호 = S.승인번호 
      when not matched then 
             insert ( 년월, 작성일자, 승인번호, 전송일자, 공급자사업자no , 수요자사업자no , 상호, 대표자명 , 합계금액 , 공급가액 , 세액, 분류, 종류 , 유형, 비고, 구분, 공급자이메일 )
                 values ( S.년월, S.작성일자, S.승인번호, S.전송일자, S.공급자사업자no , S.수요자사업자no , S.상호, S.대표자명 , S.합계금액 , S.공급가액 , S.세액, S.분류, S.종류 , S.유형, S.비고, S.구분, S.공급자이메일 ) ;
    '''
    return post_process_sellIn_merge 

def create_table_sellOut_tax( db_name ):
    create_table_sellOut_tax = f'''
    CREATE TABLE [{ db_name }].[dbo].[TB_매출전자세금계산서_1](
            [seq] [int] IDENTITY(1,1) NOT NULL,
            [년월] [int] NOT NULL,
            [작성일자] [date] NOT NULL,
            [승인번호] [nvarchar](30) NOT NULL,
            [전송일자] [date] NULL,
            [공급자사업자no] [nvarchar](15) NOT NULL,
            [수요자사업자no] [nvarchar](15) NOT NULL,
            [종사업장번호] [int] NULL,
            [통계용수요자사업자no] [nvarchar](15) NULL,
            [상호] [nvarchar](100) NOT NULL,
            [대표자명] [nvarchar](50) NULL,
            [주소] [nvarchar](500) NULL,
            [합계금액] [int] NOT NULL,
            [공급가액] [int] NOT NULL,
            [세액] [int] NOT NULL,
            [분류] [nvarchar](10) NOT NULL,
            [종류] [nvarchar](10) NULL,
            [유형] [nvarchar](10) NULL,
            [비고] [nvarchar](100) NULL,
            [구분] [nvarchar](10) NULL,
            [수요자이메일] [nvarchar](100) NULL,
            [예비1] [nvarchar](500) NULL,
            [예비2] [nvarchar](500) NULL,
            [예비3] [nvarchar](500) NULL,
            [RegDate] [datetime] NULL,
            [UpdateDate] [datetime] NULL,
     CONSTRAINT [PK_TB_매출전자세금계산서_1] PRIMARY KEY CLUSTERED
    (
            [seq] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
    ALTER TABLE [{ db_name }].[dbo].[TB_매출전자세금계산서_1] ADD  CONSTRAINT [DF__TB_매출전자세금{ db_name }__RegDa__6E8B6712]  DEFAULT (getdate()) FOR [RegDate]
    GO
    ALTER TABLE [{ db_name }].[dbo].[TB_매출전자세금계산서_1] ADD  CONSTRAINT [DF__TB_매출전자세금{ db_name }__Updat__6F7F8B4B]  DEFAULT (getdate()) FOR [UpdateDate]
    GO
    '''
    return create_table_sellOut_tax 

def post_process_sellOut_init( db_name ):
    post_process_sellOut_init = f'''
    insert into [{ db_name }].[dbo].[TB_매출전자세금계산서_1]( 년월, 작성일자, 승인번호, 전송일자, 공급자사업자no , 수요자사업자no , 상호, 대표자명 , 합계금액 , 공급가액 , 세액, 분류, 종류 , 유형, 비고, 구분, 수요자이메일 )
      select  format( resReportingDate,'yyyyMM') as 년월, resReportingDate as 작성일자 , resApprovalNo as 승인번호 ,  resSendDate as 전송일자 ,format(resSupplierRegNumber, '###-##-#####') as 공급자사업자no, format(resContractorRegNumber, '###-##-#####') as 수요자사업자no , resContractorCompanyName as 상호 , resContractorName as 대표자명,
      convert( bigint, resTotalAmount )as 합계금액 , convert( bigint, resSupplyValue ) as 공급가액 , convert( bigint , resTaxAmt ) as 세액,
      case when resETaxInvoiceType = '일반(수정)' then '수정세금계산서'
      else  '세금계산서' end  as 분류
      ,resETaxInvoiceType as  종류, resIssueNm as 유형,  resNote as 비고, resReceiptOrCharge  as 구분, resEmail1 as 수요자이메일
      from [ezoffice].[dbo].[TB_{ db_name }_매출전자세금계산서내역_codeFApi]
    '''
    return post_process_sellOut_init

def post_process_sellOut_merge( db_name, period = -7 ):
    post_process_sellOut_merge = f'''
      merge [{ db_name }].[dbo].[TB_매출전자세금계산서_1] T
      using(
      select  format( resReportingDate,'yyyyMM') as 년월, resReportingDate as 작성일자 , resApprovalNo as 승인번호 ,  resSendDate as 전송일자 ,format(resSupplierRegNumber, '###-##-#####') as 공급자사업자no, format(resContractorRegNumber, '###-##-#####') as 수요자사업자no , resContractorCompanyName as 상호 , resContractorName as 대표자명,
      convert( bigint, resTotalAmount )as 합계금액 , convert( bigint, resSupplyValue ) as 공급가액 , convert( bigint , resTaxAmt ) as 세액,
      case when resETaxInvoiceType = '일반(수정)' then '수정세금계산서'
      else  '세금계산서' end  as 분류
      ,resETaxInvoiceType as  종류, resIssueNm as 유형,  resNote as 비고, resReceiptOrCharge  as 구분, resEmail1 as 수요자이메일
      from [ezoffice].[dbo].[TB_{ db_name }_매출전자세금계산서내역_codeFApi] where cast( [resIssueDate] as date ) > dateadd( day ,{ period } , getdate() )
      ) as S
      on T.승인번호 = S.승인번호
      when not matched then
             insert ( 년월, 작성일자, 승인번호, 전송일자, 공급자사업자no , 수요자사업자no , 상호, 대표자명 , 합계금액 , 공급가액 , 세액, 분류, 종류 , 유형, 비고, 구분, 수요자이메일 )
                       values ( S.년월, S.작성일자, S.승인번호, S.전송일자, S.공급자사업자no , S.수요자사업자no , S.상호, S.대표자명 , S.합계금액 , S.공급가액 , S.세액, S.분류, S.종류 , S.유형, S.비고, S.구분, S.수요자이메일 );
    '''
    return post_process_sellOut_merge 

init_accountTr_foreign = '''
  insert into [TB_ezct_외화계좌거래내역]( 회사구분, 계좌명칭, 계좌번호, 거래일자 , 거래일시, 거래구분, 통화, 입금액, 출금액, 잔액, 적요 )
  SELECT 'chem',
  계좌명칭,
  a.[resAccount] as 계좌번호,
  cast([resAccountTrDate] as date) as 거래일자,  cast([resAccountTrDate] as datetime)  + CAST(STUFF(STUFF(RIGHT(CONCAT('000000',[resAccountTrTime]),6),5,0,':'),3,0,':') AS datetime) as 거래일시 ,
  case when convert( float , [resAccountIn] ) = 0 Then '출금' else '입금' end as  거래구분,
  [resAccountCurrency] as 통화,
  [resAccountIn] as 입금액,
  [resAccountOut] as 출금액,
  [resAfterTranBalance] as 잔액,
  concat([resAccountDesc1],' ',[resAccountDesc2],' ',[resAccountDesc3], ' ',[resAccountDesc4] ) as 적요
  from [TB_ezct_계좌거래내역_codeFApi] a left join [TB_bk_기관코드]  b on a.기관코드 = b.기관코드 left join TB_ezct_계좌목록_codeFApi c on c.resAccount = a.resAccount
  where a.[resAccount] in ( select [resAccount] from [TB_ezct_계좌목록_codeFApi] where [resAccountDeposit] = '20' )
  ''' 
def post_process_accountTransaction_1( db_name ='ezchemtech'):
    post_process_accountTransaction_1 = f'''
    merge [{ db_name }].[dbo].[TB_계좌거래내역_1] T
    using (
    SELECT 계좌명칭, [resAccount] as 계좌번호, cast([resAccountTrDate] as date) as 거래일자,  cast([resAccountTrDate] as datetime)  + CAST(STUFF(STUFF(RIGHT(CONCAT('000000',[resAccountTrTime]),6),5,0,':'),3,0,':') AS datetime) as 거래일시 ,
    case when [resAccountIn] = 0 Then '출금' else '입금' end as  거래구분,
    [resAccountIn] as 입금액,
    [resAccountOut] as 출금액,
    [resAfterTranBalance] as 잔액,
    concat([resAccountDesc1],' ',[resAccountDesc2],' ',[resAccountDesc3], ' ',[resAccountDesc4] ) as 적요
    from [TB_{ db_name }_계좌거래내역_codeFApi] a left join [TB_bk_기관코드]  b on a.기관코드 = b.기관코드
    where [resAccount] in ( select [resAccount] from [TB_{ db_name }_계좌목록_codeFApi] where [resAccountDeposit] = '11' ) and cast([resAccountTrDate] as date) > dateadd( day , -7 , getdate() )
    ) as S
    on T.거래일시 = S.거래일시 and T.계좌번호 = S.계좌번호 and T.잔액 = S.잔액
    when not matched  then
       insert ( 계좌명칭, 계좌번호, 거래일자 , 거래일시, 거래구분, 입금액, 출금액, 잔액, 적요 )
           values  ( s.계좌명칭, s.계좌번호, s.거래일자 , s.거래일시, s.거래구분, s.입금액, s.출금액, s.잔액, s.적요 ) ;
    '''
    return post_process_accountTransaction_1 

def post_process_accountTransaction_foreign( db_name='ezchemtech' ):
    post_process_accountTransaction_foreign = f'''  
    merge [{ db_name }].[dbo].[TB_외화계좌거래내역_1] T 
    using (
    SELECT 계좌명칭, a.[resAccount] as 계좌번호, cast([resAccountTrDate] as date) as 거래일자,  cast([resAccountTrDate] as datetime)  + CAST(STUFF(STUFF(RIGHT(CONCAT('000000',[resAccountTrTime]),6),5,0,':'),3,0,':') AS datetime) as 거래일시 ,
    case when convert( float, [resAccountIn]) = 0 Then '출금' else '입금' end as  거래구분,
    [resAccountCurrency] as 통화,
    [resAccountIn] as 입금액,
    [resAccountOut] as 출금액,
    [resAfterTranBalance] as 잔액,
    concat([resAccountDesc1],' ',[resAccountDesc2],' ',[resAccountDesc3], ' ',[resAccountDesc4] ) as 적요
    from [TB_{ db_name }_계좌거래내역_codeFApi] a left join [TB_bk_기관코드]  b on a.기관코드 = b.기관코드 left join TB_{ db_name }_계좌목록_codeFApi c on c.resAccount = a.resAccount
    where a.[resAccount] in ( select [resAccount] from [TB_{ db_name }_계좌목록_codeFApi] where [resAccountDeposit] = '20' ) and cast([resAccountTrDate] as date) > dateadd( day , -7 , getdate() )
    ) as S 
    on T.거래일시 = S.거래일시 and T.계좌번호 = S.계좌번호 and T.잔액 = S.잔액 
    when not matched  then 
       insert ( 회사구분, 계좌명칭, 계좌번호, 거래일자 , 거래일시, 거래구분, 통화, 입금액, 출금액, 잔액, 적요 ) 
           values  ( 'chem', s.계좌명칭, s.계좌번호, s.거래일자 , s.거래일시, s.거래구분,s.통화, s.입금액, s.출금액, s.잔액, s.적요 ) ; 
    '''         
    return post_process_accountTransaction_foreign 
##################################################################################
#
#   Extra Services( Log , report ) 
#
##################################################################################
def insert_service_logSql( service_name , org_name , comment ):
    insert_service_log = f'''
    set nocount on;
    insert into [ezoffice].[dbo].[TB_고객서비스_log_codeFApi]( [서비스명], [org_name],[비고] )
    output Inserted.seq 
    values('{ service_name }' , '{org_name}', '{ comment }')
    '''
    return insert_service_log

def update_service_logSql( seq , comment ):
    update_service_log = f'''
    update [ezoffice].[dbo].[TB_고객서비스_log_codeFApi] set [비고] = '{ comment }' where seq = { seq }
    '''
    return update_service_log


