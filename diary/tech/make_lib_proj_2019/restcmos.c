PlatformInitPreMem.c
1984 DEBUG ((DEBUG_INFO, "GetWakeupEventAndSaveToHob : WakeUpType %x\n", *WakeUpType));
// RICHARD-CHOI.  2019-03-13 
//  Status = PeiServicesGetBootMode (&BootMode);
//  flag_Cmos = CmosRead8(CMOS_TXT_REG);
    IoWrite8(0x70,0xA0); 
    flag_Cmos = IoRead8(0x71);
    DEBUG ((DEBUG_INFO, "flags_Coms : %x\n", flag_Cmos));
//   ASSERT_EFI_ERROR (Status);
  if(*WakeUpType == 1 ){
      if( flag_Cmos != 0x25){
  //        PeiServicesSetBootMode( 0x25 );
  //        CmosWrite8(CMOS_TXT_REG, 0x25);
          IoWrite8(0x70,0xA0); 
          IoWrite8(0x71,0x25); 
          
          IoWrite8(0x70,0xA0); 
          flag_Cmos = IoRead8(0x71);
              
          MicroSecondDelay ( STALL_ONE_MILLI_SECOND * 100);
          DEBUG ((DEBUG_INFO, "flags_Coms : %x\n", flag_Cmos));
          DEBUG ((DEBUG_INFO, "Perform Cold Reset\n"));
          IoWrite8 (RESET_GENERATOR_PORT, 0x0E);
      }else {
 //         CmosWrite8(CMOS_TXT_REG, 0);//PeiServicesSetBootMode(BOOT_ON_S5_RESUME);
          IoWrite8(0x70,0xA0); 
          IoWrite8(0x71,0x0); 
      }
}