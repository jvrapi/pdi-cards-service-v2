import dataSource from './config/data-source';
export const databaseProviders = [
  {
    provide: 'DataSource',
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];
