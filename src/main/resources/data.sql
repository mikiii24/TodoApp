CREATE TABLE IF NOT EXISTS m_todo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status BOOLEAN DEFAULT false
);

-- m_todo テーブルに初期データを挿入
INSERT INTO m_todo (title, status) VALUES ('Example Todo 1', false);
INSERT INTO m_todo (title, status) VALUES ('Example Todo 2', true);