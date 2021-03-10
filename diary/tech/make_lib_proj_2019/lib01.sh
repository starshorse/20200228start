
###    qemu/kvm으로 윈도우 가상머신 사용하기#######
$ lsmod | grep kvm
$ git clone git://git.qemu.org/qemu.git
$ ./configure --enable-kvm --enable-sdl --target-list=x86_64-softmmu --audio-drv-list=alsa
$ make
$ sudo make install
$ sudo ln -s /usr/local/bin/qemu-system-x86_64 /usr/local/bin/qemu
$ qemu-img create -f qcow windows7.img 50G
$ qemu-img windows7.img 50G
$ qemu --enable-kvm -sdl -m 2048 -cpu kvm64 -vga vmware -soundhw ac97 -hda windows7.img -cdrom windows7.iso -boot dc
$ qemu --enable-kvm -sdl -m 2048 -cpu kvm64 -vga vmware -soundhw ac97 -hda windows7.img 
