-- Users / Profiles table
-- Extends Supabase auth.users with app-specific profile data

create table public.users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text unique not null,
  name text not null,
  avatar_url text,
  neighborhood text,
  zip text,
  bio text default '',
  created_at timestamp with time zone default timezone('utc', now()) not null,
  updated_at timestamp with time zone default timezone('utc', now()) not null
);

-- Enable RLS
alter table public.users enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone"
  on public.users for select
  using (true);

create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.users for insert
  with check (auth.uid() = id);

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'avatar_url', null)
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to auto-create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
