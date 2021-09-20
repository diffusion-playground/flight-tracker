import datasourcePoller from '~/api/datasource-poller'
export default (ctx, inject) => {  
  const datasourceAPI = datasourcePoller(ctx.$axios)
  /**
   * California LatLng area
   * NW: 42.049716, -124.382218
   * SE: 32.692522, -113.665779
   */
  inject('openSkyAPI', datasourceAPI(
        //'https://opensky-network.org/api/states/all?lamin=37.25&lomin=-122.55&lamax=37.83&lomax=-121.78',
        'https://opensky-network.org/api/states/all?lamin=32.692522&lomin=-124.382218&lamax=42.049716&lomax=-113.665779',
        ctx.store
      )
  )
}