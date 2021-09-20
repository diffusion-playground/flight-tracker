import contentDatasourcePoller from '~/api/content-datasource-poller'
export default (ctx, inject) => {  
  const contentDatasourceAPI = contentDatasourcePoller(ctx.$content)
  
  inject('localOpenSkyAPI', contentDatasourceAPI(
        'opensky-data/states-all-',
        ctx.store
      )
  )
}