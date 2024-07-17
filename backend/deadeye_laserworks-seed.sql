-- All users' passwords will be "password"

-- Insert users
INSERT INTO "users" (username, first_name, last_name, email, birth_date, password, status, is_verified)
VALUES 
('user', 'Regular', 'User', 'user@example.com', '1990-01-01', '$2b$13$Lbf3ejRakvMzGH6X28oTwOp6hg72ZVNt98VhkbBTRp5KSFAnTZw3G', 'user', TRUE),
('userAdmin', 'Admin', 'User', 'admin@example.com', '1985-01-01', '$2b$13$Lbf3ejRakvMzGH6X28oTwOp6hg72ZVNt98VhkbBTRp5KSFAnTZw3G', 'admin', TRUE);

-- Insert services
INSERT INTO services (title, description, price)
VALUES 
('Service 1', 'Description for Service 1', 100.00),
('Service 2', 'Description for Service 2', 200.00);

-- Insert support tickets
INSERT INTO support_tickets (ticket_number, title, description, status, time)
VALUES 
('TICK123456', 'Issue 1', 'Description for issue 1', 'open', NOW()),
('TICK123457', 'Issue 2', 'Description for issue 2', 'open', NOW());

-- Insert reviews
INSERT INTO reviews (user_id, review_text, rating, time, service_id)
VALUES 
(1, 'Great service!', 5, NOW(), 1),
(2, 'Not bad.', 3, NOW(), 2);

-- Insert comments
INSERT INTO comments (comment_text, time, review_id)
VALUES 
('I agree!', NOW(), 1),
('Could be better.', NOW(), 2);

-- Insert user services
INSERT INTO users_services (user_id, service_id, confirmed_price, is_completed, addition_info, confirmation_code, support_ticket_id, requested_date, fulfilled_date)
VALUES 
(1, 1, 100.00, TRUE, 'Additional info for user 1 service 1', 'CONFIRM123', 1, NOW(), NOW()),
(2, 2, 200.00, FALSE, 'Additional info for user 2 service 2', 'CONFIRM456', 2, NOW(), NULL);

-- Insert ticket conversations
INSERT INTO ticket_conversations (ticket_id, user_id, admin_id, message, timestamp)
VALUES 
(1, 1, 2, 'Initial message from user regarding issue 1', NOW()),
(1, 2, 2, 'Response from admin regarding issue 1', NOW()),
(2, 1, 2, 'Initial message from user regarding issue 2', NOW()),
(2, 2, 2, 'Response from admin regarding issue 2', NOW());
