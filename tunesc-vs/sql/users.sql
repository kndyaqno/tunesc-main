


CREATE TABLE `users` (
    `id` int(11) NOT NULL,
    `oauth_provider` enum(`google`,`facebook`) NOT NULL DEFAULT `google`,
    `oauth_id` varchar(50) NOT NULL,
)