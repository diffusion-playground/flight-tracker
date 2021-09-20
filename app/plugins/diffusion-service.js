import DiffusionService from '~/api/diffusion-service'

export default (ctx, inject) => {  
  inject('diffusionService', DiffusionService(ctx.$store))
}