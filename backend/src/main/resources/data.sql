insert into right (id, right) values
(1, 'ROLE_ADMIN'),
(2, 'ROLE_EDITOR'),
(3, 'ROLE_USER');

insert into user (id, username, email, password) values
(1, 'admin', 'admin@m150.local', '$2a$10$LD46dZLQoaMu5pHH2uKTHODjg..Q9r2lVow4wwLrDOWHQtfIypAKS'), -- adminpassword
(2, 'editor', 'editor@m150.local', '$2a$10$B/u5qJNFLCA3B59UtqPTNurosYa.WGLt5AQgL5OuflOz97aA6OhsC'), -- editorpassword
(3, 'user', 'user@m150.local', '$2a$10$KPH0eLpLydDab6SUFrknKuMZ47r5sNHQOzzg7xCY0HP1cxoO9.tZC'); -- userpassword

insert into user_rights(user_id, right_id) values
(1,1),
(1,3),
(2,2),
(2,3),
(3,3);

insert into category(id, name) values
(1, 'random'),
(2, 'code'),
(3, 'politics');

insert into post(id, category_id, title, author_id, content, uploaded) values
(1, 1, 'Hello World', 2, 'This is a hello world post with not a lot of content that must be over 150 chars or so to test if the diareses actually works which is why this sentence is getting longer and longer until it hits >150 chars', now()),
(2, 1, 'Lorem ipsum', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at vestibulum enim, in vehicula neque. Fusce cursus purus luctus mauris hendrerit, quis pretium mi sagittis. Praesent fringilla enim ut libero malesuada ornare. Pellentesque sollicitudin efficitur vulputate. Mauris ex odio, gravida eget posuere non, consequat sit amet mi. Etiam nec finibus augue, a dictum orci. Sed mattis neque quis felis placerat imperdiet. Fusce gravida, tellus pharetra varius scelerisque, augue est mollis dolor, sed mattis justo ipsum id ligula. Donec ultrices augue ut mollis porttitor. Proin consectetur tempus bibendum. Mauris faucibus mi eu odio consequat, ut pellentesque dolor ultrices. Proin nec erat egestas, viverra ipsum ac, varius justo. Suspendisse euismod blandit dolor id porttitor. Phasellus ac lacus vel odio ullamcorper venenatis vel at ipsum. Vestibulum vitae hendrerit nisl.' || CHAR(10) || CHAR(10) || 'Duis enim quam, consequat id ipsum fringilla, tempor pharetra erat. Phasellus dapibus finibus nisi, at malesuada arcu bibendum ut. Nam ut vehicula dui. Mauris interdum, dui vulputate ultrices mollis, lorem lacus venenatis risus, vel blandit tortor diam ac diam. In hac habitasse platea dictumst. Curabitur sem odio, malesuada in suscipit eget, vulputate nec elit. Integer fringilla, justo vehicula faucibus efficitur, velit magna tempus justo, ut commodo magna erat quis ipsum. Aenean libero orci, ullamcorper condimentum sapien eu, congue pellentesque ante. Sed bibendum faucibus ex. Suspendisse a enim iaculis, vestibulum lacus in, egestas tortor. Ut a vestibulum neque, sed iaculis quam. Etiam at purus eu enim lacinia pulvinar sed quis nisl. Praesent dapibus dui id auctor feugiat. Nullam in sollicitudin felis, et ultricies ante. Integer at nunc a odio dictum ultricies at sed dui.' || CHAR(10) || CHAR(10) || 'Vestibulum viverra quam eu varius viverra. Aenean lobortis iaculis mauris sit amet lacinia. Cras quis metus ornare, auctor quam eu, accumsan diam. Mauris non ante orci. Sed sapien orci, pulvinar at elementum in, dictum id lacus. Donec in quam enim. Proin nec turpis vehicula, semper lorem nec, dignissim ex. Sed non velit quis eros rutrum dapibus. Donec purus dui, tincidunt eget urna eu, lobortis iaculis magna. Vestibulum eu sapien quis justo auctor lacinia. Duis mauris lectus, pulvinar a hendrerit eu, aliquam vitae neque.' || CHAR(10) || CHAR(10) || 'Proin non augue ultricies, mollis nibh id, lacinia lacus. Donec sed gravida erat, et tincidunt lacus. Aenean vel iaculis nunc. Nulla luctus consequat mauris. Fusce a metus vitae tortor imperdiet feugiat at eget diam. Donec sem purus, fringilla eget arcu et, fringilla malesuada odio. Proin volutpat placerat quam, nec iaculis nunc pellentesque sed. Donec augue enim, tincidunt sit amet ex eget, elementum facilisis mi. Sed aliquet orci erat, in gravida lectus porta ut. Sed at ipsum ut tellus aliquam semper. Sed id urna ac sapien dapibus sodales at eu lorem. Ut accumsan ligula non dolor tristique ullamcorper. Aenean consequat dui luctus metus condimentum, quis imperdiet metus viverra.' || CHAR(10) || CHAR(10) || 'Phasellus gravida nisi accumsan lacus commodo facilisis. Suspendisse potenti. Fusce scelerisque rhoncus elit ac volutpat. In rhoncus, purus vitae cursus aliquam, odio dolor porttitor lacus, vitae rutrum velit leo pulvinar ipsum. Nunc nec ante quam. Mauris viverra justo erat, ac lacinia turpis faucibus id. Donec posuere nulla sed massa tempor, eget cursus nunc molestie. Aenean euismod non est nec volutpat. Nullam ornare posuere nisi et volutpat. Fusce ultricies vel augue a malesuada. In imperdiet rhoncus magna at semper. Nunc id ante eget felis finibus bibendum. Cras mollis eros sapien.', now());

insert into comment(id, post_id, user_id, parent_id, comment, `timestamp`) values
(1, 1, 3, null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', current_timestamp());