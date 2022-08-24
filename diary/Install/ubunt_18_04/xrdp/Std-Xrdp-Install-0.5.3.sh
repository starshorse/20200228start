#!/bin/bash
#####################################################################################################
# Script_Name : Std-Xrdp-install-0.5.3.sh
# Description : Perform an automated standard installation of xrdp
# on ubuntu 18.04 and later
# Date : October 2018
# written by : Griffon
# Web Site :http://www.c-nergy.be - http://www.c-nergy.be/blog
# Version : 0.5.3
# History : 0.5.3 - Using Unoffical xRDP packages for Ubuntu 18.04.2 issue
#         : 0.5.2 - Quick Fix for Ubuntu 18.04.2
#         : 0.5.1 - Add support to Ubuntu 18.10 
#         : 0.5   - Add logic to enable sound redirection 
#                 - re-write code logic to include functions
#                 - Removed support for Ubuntu 17.10 as reached end of support
#         : 0.4   - Add logic to fix GDM lock screen + minor change
#         : 0.3   - Adding logic to fix theme and extensions for any users login through xrdp
#           0.2   - Added Logic for Ubuntu 17.10 and 18.04 detection 
#                 - Updated the polkit section
#                 - New formatting and structure  
#           0.1   - Initial Script       
# Disclaimer : Script provided AS IS. Use it at your own risk....
####################################################################################################


#---------------------------------------------------#
#  Detecting if Parameters passed to script .... 
#---------------------------------------------------#

while getopts g:s:u: option 
do 
 case "${option}" 
 in 
 g) fixGDM=${OPTARG};; 
 s) fixSound=${OPTARG};;
 u) unofficialRepo=${OPTARG};; 
 esac 
done 

#---------------------------------------------------#
# Script Version information Displayed              #
#---------------------------------------------------#

echo
/bin/echo -e "\e[1;36m   !-------------------------------------------------------------!\e[0m"
/bin/echo -e "\e[1;36m   !   Standard XRDP Installation Script  - Ver 0.5.3            !\e[0m"
/bin/echo -e "\e[1;36m   !   Written by Griffon - March 2019 - www.c-nergy.be        !\e[0m"
/bin/echo -e "\e[1;36m   !-------------------------------------------------------------!\e[0m"
echo


#--------------------------------------------------------------------------#
# -----------------------Function Section - DO NOT MODIFY -----------------#
#--------------------------------------------------------------------------#

#---------------------------------------------------#
# Function 0  - Patch Ubuntu 18.04.2
#---------------------------------------------------#

install_xservercore() 
{
echo
/bin/echo -e "\e[1;33m   !----------------------------------------------------------!\e[0m"
/bin/echo -e "\e[1;33m   !   Installing xserver-xorg-core Packages...Proceeding...  !\e[0m"
/bin/echo -e "\e[1;33m   !----------------------------------------------------------!\e[0m"
echo
sudo apt-get install xserver-xorg-core -y
echo
/bin/echo -e "\e[1;33m   !----------------------------------------------------------!\e[0m"
/bin/echo -e "\e[1;33m   !   Installing xserver-xorg-input-all pkg...Proceeding...  !\e[0m"
/bin/echo -e "\e[1;33m   !----------------------------------------------------------!\e[0m"
echo
sudo apt-get -y install xserver-xorg-input-all 
}


#---------------------------------------------------#
# Function 1  - Install xRDP Software.... 
#---------------------------------------------------#

install_xrdp() 
{
echo
/bin/echo -e "\e[1;33m   !---------------------------------------------!\e[0m"
/bin/echo -e "\e[1;33m   !   Installing XRDP Packages...Proceeding...  !\e[0m"
/bin/echo -e "\e[1;33m   !---------------------------------------------!\e[0m"
echo
sudo apt-get install xrdp -y 
}

#---------------------------------------------------#
# Function 2 - Install Gnome Tweak Tool.... 
#---------------------------------------------------#

install_tweak() 
{
echo
/bin/echo -e "\e[1;33m   !---------------------------------------------!\e[0m"
/bin/echo -e "\e[1;33m   !   Installing Gnome Tweak...Proceeding...    !\e[0m"
/bin/echo -e "\e[1;33m   !---------------------------------------------!\e[0m"
echo
sudo apt-get install gnome-tweak-tool -y
}

#--------------------------------------------------------------------#
# Fucntion 3 - Allow console Access ....(seems optional in u18.04)
#--------------------------------------------------------------------#

allow_console() 
{
echo
/bin/echo -e "\e[1;33m   !---------------------------------------------!\e[0m"
/bin/echo -e "\e[1;33m   !   Granting Console Access...Proceeding...   !\e[0m"
/bin/echo -e "\e[1;33m   !---------------------------------------------!\e[0m"
echo
sudo sed -i 's/allowed_users=console/allowed_users=anybody/' /etc/X11/Xwrapper.config
}

