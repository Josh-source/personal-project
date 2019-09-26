UPDATE
    post
SET
    title = $1,
    info = $2
WHERE
    post_id = $3;