SELECT users.first_name, users.last_name, post.post_id post.title, post.info, post.image_url
FROM users
INNER JOIN post
ON users.id = post.post_id
WHERE username = $1;
