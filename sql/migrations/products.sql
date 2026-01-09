create table products (
    id              uuid primary key default gen_random_uuid(),
    title           varchar(255) not null,
    description     text,
    price_cents     integer not null check (price_cents >= 0),

    is_available    boolean not null default true,
    image_url       text,

    created_at      timestamptz not null default now(),
    updated_at      timestamptz not null default now()
);

create index idx_products_available on products(is_available);
