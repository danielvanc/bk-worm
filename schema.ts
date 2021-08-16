import { createSchema, list } from '@keystone-next/keystone/schema';
import {
  text,
  relationship,
  password,
  integer,
  timestamp,
  select,
} from '@keystone-next/fields';
import { document } from '@keystone-next/fields-document';

export const lists = createSchema({
  Account: list({
    db: {
      searchField: 'providerId',
    },
    fields: {
      providerType: text({ isRequired: false }),
      providerId: text({
        isRequired: true,
        isUnique: true,
        defaultValue: '',
      }),
      providerAccountId: integer({
        isRequired: true,
        isUnique: true,
        defaultValue: 0,
      }),
      refreshToken: text({ isRequired: false }),
      accessToken: text({ isRequired: false }),
      accessTokenExpires: timestamp({ isRequired: false }),
      createdAt: timestamp({ isRequired: true, defaultValue: '1970-01-01T00:00:00.000Z', isUnique: true }),
      updatedAt: timestamp({ isRequired: false }),
      user: relationship({ ref: 'User' }),
    },
    
  }),
  Session: list({
    fields: {
      expires: timestamp({ isRequired: false }),
      sessionToken: text({ isRequired: false, isUnique: true }),
      accessToken: text({ isRequired: false, isUnique: true }),
      createdAt: timestamp({ isRequired: false, defaultValue: '1970-01-01T00:00:00.000Z', isUnique: true }),
      updatedAt: timestamp({ isRequired: false }),
      user: relationship({ ref: 'User' }),
    }
  }),
  VerificationRequest: list({
    fields: {
      identifier: text({ isRequired: false, isUnique: true }),
      token: text({ isRequired: false, isUnique: true }),
      expires: timestamp({ isRequired: false }),
    }
  }),
  User: list({
    ui: {
      listView: {
        initialColumns: ['name', 'posts'],
      },
    },
    fields: {
      name: text({ isRequired: true }),
      age: text({ isRequired: false }),
      title: text({ isRequired: false }),
      location: text({ isRequired: false }),
      email: text({ isRequired: true, isUnique: true }),
      emailVerified: timestamp({ isRequired: true }),
      image: text({ isRequired: false }),
      password: password({ isRequired: true }),
      posts: relationship({ ref: 'Post.author', many: true }),
      accounts: relationship({ ref: 'Account', many: true }),
      sessions: relationship({ ref: 'Session', many: true }),
      // createdAt: timestamp({ isRequired: false }),
      // updatedAt: timestamp({ isRequired: false }),
    },
  }),
  Post: list({
    fields: {
      title: text(),
      status: select({
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
        ],
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      publishDate: timestamp(),
      author: relationship({
        ref: 'User.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineCreate: { fields: ['name', 'email'] },
        },
      }),
      tags: relationship({
        ref: 'Tag.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineEdit: { fields: ['name'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name'] },
        },
        many: true,
      }),
    },
  }),
  Tag: list({
    ui: {
      isHidden: true,
    },
    fields: {
      name: text(),
      posts: relationship({
        ref: 'Post.tags',
        many: true,
      }),
    },
  }),
});
