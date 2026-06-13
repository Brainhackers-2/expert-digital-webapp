-- Services
create table services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category text not null,
  short_description text,
  long_description text,
  icon text,
  image_url text,
  display_order int default 0,
  is_published boolean default true,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Portfolio
create table portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  description text,
  image_url text,
  gallery_urls text[],
  client_name text,
  realized_at date,
  is_published boolean default true,
  created_at timestamp default now()
);

-- Témoignages
create table testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  company text,
  rating int check (rating >= 1 and rating <= 5),
  message text not null,
  photo_url text,
  is_published boolean default true,
  created_at timestamp default now()
);

-- Équipe
create table team_members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  role text,
  bio text,
  photo_url text,
  linkedin_url text,
  display_order int default 0,
  created_at timestamp default now()
);

-- Messages de contact
create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  status text default 'nouveau',
  created_at timestamp default now()
);

-- Newsletter
create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamp default now()
);

-- Paramètres du site
create table site_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value text,
  updated_at timestamp default now()
);

-- RLS setup
alter table services enable row level security;
alter table portfolio_items enable row level security;
alter table testimonials enable row level security;
alter table team_members enable row level security;
alter table contact_messages enable row level security;
alter table newsletter_subscribers enable row level security;
alter table site_settings enable row level security;

-- Policies for public reading
create policy "Public can view published services" on services for select using (is_published = true);
create policy "Public can view published portfolio" on portfolio_items for select using (is_published = true);
create policy "Public can view published testimonials" on testimonials for select using (is_published = true);
create policy "Public can view team members" on team_members for select using (true);
create policy "Public can view site settings" on site_settings for select using (true);

-- Policies for public inserting
create policy "Public can insert contact messages" on contact_messages for insert with check (true);
create policy "Public can insert newsletter subscribers" on newsletter_subscribers for insert with check (true);

-- Policies for authenticated users (admins)
create policy "Admins can do everything on services" on services for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admins can do everything on portfolio" on portfolio_items for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admins can do everything on testimonials" on testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admins can do everything on team members" on team_members for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admins can do everything on contact messages" on contact_messages for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admins can do everything on newsletter subscribers" on newsletter_subscribers for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admins can do everything on site settings" on site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
