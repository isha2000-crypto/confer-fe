export type BackgroundConfig = {
  type: 'none' | 'blur' | 'image'
  url?: string
}

const ImageUrls = ['clif-bg', 'library-bg']

export const backgroundImageUrls = () => {
  return [...ImageUrls].map(imageName => `${process.env.NEXT_PUBLIC_URL}/images/backgrounds/${imageName}.jpg`)
}
