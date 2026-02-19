import type { PageCollectionItemBase, DataCollectionItemBase } from '@nuxt/content'

declare module '@nuxt/content' {
   interface ContentCollectionItem extends PageCollectionItemBase {
    hero: {
    links: {
      label: string
      to: string
      icon?: string
      trailingIcon?: string
      size?: ("xs" | "sm" | "md" | "lg" | "xl")
      trailing?: boolean
      target?: ("_blank" | "_self")
      color?: ("primary" | "secondary" | "neutral" | "error" | "warning" | "success" | "info")
      variant?: ("solid" | "outline" | "subtle" | "soft" | "ghost" | "link")
    }[]
    }
    section: {
    title: string
    description: string
    headline?: string
    images: {
      mobile?: string
      desktop?: string
    }
    features: {
      title: string
      description: string
      icon?: string
      class?: string
    }[]
    }
    features: {
    title: string
    description: string
    features: {
      title: string
      description: string
      icon?: string
      class?: string
      ui?: {
      leading?: string
      }
    }[]
    }
    steps: {
    title: string
    description: string
    items: {
      title: string
      description: string
      icon?: string
      class?: string
      ui?: {
      leading?: string
      }
      image?: {
      light: string
      dark: string
      }
    }[]
    }
    pricing: {
    title: string
    description: string
    plans: {
      title: string
      description: string
      price: string
      button: {
      label: string
      to: string
      icon?: string
      trailingIcon?: string
      size?: ("xs" | "sm" | "md" | "lg" | "xl")
      trailing?: boolean
      target?: ("_blank" | "_self")
      color?: ("primary" | "secondary" | "neutral" | "error" | "warning" | "success" | "info")
      variant?: ("solid" | "outline" | "subtle" | "soft" | "ghost" | "link")
      }
      features: string[]
      highlight?: boolean
      billing_period: string
      billing_cycle: string
    }[]
    }
    testimonials: {
    title: string
    description: string
    items: {
      quote: string
      user: {
      name: string
      description: string
      to?: string
      avatar: {
        src: string
        alt?: string
      }
      target?: ("_blank" | "_self")
      }
    }[]
    }
    cta: {
    title: string
    description: string
    links: {
      label: string
      to: string
      icon?: string
      trailingIcon?: string
      size?: ("xs" | "sm" | "md" | "lg" | "xl")
      trailing?: boolean
      target?: ("_blank" | "_self")
      color?: ("primary" | "secondary" | "neutral" | "error" | "warning" | "success" | "info")
      variant?: ("solid" | "outline" | "subtle" | "soft" | "ghost" | "link")
    }[]
    }
  }
  

  interface PageCollections {
    content: ContentCollectionItem
  }

  interface Collections {
    content: ContentCollectionItem
  }
}
