create table reviews (
    id              uuid primary key default gen_random_uuid(),
    user_id         uuid references users(id),
    product_id      uuid not null references products(id),

    rating          integer not null check (rating between 1 and 5),
    comment         text,

    created_at      timestamptz not null default now()
);

create index idx_reviews_product_id on reviews(product_id);
