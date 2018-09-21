-- ------------------------------------------------------
--  RESOURCE_TABLE 资源表

-- ------------------------------------------------------

 CREATE TABLE `RESOURCE_TABLE` 
   (	`TABLE_ID` VARCHAR(20)  NOT NULL COMMENT '表id,主键', 
	`TABLE_NAME` VARCHAR(255 ) COMMENT '表名', 
	`RESOURCE_NAME` VARCHAR(255 ) COMMENT '资源名称', 
	`WHERE_SQL` TEXT COMMENT 'where条件sql', 
	`ORDERBY_SQL` TEXT COMMENT '排序条件sql', 
	`AUTH_COLUMN_NAME` VARCHAR(255 ) COMMENT '权限相关列（多个用英文分号分隔）', 
	`ISLOG` VARCHAR(1 ) DEFAULT 1 COMMENT '是否计入日志', 
	`BEFORE_ADD_TYPE` VARCHAR(255 ) COMMENT '表数据添加前执行的方法的类型', 
	`BEFORE_ADD_SQL` TEXT COMMENT '表数据添加前执行的方法', 
	`AFTER_ADD_TYPE` VARCHAR(255 ) COMMENT '表数据添加后执行的方法的类型', 
	`AFTER_ADD_SQL` TEXT COMMENT '表数据添加后执行的方法', 
	`BEFORE_MODIFY_TYPE` VARCHAR(255 ) COMMENT '表数据修改前执行的方法的类型', 
	`BEFORE_MODIFY_SQL` TEXT COMMENT '表数据修改前执行的方法', 
	`AFTER_MODIFY_TYPE` VARCHAR(255 ) COMMENT '表数据修改后执行的方法的类型', 
	`AFTER_MODIFY_SQL` TEXT COMMENT '表数据修改后执行的方法', 
	`BEFORE_DELETE_TYPE` VARCHAR(255 ) COMMENT '表数据删除前执行的方法的类型', 
	`BEFORE_DELETE_SQL` TEXT COMMENT '表数据删除前执行的方法', 
	`AFTER_DELETE_TYPE` VARCHAR(255 ) COMMENT '表数据删除后执行的方法的类型', 
	`AFTER_DELETE_SQL` TEXT COMMENT '表数据删除后执行的方法', 
	`REMARK` VARCHAR(200 ) COMMENT '备注', 
	`VIEWFIELD` VARCHAR(20 ) COMMENT '该资源的名称字段。例如user_label', 
	`ISTOPO` VARCHAR(1 ) COMMENT '是否在拓扑上显示', 
	`SHOW_IMAGE_MANAGE` VARCHAR(20 ) DEFAULT 0 COMMENT '是否显示图片管理模块', 
	`TREE_ICOPATH` VARCHAR(200 ) COMMENT '资源树图标路径', 
	`DEFAULT_IMAGEPATH` VARCHAR(200 ) COMMENT '资源默认图标路径',
	PRIMARY KEY (`TABLE_ID`)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='资源表';