#---------------------------------------------------#
# Function 4 - create policies exceptions .... 
#---------------------------------------------------#

create_polkit()
{
echo
/bin/echo -e "\e[1;33m   !---------------------------------------------!\e[0m"
/bin/echo -e "\e[1;33m   !   Creating Polkit File...Proceeding...      !\e[0m"
/bin/echo -e "\e[1;33m   !---------------------------------------------!\e[0m"
echo

sudo bash -c "cat >/etc/polkit-1/localauthority/50-local.d/45-allow.colord.pkla" <<EOF
[Allow Colord all Users]
Identity=unix-user:*
Action=org.freedesktop.color-manager.create-device;org.freedesktop.color-manager.create-profile;org.freedesktop.color-manager.delete-device;org.freedesktop.color-manager.delete-profile;org.freedesktop.color-manager.modify-device;org.freedesktop.color-manager.modify-profile
ResultAny=no
ResultInactive=no
ResultActive=yes
EOF

}


#---------------------------------------------------#
# Function 5 - Fixing Theme and Extensions .... 
#---------------------------------------------------#

fix_theme()
{
echo
/bin/echo -e "\e[1;33m   !---------------------------------------------!\e[0m"
/bin/echo -e "\e[1;33m   !   Fix Theme and extensions...Proceeding...  !\e[0m"
/bin/echo -e "\e[1;33m   !---------------------------------------------!\e[0m"
echo



#Check if script has already run.... 
if grep -xq "#fixGDM-by-Griffon" /etc/xrdp/startwm.sh; then
 echo "Skip theme fixing as script has run at least once..."
else
#Set xRDP session Theme to Ambiance and Icon to Humanity if Ubuntu 18.04.x
if  [[ "$version" = *"Ubuntu 18.04"* ]];
then
sudo sed -i.bak "4 a #fixGDM-by-Griffon\ngnome-shell-extension-tool -e ubuntu-appindicators@ubuntu.com\ngnome-shell-extension-tool -e ubuntu-dock@ubuntu.com\n\nif [ -f ~/.xrdp-fix-theme.txt ]; then\necho 'no action required'\nelse\ngsettings set org.gnome.desktop.interface gtk-theme 'Ambiance'\ngsettings set org.gnome.desktop.interface icon-theme 'Humanity'\necho 'check file for xrdp theme fix' >~/.xrdp-fix-theme.txt\nfi\n" /etc/xrdp/startwm.sh
elif [[ "$version" = *"Ubuntu 18.10"* ]];
then
sudo sed -i.bak "4 a #fixGDM-by-Griffon\ngnome-shell-extension-tool -e ubuntu-appindicators@ubuntu.com\ngnome-shell-extension-tool -e ubuntu-dock@ubuntu.com\n\nif [ -f ~/.xrdp-fix-theme.txt ]; then\necho 'no action required'\nelse\ngsettings set org.gnome.desktop.interface gtk-theme 'Yaru'\ngsettings set org.gnome.desktop.interface icon-theme 'Yaru'\necho 'check file for xrdp theme fix' >~/.xrdp-fix-theme.txt\nfi\n" /etc/xrdp/startwm.sh
else 
echo "Error Occured somewhere...Exiting..."
exit
fi

fi
echo
}



