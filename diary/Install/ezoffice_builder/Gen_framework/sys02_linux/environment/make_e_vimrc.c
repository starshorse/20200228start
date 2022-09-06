#include <stdio.h>

char *code = " \
\" Basic Settings\n\
colorscheme CodeSchool3\n\
set termguicolors\n\
syntax on\n\
set number\n\
set relativenumber\n\
set hlsearch\n\
set ignorecase\n\
set tabstop=4\n\
set softtabstop=4\n\
set shiftwidth=4\n\
set expandtab\n\
autocmd FileType make setlocal noexpandtab\n\
\" Key Settings\n\
nnoremap <F2> :set invpaste paste?<CR>\n\
set pastetoggle=<F2>\n\
let mapleader = \",\"\n\
nnoremap <leader>q :bp<CR>\n\
nnoremap <leader>w :bn<CR>\n\
\" Key Setting - resize windows\n\
nnoremap <silent> <Leader>= :exe \"resize +3\"<CR>\n\
nnoremap <silent> <Leader>- :exe \"resize -3\"<CR>\n\
nnoremap <silent> <Leader>] :exe \"vertical resize +8\"<CR>\n\
nnoremap <silent> <Leader>[ :exe \"vertical resize -8\"<CR>\n\
nnoremap <silent> <Leader>+ :exe \"resize \" . (winheight(0) * 3/2)<CR>\n\
nnoremap <silent> <Leader>_ :exe \"resize \" . (winheight(0) * 2/3)<CR>\n\
nnoremap <silent> <Leader>} :exe \"vertical resize \" . (winheight(0) * 3/2)<CR>\n\
nnoremap <silent> <Leader>{ :exe \"vertical resize \" . (winheight(0) * 2/3)<CR>\n\
\" Vundle\n\
set nocompatible              \" be iMproved, required\n\
filetype off                  \" required\n\
\" set the runtime path to include Vundle and initialize\n\
set rtp+=~/.vim/bundle/Vundle.vim\n\
call vundle#begin()\n\
\" alternatively, pass a path where Vundle should install plugins\n\
\"call vundle#begin('~/some/path/here')\n\
\" let Vundle manage Vundle, required\n\
Plugin 'VundleVim/Vundle.vim'\n\
\" Keep Plugin commands between vundle#begin/end.\n\
Plugin 'vim-airline/vim-airline'\n\
Plugin 'vim-airline/vim-airline-themes'\n\
Plugin 'The-NERD-Tree'\n\
Plugin 'terryma/vim-multiple-cursors'\n\
Plugin 'terryma/vim-smooth-scroll'\n\
Plugin 'Raimondi/delimitMate'\n\
Plugin 'SirVer/ultisnips'\n\
Plugin 'honza/vim-snippets'\n\
Plugin 'Syntastic'\n\
Plugin 'Shougo/deoplete.nvim'\n\
Plugin 'Rip-Rip/clang_complete'\n\
Plugin 'scrooloose/nerdcommenter'\n\
\" All of your Plugins must be added before the following line\n\
call vundle#end()            \" required\n\
filetype plugin indent on    \" required\n\
\" To ignore plugin indent changes, instead use:\n\
\"filetype plugin on\n\
\"\n\
\" Brief help\n\
\" :PluginList       - lists configured plugins\n\
\" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate\n\
\" :PluginSearch foo - searches for foo; append `!` to refresh local cache\n\
\" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal\n\
\"\n\
\" see :h vundle for more details or wiki for FAQ\n\
\" Put your non-Plugin stuff after this line\n\
\" for vim-airline\n\
let g:airline#extensions#tabline#enabled = 1 \" turn on buffer list\n\
let g:airline_theme='hybrid'\n\
set laststatus=2 \" turn on bottom bar\n\
\" The-NERD-Tree\n\
autocmd BufEnter * lcd %:p:h\n\
autocmd VimEnter * if !argc() | NERDTree | endif\n\
nmap <leader>ne :NERDTreeToggle<cr>\n\
let NERDTreeShowLineNumbers=1\n\
let g:NERDTreeWinPos = \"right\"\n\
\" vim-multiple-cursor\n\
let g:multi_cursor_use_default_mapping=0\n\
\" Default mapping\n\
let g:multi_cursor_next_key='<C-n>'\n\
let g:multi_cursor_prev_key='<C-p>'\n\
let g:multi_cursor_skip_key='<C-x>'\n\
let g:multi_cursor_quit_key='<Esc>'\n\
\" vim-smooth-scroll\n\
noremap <silent> <c-b> :call smooth_scroll#up(&scroll*2, 10, 5)<CR>\n\
noremap <silent> <c-f> :call smooth_scroll#down(&scroll*2, 10, 5)<CR>\n\
noremap <silent> <c-u> :call smooth_scroll#up(&scroll, 10, 3)<CR>\n\
noremap <silent> <c-d> :call smooth_scroll#down(&scroll, 10, 3)<CR>\n\
\" delimitMate\n\
let delimitMate_expand_cr=1\n\
\" UltiSnips\n\
let g:UltiSnipsExpandTrigger=\"<tab>\"\n\
let g:UltiSnipsJumpForwardTrigger=\"<tab>\"\n\
let g:UltiSnipsJumpBackwardTrigger=\"<s-tab>\"\n\
let g:UltiSnipsEditSplit=\"vertical\"\n\
\" Syntastic\n\
set statusline+=%#warningmsg#\n\
set statusline+=%{SyntasticStatuslineFlag()}\n\
set statusline+=%*\n\
let g:syntastic_always_populate_loc_list = 1\n\
let g:syntastic_auto_loc_list = 1\n\
let g:syntastic_check_on_open = 1\n\
let g:syntastic_check_on_wq = 0\n\
let g:syntastic_cpp_compiler = 'g++'\n\
let g:syntastic_cpp_compiler_options = \"-std=c++11 -Wall -Wextra -Wpedantic\"\n\
let g:syntastic_c_compiler_options = \"-std=c11 -Wall -Wextra -Wpedantic\"\n\
\" Deoplete.\n\
let g:deoplete#enable_at_startup = 1\n\
\" clang_complete\n\
set completeopt-=preview\n\
\" NERD Commenter\n\
\" Add spaces after comment delimiters by default\n\
let g:NERDSpaceDelims = 1\n\
\" Use compact syntax for prettified multi-line comments\n\
let g:NERDCompactSexyComs = 1\n\
\" Align line-wise comment delimiters flush left instead of following code indentation\n\
let g:NERDDefaultAlign = 'left'\n\
\" Set a language to use its alternate delimiters by default\n\
let g:NERDAltDelims_java = 1\n\
\" Add your own custom formats or override the defaults\n\
let g:NERDCustomDelimiters = { 'c': { 'left': '/**','right': '*/' } }\n\
\" Allow commenting and inverting empty lines (useful when commenting a region)\n\
let g:NERDCommentEmptyLines = 1\n\
\" Enable trimming of trailing whitespace when uncommenting\n\
let g:NERDTrimTrailingWhitespace = 1\n\
\" customize keymapping\n\
map <Leader>cc <plug>NERDComToggleComment\n\
map <Leader>c<space> <plug>NERDComComment \n\
";

int main( int argc , char** argv){
    FILE *pFile = NULL ;
    pFile = fopen(".vimrc","w");
    fputs( code, pFile);
    fclose( pFile);
    return 0;
}
