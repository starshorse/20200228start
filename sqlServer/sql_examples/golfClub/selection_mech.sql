with abc( me, you ) AS
(  select distinct a.meSeq AS me , b.meSeq As you  from  TB_team_selection a inner join TB_team_selection b on a.meSeq = b.selSeq )
select distinct a.me, a.you from abc a inner join abc b on a.me = b.you 