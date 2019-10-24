insert into right (id, right) values
(1, 'ROLE_ADMIN'),
(2, 'ROLE_EDITOR'),
(3, 'ROLE_USER');

insert into user (id, username, email, password) values
(1, 'admin', 'admin@m183.local', '$2a$10$L.D3KvtnawuMr9xOuzaJbOQiu1EJ4NyIEeAnCvt.j3n5zO/7yeK0G'),
(2, 'editor', 'editor@m183.local', '$2a$10$yrYO7rxkvsS0Dm.OWyhgR.L08rhJyy9Pr6mCEzgHMoEgQJmNmbDWG'),
(3, 'user', 'user@m183.local', '$2a$10$TgaGpefEHkOhX27YCgdYTeXdJBTrAvC4i/SqM.4BQGi4mk4g7/vG6');

insert into user_rights(user_id, right_id) values
(1,1),
(1,3),
(2,2),
(2,3),
(3,3);

insert into post(id, title, author_id, content, uploaded) values
(0, 'Hello World', 2, 'This is a hello world post with not a lot of content that must be over 60 chars or so to test if the diareses actually works', now());