from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData , Identity , Unicode 

engine = create_engine('sqlite:///:memory:', echo=True)
metadata = MetaData()
"""
players_table = Table('players', metadata,
   Column('id', Integer, primary_key=True),
   Column('name', String),
   Column('score', Integer)
 )

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
"""

def create_accountList( company_name ):
    accountList = Table(f'TB_{ company_name }_게좌목록_codeFApi', metadata ,
    Column('seq', Integer, Identity(start=1, increment=1), primary_key=True ),
    Column('기관코드',Unicode(20) ),
    Column('resAccount' ,Unicode(512) ),
    Column('resAccountBalance' ,Integer ),
    Column('resAccountDeposit' ,Integer ),
    Column('resAccountNickName' ,Unicode(512) ),
    Column('resAccountStartDate' ,Integer ),
    Column('resAccountEndDate' ,Unicode(512) ),
    Column('resAccountName' ,Unicode(512) ),
    Column('resAccountDisplay' ,Unicode(512) ),
    Column('resAccountCurrency' ,Unicode(512) ),
    Column('resLastTranDate' ,Unicode(512) ),
    Column('resOverdraftAcctYN' ,Unicode(512) ),
    Column('resLoanKind' ,Unicode(512) ),
    Column('resLoanBalance' ,Unicode(512) ),
    Column('resLoanStartDate' ,Unicode(512) ),
    Column('resLoanEndDate' ,Unicode(512) )
    )
    return accountList


if __name__=='__main__':
    create_accountList('ezchemtech')
    metadata.create_all( engine )

