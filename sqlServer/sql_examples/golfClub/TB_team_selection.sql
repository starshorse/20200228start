create table TB_team_selection ( seq  INT IDENTITY PRIMARY KEY , match_id  INT NOT NULL , meSeq INT NOT NULL , selSeq INT NOT NULL , priority INT NOT NULL,  CHECK( priority < 4 AND priority > 0)); 

insert into  TB_team_selection( match_id , meSeq , selSeq , priority ) values( 1, 1, 2, 1)
insert into  TB_team_selection( match_id , meSeq , selSeq , priority ) values( 1, 1, 3, 2)
insert into  TB_team_selection( match_id , meSeq , selSeq , priority ) values( 1, 1, 4, 3)
insert into  TB_team_selection( match_id , meSeq , selSeq , priority ) values( 1, 2, 4, 1)
insert into  TB_team_selection( match_id , meSeq , selSeq , priority ) values( 1, 2, 5, 2)
insert into  TB_team_selection( match_id , meSeq , selSeq , priority ) values( 1, 2, 6, 3)
insert into  TB_team_selection( match_id , meSeq , selSeq , priority ) values( 1, 3, 2, 1)
insert into  TB_team_selection( match_id , meSeq , selSeq , priority ) values( 1, 3, 1, 2)
insert into  TB_team_selection( match_id , meSeq , selSeq , priority ) values( 1, 3, 5, 3)
insert into  TB_team_selection( match_id , meSeq , selSeq , priority ) values( 1, 4, 2, 1)
insert into  TB_team_selection( match_id , meSeq , selSeq , priority ) values( 1, 4, 6, 2)
insert into  TB_team_selection( match_id , meSeq , selSeq , priority ) values( 1, 4, 7, 3)
insert into  TB_team_selection( match_id , meSeq , selSeq , priority ) values( 1, 5, 1, 1)
insert into  TB_team_selection( match_id , meSeq , selSeq , priority ) values( 1, 5, 3, 2)
insert into  TB_team_selection( match_id , meSeq , selSeq , priority ) values( 1, 5, 2, 3)
insert into  TB_team_selection( match_id , meSeq , selSeq , priority ) values( 1, 6, 2, 1)