#---------------------------------------------------#
# Function 6- Fixing GDM - As an Option .... 
#---------------------------------------------------#
fix_gdm()
{
echo
/bin/echo -e "\e[1;33m   !---------------------------------------------!\e[0m"
/bin/echo -e "\e[1;33m   !   Fix for GDM Lock Screen color...          !\e[0m"
/bin/echo -e "\e[1;33m   !---------------------------------------------!\e[0m"
echo
# Step 1 - Install prereqs for compilation later on
sudo apt-get -y install libglib2.0-dev-bin
sudo apt-get -y install libxml2-utils

# extract gresource info (from url...)
workdir=${HOME}/shell-theme
if [ ! -d ${workdir}/theme ]; then
  mkdir -p ${workdir}/theme
  mkdir -p ${workdir}/theme/icons

fi
gst=/usr/share/gnome-shell/gnome-shell-theme.gresource
 
for r in `gresource list $gst`; do
        gresource extract $gst $r >$workdir/${r#\/org\/gnome\/shell/}
done

/bin/echo -e "\e[1;33m    |-| Creating XML File...   \e[0m"
# create the xml file 
bash -c "cat >${workdir}/theme/gnome-shell-theme.gresource.xml" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<gresources>
  <gresource prefix="/org/gnome/shell/theme">
    <file>calendar-arrow-left.svg</file>
    <file>calendar-arrow-right.svg</file>
    <file>calendar-today.svg</file>
    <file>checkbox-focused.svg</file>
    <file>checkbox-off-focused.svg</file>
    <file>checkbox-off.svg</file>
    <file>checkbox.svg</file>
    <file>close-window.svg</file>
    <file>corner-ripple-ltr.png</file>
    <file>corner-ripple-rtl.png</file>
    <file>dash-placeholder.svg</file>
    <file>gnome-shell.css</file>
    <file>gnome-shell-high-contrast.css</file>
    <file>no-events.svg</file>
    <file>no-notifications.svg</file>
    <file>noise-texture.png</file>
    <file>page-indicator-active.svg</file>
    <file>page-indicator-inactive.svg</file>
    <file>page-indicator-checked.svg</file>
    <file>page-indicator-hover.svg</file>
    <file>process-working.svg</file>
    <file>toggle-off-us.svg</file>
    <file>toggle-off-intl.svg</file>
    <file>toggle-on-hc.svg</file>
    <file>toggle-on-us.svg</file>
    <file>toggle-on-intl.svg</file>
  </gresource>
</gresources>
EOF
cd ${workdir}/theme
/bin/echo -e "\e[1;33m    |-| Modify Css...   \e[0m"
sed -i -e 's/background: #2e3436/background: #2c00e1/g' ~/shell-theme/theme/gnome-shell.css 

##Delete the file noise-texture.png (grey one)
rm ${workdir}/theme/noise-texture.png

/bin/echo -e "\e[1;33m    |-| Download Purple image file...   \e[0m"
#Download the noise-texture.png with purple background 
wget http://www.c-nergy.be/downloads/noise-texture.png

/bin/echo -e "\e[1;33m    |-| Compile Resource File...   \e[0m"
#Compile file and copy to correct location....
cd ${workdir}/theme
glib-compile-resources gnome-shell-theme.gresource.xml 

/bin/echo -e "\e[1;33m    |-| Copy file to target location...   \e[0m"

# make a backup of the file and copy the file....
sudo cp /usr/share/gnome-shell/gnome-shell-theme.gresource /usr/share/gnome-shell/gnome-shell-theme.gresource.bak
sudo cp ${workdir}/theme/gnome-shell-theme.gresource /usr/share/gnome-shell/gnome-shell-theme.gresource
echo

}

#---------------------------------------------------------#
# Function 7 - Enable Sound Redirection - As an option..  #
#---------------------------------------------------------#
enable_sound()
{
echo
/bin/echo -e "\e[1;33m   !---------------------------------------------!\e[0m"
/bin/echo -e "\e[1;33m   !   Enabling Sound Redirection...             !\e[0m"
/bin/echo -e "\e[1;33m   !---------------------------------------------!\e[0m"
echo

# Step 1 - Install xrdp-pulseaudio-installer package
sudo apt-get install xrdp-pulseaudio-installer  -y

# Step 2 - Enable Source Code Repository
sudo apt-add-repository -s 'deb http://be.archive.ubuntu.com/ubuntu/ '$codename' main restricted'
sudo apt-add-repository -s 'deb http://be.archive.ubuntu.com/ubuntu/ '$codename' restricted universe main multiverse'
sudo apt-add-repository -s 'deb http://be.archive.ubuntu.com/ubuntu/ '$codename'-updates restricted universe main multiverse'
sudo apt-add-repository -s 'deb http://be.archive.ubuntu.com/ubuntu/ '$codename'-backports main restricted universe multiverse'
sudo apt-add-repository -s 'deb http://be.archive.ubuntu.com/ubuntu/ '$codename'-security main restricted universe main multiverse'
sudo apt-get update

# Step 3 - Download pulseaudio source in /tmp directory
cd /tmp
sudo apt source pulseaudio 

# Step 4 - Compile
pulsever=$(pulseaudio --version | awk '{print $2}')

cd /tmp/pulseaudio-$pulsever
sudo ./configure

# Step 5 - Create xrdp sound modules

cd /usr/src/xrdp-pulseaudio-installer
sudo make PULSE_DIR="/tmp/pulseaudio-$pulsever"

# Step 6 - copy files to correct location 

sudo install -t "/var/lib/xrdp-pulseaudio-installer" -D -m 644 *.so
echo

}


#--------------------------------------------------------------------------#
# -----------------------END Function Section             -----------------#
#--------------------------------------------------------------------------#


#--------------------------------------------------------------------------#
#------------                 MAIN SCRIPT SECTION       -------------------#  
#--------------------------------------------------------------------------#

#---------------------------------------------------#
#-- Step 0 - Try to Detect Ubuntu Version.... 
#---------------------------------------------------#

version=$(lsb_release -sd) 
codename=$(lsb_release -sc) 

echo
/bin/echo -e "\e[1;33m   |-| Detecting Ubuntu version        \e[0m"

if  [[ "$version" = *"Ubuntu 18.04"* ]];
then
/bin/echo -e "\e[1;32m       |-| Ubuntu Version : $version\e[0m"
echo
elif [[ "$version" = *"Ubuntu 18.10"* ]];
then
/bin/echo -e "\e[1;32m       |-| Ubuntu Version : $version\e[0m"
echo
else
/bin/echo -e "\e[1;31m  !------------------------------------------------------------!\e[0m"
/bin/echo -e "\e[1;31m  ! Your system is not running Ubuntu 18.04 Edition and later  !\e[0m"
/bin/echo -e "\e[1;31m  ! The script has been tested only on Ubuntu 18.04 and later  !\e[0m"
/bin/echo -e "\e[1;31m  ! The script is exiting...                                   !\e[0m"              
/bin/echo -e "\e[1;31m  !------------------------------------------------------------!\e[0m"
echo
exit
fi


/bin/echo -e "\e[1;33m   |-| Detecting Parameters        \e[0m"


#Detect if argument passed
if [ "$fixSound" = "yes" ]; 
then 
/bin/echo -e "\e[1;32m       |-| Sound Redirection Option...: [YES]\e[0m"
else
/bin/echo -e "\e[1;32m       |-| Sound Redirection Option...: [NO]\e[0m"
fi

if [ "$fixGDM" = "yes" ]; 
then 
/bin/echo -e "\e[1;32m       |-| gdm fix Option.............: [YES]\e[0m"
else
/bin/echo -e "\e[1;32m       |-| gdm fix Option.............: [NO]\e[0m"
fi
echo


if [ "$unofficialRepo" = "yes" ]; 
then 
/bin/echo -e "\e[1;32m       |-| Unofficial Repo...........: [YES]\e[0m"
else
/bin/echo -e "\e[1;32m       |-| Unofficial Repo...........: [NO]\e[0m"
fi
echo



#---------------------------------------------------------#
# Step 2 - Executing the installation & config tasks .... #
#---------------------------------------------------------#

echo
/bin/echo -e "\e[1;36m   !-------------------------------------------------------------!\e[0m"
/bin/echo -e "\e[1;36m   !   Installation Process starting....                         !\e[0m"
/bin/echo -e "\e[1;36m   !-------------------------------------------------------------!\e[0m"
echo
/bin/echo -e "\e[1;33m   |-| Proceed with installation.....       \e[0m"
echo 

if  [[ "$version" = *"Ubuntu 18.04.2"* ]];
then
/bin/echo -e "\e[1;32m       |-| Ubuntu Version : $version\e[0m"
echo
/bin/echo -e "\e[1;36m   !-------------------------------------------------------------!\e[0m"
/bin/echo -e "\e[1;36m   !  Applying Installation Patch for Ubuntu 18.04.2 Only        !\e[0m"
/bin/echo -e "\e[1;36m   !-------------------------------------------------------------!\e[0m"
echo
if [ "$unofficialRepo" = "yes" ];
then
/bin/echo -e "\e[1;32m   	=>  Downloading Unofficial xRDP packages (Thiago Martins)      !\e[0m"
echo
sudo add-apt-repository ppa:martinx/xrdp-hwe-18.04 -y
sudo apt-get update
install_xrdp
install_tweak
allow_console
create_polkit
fix_theme
else
/bin/echo -e "\e[1;32m   	=>  Downgrading to previous xserver-xorg-* packages            !\e[0m"
echo
install_xservercore
install_xrdp
install_tweak
allow_console
create_polkit
fix_theme
fi
else
install_xrdp
install_tweak
allow_console
create_polkit
fix_theme
fi

if [ "$fixGDM" = "yes" ]; 
then 
fix_gdm
fi

if [ "$fixSound" = "yes" ]; 
then 
enable_sound
fi


#---------------------------------------------------#
# Step 9 - Credits .... 
#---------------------------------------------------#
echo
/bin/echo -e "\e[1;36m   !---------------------------------------------------------------------------!\e[0m"
/bin/echo -e "\e[1;36m   ! Installation Completed                                                    !\e[0m" 
/bin/echo -e "\e[1;36m   ! Please test your xRDP configuration.A Reboot Might be required...         !\e[0m"
/bin/echo -e "\e[1;36m   ! Written by Griffon - March 2019 - Ver 0.5.3 - Std-Xrdp-Install-0.5.3.sh   !\e[0m"
/bin/echo -e "\e[1;36m   !                                                                           !\e[0m"
/bin/echo -e "\e[1;36m   ! Thanks to Thiago Martins who provided Updated xRDP packages :-)           !\e[0m"
/bin/echo -e "\e[1;36m   !---------------------------------------------------------------------------!\e[0m"
echo





