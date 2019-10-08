-- SELECT users.first_name, users.last_name, post.user_id, post.title, post.info, post.url, post.post_id
SELECT *
FROM users
INNER JOIN post
ON users.user_id = post.user_id
WHERE users.user_id = $1;