USE [ezchemtech]
GO

/****** Object:  Table [dbo].[TB_e_approval_request]    Script Date: 2022-12-06 오후 1:56:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TB_e_approval_request](
	[seq] [int] IDENTITY(1,1) NOT NULL,
	[seqItem] [int] NOT NULL,
	[drafterName] [nvarchar](10) NOT NULL,
	[requestType] [nvarchar](20) NOT NULL,
	[requestTitle] [nvarchar](64) NOT NULL,
	[requestDesc] [nvarchar](512) NOT NULL,
	[signatoryNameList] [nvarchar](20) NULL,
	[processDesc] [nvarchar](10) NULL,
	[result] [nvarchar](20) NULL,
	[priority] [nvarchar](2) NOT NULL,
	[RegDate] [datetime] NULL,
	[UpdateDate] [datetime] NULL,
 CONSTRAINT [PK_TB_e_approval_request] PRIMARY KEY CLUSTERED 
(
	[seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[TB_e_approval_request] ADD  CONSTRAINT [DF_TB_e_approval_request_RegDate]  DEFAULT ([dbo].[getdate]()) FOR [RegDate]
GO

ALTER TABLE [dbo].[TB_e_approval_request] ADD  CONSTRAINT [DF_TB_e_approval_request_UpdateDate]  DEFAULT ([dbo].[getdate]()) FOR [UpdateDate]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'TB_e_approval_item의 seq' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TB_e_approval_request', @level2type=N'COLUMN',@level2name=N'seqItem'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'기안자이름' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TB_e_approval_request', @level2type=N'COLUMN',@level2name=N'drafterName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'요청구분' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TB_e_approval_request', @level2type=N'COLUMN',@level2name=N'requestType'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'요청제목' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TB_e_approval_request', @level2type=N'COLUMN',@level2name=N'requestTitle'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'요청세부내용' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TB_e_approval_request', @level2type=N'COLUMN',@level2name=N'requestDesc'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'서명자이름리스트' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TB_e_approval_request', @level2type=N'COLUMN',@level2name=N'signatoryNameList'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'진행상황' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TB_e_approval_request', @level2type=N'COLUMN',@level2name=N'processDesc'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'전자결재결과' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TB_e_approval_request', @level2type=N'COLUMN',@level2name=N'result'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'긴급여부' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TB_e_approval_request', @level2type=N'COLUMN',@level2name=N'priority'
GO


