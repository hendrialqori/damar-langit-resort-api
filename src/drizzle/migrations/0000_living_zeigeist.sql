CREATE TABLE `images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cloud_id` varchar(50) NOT NULL,
	`cloud_url` text NOT NULL,
	`menu` varchar(225) NOT NULL,
	`submenu` varchar(100) NOT NULL,
	`type` enum('NATIONAL','ARABIC') NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `type_submenu` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(30) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `type_submenu_id` PRIMARY KEY(`id`)
);
