import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'bxvlir7r',
  dataset: 'production',
  useCdn: true,
  apiVersion: 'v2021-08-26',
})
