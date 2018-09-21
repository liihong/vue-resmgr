-- ------------------------------------------------------

--  RESOURCE_LOG 资源日志表

-- ------------------------------------------------------

 CREATE TABLE `RESOURCE_LOG` (
  `ID` VARCHAR(50) NOT NULL COMMENT 'ID',
  `TABLE_ID` VARCHAR(60) DEFAULT NULL COMMENT '资源id',
  `KEY_COLUMN` VARCHAR(60) DEFAULT NULL COMMENT '表唯一标识列',
  `DATA_ID` VARCHAR(60) DEFAULT NULL COMMENT '表唯一标识列数据',
  `OPERATE_TYPE` VARCHAR(20) DEFAULT NULL COMMENT '数据改动类型  ADD,MODIFY,DELETE',
  `LOG_DATE` DATETIME DEFAULT NULL COMMENT '数据采集时间',
  `PRE_INFO` VARCHAR(3000) DEFAULT NULL COMMENT '操作前信息',
  `NEXT_INFO` VARCHAR(3000) DEFAULT NULL COMMENT '操作后信息',
  `USER_NAME` VARCHAR(50) DEFAULT NULL COMMENT '用户名',
  `UNIT_ID` VARCHAR(30) DEFAULT NULL COMMENT '所属单位',
  PRIMARY KEY (`ID`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8 COMMENT='资源日志表';
