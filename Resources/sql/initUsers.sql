drop table if exists `miyakogame_user`;
create table `miyakogame_user` (
	`user_name` varchar(32) not null,
	`nickname` varchar(32) not null,
	`avatar` varchar(256),
	`high_score` int(8) not null,
	`pwd` varchar(36) not null,
	`game_data` varchar(512) not null,
	`gmt_created` datetime,
	`gmt_modified` datetime,
	primary key(`user_name`)
) engine=InnoDB default charset=utf8mb4;

drop table if exists `miyakogame_avatar`;
create table `miyakogame_avatar` (
	`id` varchar(36) not null,
	`file_path` varchar(256) not null,
	`gmt_created` datetime,
	`gmt_modified` datetime,
	primary key(`id`)
) engine=InnoDB default charset=utf8mb4;