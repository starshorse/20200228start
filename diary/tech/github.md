github
===================

# Pro Git 2/E

```
git status -S 
```
### .gitignore 
* *.a
* !lib.a - 해당 파일만 무시하지 않기 
* /TODO  - 해당 디렉토리에 TDDO 무시 
* build/ - build 디렉토리에 있는 모든 파일은 무시 
* doc/*.txt 
* doc/**/*.pdf 
```
 git diff  //수정했지만 [staged상태]가 아닌 파일 비교 
 git commit -a -m 'added new benchmarks'
 git rm log/\*.log 
 git rm \*~
 git log -p -2  // -p는 각 커밋의 diff결과를 보여준다.
 git log --stat // 통계정보 
```
#### 되돌리기
```
git commit --amend 
git commit -m 'initial Commit'
git add forgotten_file 
git commit --amend 
```
#### 파일 상태를 [unstage로 변경하기]
```
git reset HEAD CONTRIBUTING.md
```
#### Modified 파일 돌리기( commit된 파일로 )
```
git checkout -- CONTRIBUTING.md
```



## Reset
앞에서 설명한대로 Reset은 시계를 다시 맞추는 것입니다. 돌아 가려는 커밋으로 리파지토리는 재설정되고, 해당 커밋 이후의 이력은 사라집니다. 예를 한번 들어볼까요? ( 일반적인 개발 이력과는 차이가 있지만, 이해가 쉽게 하기 위해 영화 “유주얼 서스펙트”를 이용했고 이에 대한 스포일러를 포함합니다. 하지만, 이미 보셨거나 들어보셨을 것이라 생각합니다. )

$ git reset <옵션> <돌아가고싶은 커밋>

여기에 옵션이 몇가지 있는데 자주 쓰는 것 hard, mixed, soft 세가지가 있습니다. 영화를 예매하고 검색한 이력인 a3bbb3c 이후에 발생했던 ( 표를 예매하고, 팝콘과 사이다를 구매 같은)변화에 대해서 어떻게 할지에 대한 것입니다.
 

(1) hard
돌아가려는 이력이후의 모든 내용을 지워 버립니다. 이렇게 하면 표를 예매하고, 팝콘과 사이다를 구매했던 모든 것들이 지워지고 모든것이 초기화 됩니다.

$ git reset --hard  a3bbb3c
$ git reset --soft a2bbb3c

(3) mixed ( 옵션을 적지 않으면 mixed로 동작합니다. )
역시 이력은 되돌려집니다. 이후에 변경된 내용에 대해서는 남아있지만, 인덱스는 초기화 됩니다. 커밋을 하려면 다시 변경된 내용은 추가해야 하는 상태입니다. 기억도 되돌려 졌고, 표와 팝콘 그리고 사이다는 사야겠다는 마음만 남아있다고 할 수 있습니다.

$ git reset --mixed a2bbb3c

또 되돌아가는 커밋을 커밋 해쉬를 통해서 직접 지정할 수도 있고 현재부터 몇개의 커밋을 되돌릴 수도 있습니다 [그림1]에서 처럼 15413dc 부터 a3bbb3c로 돌아가려면
$ git reset HEAD~6

2. Revert

Revert는 상태를 되돌린다고 볼 수 있습니다. 스포를 당한 커밋을 revert하고 현재 작성중인 코드만 본다면 reset과 동일한 (hard 옵션 준거만 빼고) 결과를 가집니다. 하지만 이력은 같지 않습니다. 먼저 결과를 먼저 보고 이어가겠습니다. (reset과 동일하게 스포일러를 당한 것을 되돌립니다)
이전 이력은 그대로 있고, 스포일러를 당했던 커밋만을 되돌렸습니다. 마치 스포일러 당한것에 대한 것을 기억하고 있지만, 그 내용은 알지 못하는 것처럼 말이죠. ( 이 내용은 앞에서 언급했던 Devpools의 설명에 나온 모나리자 눈썹의 내용이 더 이해가 쉬울것 같습니다. )

revert 를 하는 방법과 스포일러 댓글의 커밋을 되돌리는 것은


# git revert <되돌릴 커밋> 
git revert 2664ce8
git revert 2664ce8..15413dc
