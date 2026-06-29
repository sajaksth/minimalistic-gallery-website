-- Stripe additions to the orders table (run after orders.sql)
alter table public.orders
  add column if not exists stripe_session_id text,
  add column if not exists payment_status text not null default 'unpaid'; -- unpaid | paid
