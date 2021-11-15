USE [OpsFlow]
GO

PRINT N'Creating Schema [Saga]...';
GO

CREATE SCHEMA Saga
GO

PRINT N'Creating Table [Opsflow].[Saga].[Instance]...';
GO

CREATE TABLE [OpsFlow].[Saga].[Instance](
  SagaType VARCHAR(255) NOT NULL,
  SagaId VARCHAR(100) NOT NULL,
  StateName VARCHAR(100) NOT NULL,
  LastRequestId VARCHAR(100),
  EndState BIT,
  Compensating BIT,
  SagaDataType VARCHAR(1000) NOT NULL,
  SagaDataJson VARCHAR(MAX) NOT NULL,
  PRIMARY KEY(SagaType, SagaId)
);
