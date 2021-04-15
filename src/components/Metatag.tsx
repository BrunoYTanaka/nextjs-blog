import React, { ReactElement } from 'react'
import { NextSeo } from 'next-seo'

export interface MetatagProps {
  ampUrl: string
  canonical: string
  'og:type': string
  'og:site_name': string
  'og:title': string
  'og:description': string
  'og:image': string
  'og:image:alt': string
  'og:image:width': number
  'og:image:height': number
  'article:publisher': string
  'article:tag': {
    content: string
  }[]
  'article:section': string
  'twitter:site': string
  'twitter:creator': string
}

function Metatag({
  ampUrl: ogUrl,
  canonical,
  'og:description': ogDescription,
  'og:type': ogType,
  'og:image': ogImage,
  'og:image:alt': ogImageAlt,
  'og:image:width': ogImageWidth,
  'og:image:height': ogImageHeight,
  'og:site_name': ogSiteName,
  'og:title': ogTitle,
  'article:publisher': articlePublisher,
  'article:tag': articleTag,
  'article:section': articleSection,
  'twitter:site': twitterSite,
  'twitter:creator': twitterCreator,
}: MetatagProps): ReactElement {
  return (
    <NextSeo
      title={ogTitle}
      description={ogDescription}
      canonical={canonical}
      openGraph={{
        type: ogType,
        article: {
          authors: [articlePublisher],
          section: articleSection,
          tags: articleTag.map(tag => tag.content),
        },
        url: ogUrl,
        title: ogTitle,
        description: ogDescription,
        site_name: ogSiteName,
        images: [
          {
            url: ogImage,
            alt: ogImageAlt,
            width: ogImageWidth,
            height: ogImageHeight,
          },
        ],
      }}
      twitter={{
        cardType: 'summary',
        handle: twitterCreator,
        site: twitterSite,
      }}
    />
  )
}

export default Metatag
