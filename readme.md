# fastify-apollo-2

A new take on [Fastify](https://github.com/fastify/fastify) and [Apollo Server](https://github.com/apollographql/apollo-server) integration. Based on the official hapi plugin.

## Usage

```js
// Register GraphQL endpoint
fastify.register(require('@seangenabe/fastify-apollo-2'), {
  graphqlOptions: { schema },
  prefix: '/graphql'
})
// Registry GraphiQL endpoint
fastify.register(require('@seangenabe/fastify-apollo-2/graphiql', {
  graphiqlOptions: { endpointURL: '/graphql' },
  prefix: '/graphiql'
})
```

Reference:
* [GraphQL options](https://www.apollographql.com/docs/apollo-server/setup.html)
* [GraphiQL options](https://www.apollographql.com/docs/apollo-server/graphiql.html)
