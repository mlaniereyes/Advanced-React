import 'dotenv/config';
import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';

const databaseURL =
  process.env.DATABASE_URL ||
  'mongodb://localhost/keystone-sick-fits-tutorials';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long they stay signed in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: add in initial roles here
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      async onConnect(keystone) {
        if (process.argv.includes('--seed-data')) {
          console.log('connected to the database...');
          await insertSeedData(keystone);
        }
      },
      // TODO: Add data seeding
    },
    lists: createSchema({
      // schema here
      User,
      Product,
      ProductImage,
    }),
    ui: {
      // show the ui only for people who pass this test
      // isAccessAllowed: () => true,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      isAccessAllowed: ({ session }) => !!session?.data,
    },
    // todo: add session values here
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id name email',
    }),
  })
);
