CREATE TABLE `maps` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cloud_id` varchar(50) NOT NULL,
	`cloud_url` text NOT NULL,
	`location` varchar(100) NOT NULL,
	`x_coordinate` int,
	`y_coordinate` int,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `maps_id` PRIMARY KEY(`id`)
);
