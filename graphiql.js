const { resolveGraphiQLString } = require('apollo-server-module-graphiql')

const plugin = async (fastify, opts) => {
  if (!opts || !opts.graphiqlOptions) {
    throw new Error("Apollo Server GraphiQL requires options.")
  }
  fastify.get('/', async (request, reply) => {
    const graphiqlString = await resolveGraphiQLString(
      request.query,
      opts.graphiqlOptions,
      request
    )
    reply.type('text/html')
    return graphiqlString
  })
}

module.exports = plugin
module.exports.graphiql = plugin
