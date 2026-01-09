create table order_items (
    id              uuid primary key default gen_random_uuid(),
    order_id        uuid not null references orders(id) on delete cascade,
    product_id      uuid not null references products(id),

    price_cents     integer not null check (price_cents >= 0),
    quantity        integer not null check (quantity > 0),

    created_at      timestamptz not null default now()
);

create index idx_order_items_order_id on order_items(order_id);
