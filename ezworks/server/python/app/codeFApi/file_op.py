from os import listdir , makedirs, chmod  
from os.path import dirname , join, isdir  
from datetime import datetime 

def checkOrg_name( org_name ):
    cur_dir = dirname(__file__) 
    tar_dir =  join( cur_dir, f'NPKI/{ org_name }' ) 
    createFlag = 0
    if not isdir( tar_dir ):
        makedirs( tar_dir )
        chmod( tar_dir , 0o777 ); 
        createFlag = 1
    return createFlag 

def getPath_upload( org_name , which, cur_date ):
    cur_dir = dirname(__file__) 
    #cur_date = datetime.now().strftime('%Y-%m')
    tar_dir =  join( cur_dir, f'NPKI/{ org_name }/{ which }/{ cur_date }') 
    if( checkOrg_name( org_name) ):
        return tar_dir 
    if not isdir( tar_dir ):
        makedirs( tar_dir )
        chmod( tar_dir , 0o777 ); 
    return tar_dir 

if __name__=='__main__':
    #print( checkOrg_name('ezoffice'))     
    print( getPath_upload( 'ezoffice', '001' )) 
