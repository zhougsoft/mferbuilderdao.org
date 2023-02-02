# mferbuilderDAO

bootstrapped from the [noun-site](https://github.com/neokry/noun-site) starter by [neokry](https://github.com/neokry) (ty mfer 🙏)

## stack

- [NextJS](https://nextjs.org/) (base framework)
- [TailwindCSS](https://tailwindcss.com/) (css / theming)
- [wagmi](https://wagmi.sh/) (writing to contracts)
- [RainbowKit](https://www.rainbowkit.com/) (wallet connection)
- [BuilderSDK](https://github.com/neokry/builder-sdk) (reading contract data)

## reqs

- an [Alchemy](https://www.alchemy.com/) API key

## setup

1. install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

2. make a copy of `.env.example` called `.env.local`

3. add the _required_ environment variables to `.env.local`

   ```bash
   # you need to get an Alchemy key for this to work
   NEXT_PUBLIC_ALCHEMY_KEY="your_alchemy_api_key"

   # the MFBLDR token address
   NEXT_PUBLIC_TOKEN_CONTRACT="0x795D300855069F602862c5e23814Bdeeb25DCa6b"
   ```

4. add _optional_ environment variables (optional)

   ```bash
   # change the default gateway for IPFS content
   NEXT_PUBLIC_IPFS_GATEWAY=

   # change the network you want to pull token data from
   # leave default for mainnet, set to '5' for Goerli testnet
   NEXT_PUBLIC_TOKEN_NETWORK=
   ```

5. run local development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```
6. navigate to [http://localhost:3000](http://localhost:3000) in your browser of choice

## edit site content

You can start editing the markdown templates in `/templates` to change your sites content and add custom pages.
We use [frontmatter](https://www.npmjs.com/package/front-matter) to parse template configs at the top of each markdown page

- `templates/:page.md`: Create simple custom pages by making new markdown files directly in the `templates` folder.
  - Set the config `align` to `center` for center aligned content.
- `templates/home/description.md`: The main description that appears on your site right under the auction hero.
- `templates/home/faq/:faq-entry.md`: Create new markdown files in the faq folder to add new entries to the FAQ section on the homepage.
  - Set the `title` config to change the FAQs title and `order` to change the entries order within the list.
- `templates/vote/description.md`: The description located at the top of the voting page.

## theme

customize theme via `theme.config.ts`

```javascript
ThemeConfig = {
  styles: {
    colors?: ThemeColors;
    fonts?: ThemeFonts;
    logoHeight?: string;
  };
  strings: {
    currentBid?: string;
    auctionEndsIn?: string;
    placeBid?: string;
    highestBidder?: string;
    connectWallet?: string;
    wrongNetwork?: string;
  };
  brand: {
    logo?: string | null;
    title?: string | null;
  };
  nav: {
    primary: NavigationItem[];
    secondary: NavigationItem[];
  };
}

ThemeColors = {
  fill?: RGBType;
  muted?: RGBType;
  stroke?: RGBType;
  backdrop?: RGBType;
  "text-base"?: RGBType;
  "text-muted"?: RGBType;
  "text-inverted"?: RGBType;
  "text-highlighted"?: RGBType;
  "button-accent"?: RGBType;
  "button-accent-hover"?: RGBType;
  "button-muted"?: RGBType;
  "proposal-success"?: RGBType;
  "proposal-danger"?: RGBType;
  "proposal-muted"?: RGBType;
  "proposal-highlighted"?: RGBType;
}

ThemeFonts = {
  heading?: string;
  body?: string;
}

NavigationItem = {
  label: string;
  href: string;
}

RGBType = `${string}, ${string}, ${string}`
```

## default themes

choose from 2 default themes: `lightTheme` or `darkTheme`

```javascript
import { ThemeConfig } from "types/ThemeConfig";
import { lightTheme } from "theme/default";
import merge from "lodash.merge";

export const theme: ThemeConfig = merge(lightTheme, {
  styles: {
    fonts: {
      heading: "Roboto",
    },
    colors: {
      "text-highlighted": "0, 133, 255",
    },
  },
  nav: {
    primary: [
      { label: "DAO", href: "/vote" },
    ],
  },
} as Partial<ThemeConfig>);
```
