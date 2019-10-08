-- SELECT * FROM post;
-- SELECT users.first_name, users.last_name, post.post_id, post.title, post.info
-- FROM users
-- INNER JOIN post
-- ON users.user_id = post.post_id;
SELECT * FROM post
INNER JOIN users
ON users.user_id = post.user_id;