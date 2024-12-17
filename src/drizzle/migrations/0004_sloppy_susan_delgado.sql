CREATE TABLE `promos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cloud_id` varchar(50) NOT NULL,
	`cloud_url` text NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `promos_id` PRIMARY KEY(`id`)
);
