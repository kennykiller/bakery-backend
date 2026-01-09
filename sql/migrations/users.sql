create table users (
    id              uuid primary key default gen_random_uuid(),
    email           varchar(255) not null unique,
    password_hash   text not null,
    full_name       varchar(255),
    phone           varchar(32),

    role            varchar(32) not null default 'customer', -- customer | admin
    is_active       boolean not null default true,

    created_at      timestamptz not null default now(),
    updated_at      timestamptz not null default now()
);

create index idx_users_email on users(email);
