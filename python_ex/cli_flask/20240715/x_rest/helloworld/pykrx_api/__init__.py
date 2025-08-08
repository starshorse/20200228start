import click 
from flask import Blueprint
from ._3days_rule._3days_rule import _3days_rule_main, _3days_rule_group ,  _3days_rule_message,  get_tickers , add_ticker    
from ._3days_rule._3days_rule_all import _3days_rule_kospi, _3days_rule_etf  
from ._hotSpot._hotSpot_all import _hotSpot_kospi, _hotSpot_etf 
from ._net_buy._net_buy import net_buy_kospi ,net_buy_kosdaq  

bp_pykrx = Blueprint('pykrx', __name__ )

@bp_pykrx.cli.command('help')
def help():
    print('####################################################################');
    print('#                                                                  #');
    print('# 3days_rule  [group_name( me, message,  g1, g2 ,g3 ) ]            #');
    print('# 3days_rule_all  [group_name( kospi , etf , div ) ]               #');
    print('# hotSpot_all [group_name( kospi, etf ) ]                          #');
    print('# get_tickers [group_name( me , g1, g2 ,g3 ) ]                     #');
    print('# add_ticker  [group_name( me , g1, g2 ,g3 ) ] [code( 001234)]     #');
    print('# net_buy     [market(KOSPI,KOSDAQ)] [owner(ANT,DOMESTIC,FOREIGN)] #');
    print('#                                                                  #');
    print('####################################################################');

@bp_pykrx.cli.command('3days_rule')
@click.argument('group_name')
def _3days_rule( group_name ):
    if( group_name == 'me' ):
        _3days_rule_main();
    elif group_name == 'message':
        _3days_rule_message();
    else:
        _3days_rule_group( group_name );

@bp_pykrx.cli.command('3days_rule_all')
@click.argument('group_name')
def _3days_rule( group_name ):
    if( group_name == 'kospi' ):
        _3days_rule_kospi();
    elif group_name == 'etf':
        _3days_rule_etf();
    elif group_name == 'div':
        _3days_rule_etf_div();
    else:
       print("group_name incorrect[ kospi/etf/div ]")

@bp_pykrx.cli.command('hotSpot_all')
@click.argument('group_name')
def _3days_rule( group_name ):
    if( group_name == 'kospi' ):
        _hotSpot_kospi();
    elif group_name == 'etf':
        _hotSpot_etf();
    else:
       print("group_name incorrect[ kospi ]")

@bp_pykrx.cli.command('get_tickers')
@click.argument('group_name') 
def _get_tickers( group_name ):
    get_tickers( group_name );
    
@bp_pykrx.cli.command('add_ticker')
@click.argument('group_name') 
@click.argument('code') 
def _add_ticker( group_name , code ):
    add_ticker( group_name , code );

@bp_pykrx.cli.command('net_buy')
@click.argument('market') 
@click.argument('owner') 
def _net_buy( market , owner ):
    if market == 'KOSPI':
        net_buy_kospi(owner);
    elif market == 'KOSDAQ':
        net_buy_kosdaq(owner);
    else:
        print("Market name incorrect[ KOSPI/KOSDAQ ]")
