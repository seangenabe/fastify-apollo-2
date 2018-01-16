const { runHttpQuery } = require('apollo-server-core')

const plugin = async (fastify, opts) => {
  if (!opts || !opts.graphqlOptions) {
    throw new Error("Apollo Server requires options.")
  }

  const handler = async (method, request, reply) => {
    try {
      const gqlResponse = await runHttpQuery([request], {
        method,
        options: opts.graphqlOptions,
        query: method === 'POST' ? request.body : request.query
      })

      reply.serializer(x => x)
      reply.type('application/json')
      return gqlResponse
    }
    catch (err) {
      if (err.name !== 'HttpQueryError') {
        throw err
      }
      if (err.isGraphQLError === true) {
        reply.code(err.statusCode)
        reply.type('application/json')
        reply.serializer(x => x)
        return err.message
      }
      throw err
    }
  }

  fastify.get('/', (request, reply) => handler('GET', request, reply))
  fastify.post('/', (request, reply) => handler('POST', request, reply))
}

module.exports = plugin
module.exports.graphql = plugin
