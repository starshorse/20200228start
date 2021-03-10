
Trackback 0 Comment 2 








qemu/kvm으로 윈도우 가상머신 사용하기

가상화 2012.10.25 04:51 




KVM이 활성화 되어 있지 않으면 x86 CPU를 에뮬레이션하므로 매우 느리다. 호스트 운영체제에서 KVM 모듈이 올라가 있는지 lsmod로  확인한다. kvm 모듈과 kvm_intel 또는 kvm_amd 모듈이 올라가 있어야 한다. kvm 모듈이 없으면 리눅스 커널 컴파일 설정과 빌드를 다시 해야한다. (요즘 CPU는 거의 다 포함되어 있지만, 저가형 CPU 모델에는 Intel VT-x와 AMD SVM등의 하드웨어 지원 가상화 기능이 빠져있는 경우도 있다. 이런 CPU에서는 KVM을 사용 할 수 없다.)

$ lsmod | grep kvm

qemu 코드를 받아온다.

$ git clone git://git.qemu.org/qemu.git

컴파일 설정을 한다.

$ ./configure --enable-kvm --enable-sdl --target-list=x86_64-softmmu --audio-drv-list=alsa
•--enable-kvm: kvm 기능 활성화 한다.
•--enalbe-sdl: 로컬에서 디스플레이 하기 위해서 SDL 라이브러리를 활성화 시킨다.
•--target-list=x86_64-softmmu: qemu는 ARM이나 PPC등 호스트와 다른 머신을 에뮬레이션 할 수 있다. 지금은 사용 중인 머신과 똑같은 x86 64bit 아키텍처를 타겟으로 한다.
•--audio-drv-list=alsa: 현재 사용 중인 오디오 드라이버를 포함시킨다.

빌드 및 설치.

$ make

$ sudo make install




디폴트로 '/usr/local/bin' 디렉토리에 설치가 된다. 실행하기 편하게 심볼릭 링크도 하나 만들어두자.

$ sudo ln -s /usr/local/bin/qemu-system-x86_64 /usr/local/bin/qemu




하드디스크로 사용 할 이미지 파일을 생성한다.

$ qemu-img create -f qcow windows7.img 50G




qcow 방식은 COW(Copy-On-Write) 방식으로 동적으로 하드 디스크 이미지를 확장시키므로 디스크 공간을 절약할 수 있다. 하지만, 미리 사용할 디스크를 만들어 두는 것 보다 아무래도 느리다. 하드디스크 공간이 딱히 부족하다거나 하지 않으면 그냥 RAW 이미지를 만들자.

$ qemu-img windows7.img 50G







설치 할 Windows 7 ISO 파일을 cdrom으로 지정하고, cdrom 부터 부팅이 되도록 설정하여 가상 머신에 윈도우를 설치한다.


$ qemu --enable-kvm -sdl -m 2048 -cpu kvm64 -vga vmware -soundhw ac97 -hda windows7.img -cdrom windows7.iso -boot dc
•--enable-kvm: kvm 기능을 활성화 한다.
•-sdl: 로컬에서 디스플레이하도록 SDL을 사용한다. 이 옵션을 주지 않으면 디폴트는 VNC이다. (원격 데스크탑. VNC 클라이언트로 원격지에서 가상머신에 접속이 가능하다.)
•-m 2048: 메모리 크기 설정. 2G로 설정하였다.
•-cpu kvm64: CPU 설정. 64bit x86 아키텍처이고, KVM을 사용 중이므로 kvm64를 CPU로 설정한다.
•-vga vmware: 비디오 카드 설정. std, cirrus, vmware, qxl, xenfb등을 지원한다. 로컬에서 사용하기에는 cirrus와 vmware가 가장 낫다. qxl은 VNC와 유사한 spice라는 원격 데스크탑 프로그램에 최적화된 비디오 카드이다.
•-soundhw ac97: 사운드 카드 설정.
•-hda windows7.img: 하드디스크 설정.
•-cdrom windows7.iso: cdrom으로 사용 할 ISO 이미지 설정.
•-boot dc: 부팅 순서를 설정한다. D(cdrom) 드라이브부터 부팅해서 Windows 7을 설치 하도록 한다.




윈도우 설치가 끝났으면 다음부터는 다음과 같은 커맨드로 가상머신을 실행 하면 된다.




$ qemu --enable-kvm -sdl -m 2048 -cpu kvm64 -vga vmware -soundhw ac97 -hda windows7.img 