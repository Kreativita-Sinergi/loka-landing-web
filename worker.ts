import handler from 'vinext/server/app-router-entry'

export default {
  fetch(...[request, env, ctx]: Parameters<typeof handler.fetch>) {
    const url = new URL(request.url)
    if (url.hostname === 'lokakasir.id') {
      url.protocol = 'https:'
      url.hostname = 'www.lokakasir.id'
      return Response.redirect(url, 307)
    }

    return handler.fetch(request, env, ctx)
  },
}
