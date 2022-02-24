CREATE DATABASE Tasks

--user accounts and team
CREATE TABLE  user_account (
    id SERIAL PRIMARY KEY,
    username VARCHAR(60) UNIQUE,
    password VARCHAR(60),
    email VARCHAR(255) UNIQUE,
    last_name VARCHAR(60),
    first_name VARCHAR(60),
    time_created TIMESTAMP,
    is_manager BOOL,
    department VARCHAR(200)
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    employee_code VARCHAR(200),
    employee_name VARCHAR(200),
    user_account_id INT REFERENCES user_account(id)
);

CREATE TABLE team (
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(200)
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(200)
);

CREATE TABLE team_member (
    id SERIAL PRIMARY KEY,
    team_id INT REFERENCES team(id),
    employee_id INT REFERENCES employee(id),
    role_id INT REFERENCES role(id) 
);

--projects

CREATE TABLE project (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(200),
    planned_start_data DATE,
    planned_end_date DATE,
    actual_start_date DATE,
    actual_end_date DATE,
    project_description TEXT
    
);

CREATE TABLE project_manager (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES project(id),
    user_account_id INT REFERENCES user_account(id)
);

--simple todo list
CREATE TABLE simple_todo (
    todo_id SERIAL PRIMARY KEY,
    type VARCHAR(100),
    description VARCHAR(255),
    date_start DATE,
    data_end DATE
);

