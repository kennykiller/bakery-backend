create table orders (
    id              uuid primary key default gen_random_uuid(),
    user_id         uuid references users(id),

    status          varchar(32) not null, 
    -- new | paid | in_progress | completed | cancelled

    total_cents     integer not null check (total_cents >= 0),

    delivery_address text,
    comment         text,

    created_at      timestamptz not null default now(),
    updated_at      timestamptz not null default now()
);

create index idx_orders_user_id on orders(user_id);
create index idx_orders_status on orders(status);
