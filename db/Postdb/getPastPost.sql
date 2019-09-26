SELECT users.first_name, users.last_name, post.user_id, post.title, post.info, post.url
FROM users
INNER JOIN post
ON users.user_id = post.user_id;