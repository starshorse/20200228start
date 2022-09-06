#include <stdio.h>
char *code = "  \ 
\" VIM 옵션\n\
syntax on						\" 구문강조 사용\n\
set autoindent						\" 자동 들여쓰기\n\
set smartindent						\" 스마트한 들여쓰기\n\
set cindent						\" C 프로그래밍용 자동 들여쓰기\n\
set shiftwidth=4					\" 자동 들여쓰기 4칸\n\
set tabstop=4						\" 탭을 4칸으로\n\
set nobackup						\" 백업 파일을 안만듬\n\
set nowrapscan						\" 검색할 때 문서의 끝에서 처음으로 안돌아감\n\
set ignorecase						\" 검색시 대소문자 무시, set ic 도 가능\n\
set hlsearch						\" 검색어 강조, set hls 도 가능\n\
set number						\" 행번호 표시, set nu 도 가능\n\
set nocompatible					\" 오리지날 VI와 호환하지 않음\n\
set backspace=eol,start,indent				\" 줄의 끝, 시작, 들여쓰기에서 백스페이스시 이전줄로\n\
set ruler						\" 화면 우측 하단에 현재 커서의 위치(줄,칸) 표시\n\
set cursorline						\" 편집 위치에 커서 라인 설정\n\
set laststatus=2					\" 상태바 표시를 항상한다\n\
set incsearch						\" 키워드 입력시 점진적 검색\n\
set fencs=ucs-bom,utf-8,euc-kr.latin1			\" 한글 파일은 euc-kr로, 유니코드는 유니코드로\n\
set fileencoding=utf-8					\" 파일저장인코딩\n\
set tenc=utf-8						\" 터미널 인코딩\n\
set background=dark					\" 하이라이팅 lihgt / dark\n\
set history=1000					\" vi 편집기록 기억갯수 .viminfo에 기록\n\
set t_Co=256						\" 색 조정\n\
highlight Comment term=bold cterm=bold ctermfg=4	\" 코멘트 하이라이트\n\
set wrap\n\
set noswapfile\n\
set lbr\n\
set clipboard=unnamedplus \n\
\"set visualbell						\" 키를 잘못눌렀을 때 화면 프레시\n\
\"set mouse=a						\" vim에서 마우스 사용\n\
\"\n\
\" VIM 플러그인 설치 목록\n\
\"\n\
set rtp+=~/.vim/bundle/Vundle.vim\n\
call vundle#begin()\n\
Plugin 'VundleVim/Vundle.vim'				\" VIM 플러그인 관리 플러그인\n\
Plugin 'airblade/vim-gitgutter'				\" Git으로 관리하는 파일의 변경된 부분을 확인\n\
Plugin 'scrooloose/nerdtree'				\" 파일트리\n\
Plugin 'scrooloose/nerdcommenter'			\" 주석\n\
Plugin 'taglist-plus'					\" 소스파일의 클래스, 함수, 변수 정보 창\n\
Plugin 'bling/vim-airline'				\" 상태바(Vim 사용자의 하단 상태바를 변경)\n\
Plugin 'vim-syntastic/syntastic'			\" 구문 체크\n\
Plugin 'nanotech/jellybeans.vim'			\" 색상 테마 변경\n\
Plugin 'ctrlpvim/ctrlp.vim'				\" 하위 디렉토리 파일 찾기\n\
Plugin 'Lokaltog/vim-easymotion'			\" 한 화면에서 커서 이동\n\
Plugin 'surround.vim'					\" 소스 버전 컨트롤\n\
Plugin 'iwataka/ctrlproj.vim'				\" 지정된 위치 프로젝트 파일 찾기\n\
Plugin 'Quich-Filter'					\" 라인 필터링\n\
Plugin 'terryma/vim-multiple-cursors'			\" 여러 커서에서 동시 수정\n\
\" Plugin 'SirVer/ultisnips'				\" 저장한 코드 조각 입력\n\
Plugin 'mattn/emmet-vim'				\" HTML, CSS 코드 단축 입력\n\
Plugin 'HTML.zip'					\" HTML 단축 입력\n\
Plugin 'rking/ag.vim'					\" 문자열 찾기\n\
Plugin 'chrisbra/NrrwRgn'				\" 라인 범위 지정 후 수정\n\
Plugin 'MultipleSearch'					\" 여러 문자열 동시에 강조\n\
Plugin 'majutsushi/tagbar'				\" ctags 결과 표시\n\
Plugin 'xuhdev/SingleCompile'				\" 하나의 파일 컴파일 후 실행\n\
Plugin 'mhinz/vim-signify'				\" 버전 관리 파일 상태 표시\n\
Plugin 'tommcdo/vim-lion'				\" 라인 정렬\n\
Plugin 'tpope/vim-fugitive'				\" Vim에서 git 명령어 사용\n\
Plugin 'elzr/vim-json'					\" JSON 파일 보기\n\
Plugin 'AutoComplPop'					\" 자동 완성(Ctrl + P)를 누르지 않음\n\
call vundle#end()\n\
filetype plugin indent on				\" 파일 종류에 따른 구문강조\n\
colorscheme jellybeans					\" vi 색상 테마 설정\n\
au FileType * setl fo-=cro				\" 자동 주석 기능 해제\n\
\"\n\
\" ctrlp.vim 설정\n\
\"\n\
let g:ctrlp_custom_ignore = {\n\
 \\ 'dir':  '\\.git$\\|public$\\|log$\\|tmp$\\|vendor$',\n\
  \\ 'file': '\\v\\.(exe|so|dll)$'\n\
\\ }\n\
\"\n\
\" Tag list 설정\n\
\"\n\
let Tlist_Use_Right_Window = 1\n\
let Tlist_Auto_Open = 0\n\
let Tlist_Exit_OnlyWindow = 0\n\
let Tlist_Inc_Winwidth = 0\n\
let Tlist_Ctags_Cmd = \"/usr/bin/ctags\"\n\
\"\n\
\" 단축키\n\
\"\n\
map <F3> <C-w><C-v>\n\
map <F4> <C-w><C-w>\n\
map <F5> :NERDTreeToggle<cr>\n\
map <F6> :TlistToggle<cr>\n\
"; 
int main( int argc, char ** argv){
    FILE *pFile = NULL ;
    pFile = fopen(".vimrc","w");
    fputs( code, pFile);
    fclose( pFile);
    return 0; 
}
