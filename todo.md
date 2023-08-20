### Todo

'

## Do Now:

Change number select to "add number" button or a readonly input displaying number with a "change number" link under it.

#### App

- Refactor main-card.tsx
- list scheduled events
- delete and edit events
- meta tags in config/site.ts
- write instructions page

#### Server

- validate form data on server
- api route for creating events (fallback for server action)
- set up cron job
- have server check that number is verified before sending reminders
- option for anonymous account creation
- cron job to delete events older than a day

#### Anon

- allow account creation with only screen name and pw
- optionally use email address or oauth
- encrypt data for events and numbers

#### Styling

- Find a better font
- change layout for mobile

#### Users

- get user phone number and add to user object
- opt-out message flow
- user accounts with clerk
- add text opt-in to account creation form
- create opt-in text verification flow

#### Admin

- get number registered
