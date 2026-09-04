export type Swatch = {
  name: string;
  image: string;
  price: string;
  oldPrice: string;
};

export type Product = {
  id: string;
  section: "new-arrivals" | "best-sellers" | "special-offers";
  title: string;
  href: string;
  badges: string[];
  image: string;
  hoverImage: string;
  alt: string;
  oldPrice: string;
  newPrice: string;
  swatches: Swatch[];
};

export const products: Product[] = [
  // ===== New Arrivals =====
  {
    id: "na-1",
    section: "new-arrivals",
    title: "VGN Dragonfly F1 V5 Series Ultra-Lightweight Wireless Mouse",
    href: "#",
    badges: ["Sale 14%"],
    image: "/images/product1-supercar-red.png",
    hoverImage: "/images/product1-black-gold.png",
    alt: "VGN Dragonfly F1 V5",
    oldPrice: "$69.99",
    newPrice: "from $59.99",
    swatches: [
      { name: "White", image: "/images/product1-white.png", price: "from $59.99", oldPrice: "$69.99" },
      { name: "Black Gold", image: "/images/product1-black-gold.png", price: "from $59.99", oldPrice: "$69.99" },
      { name: "Rose Red", image: "/images/product1-rose-red.png", price: "from $59.99", oldPrice: "$69.99" },
      { name: "Supercar Red", image: "/images/product1-supercar-red.png", price: "from $59.99", oldPrice: "$69.99" },
    ],
  },
  {
    id: "na-2",
    section: "new-arrivals",
    title: "VGN Neon75HE Air Wireless Magnetic Switch Keyboard",
    href: "#",
    badges: ["Sale 13%"],
    image: "/images/product2-white-frosted-transparent.png",
    hoverImage: "/images/product2-blue-frosted-transparent.png",
    alt: "VGN Neon75HE",
    oldPrice: "$74.90",
    newPrice: "from $64.90",
    swatches: [
      { name: "White Frosted Transparent", image: "/images/product2-white-frosted-transparent.png", price: "from $64.90", oldPrice: "$74.90" },
      { name: "Blue Frosted Transparent", image: "/images/product2-blue-frosted-transparent.png", price: "from $64.90", oldPrice: "$74.90" },
      { name: "Green Frosted Transparent", image: "/images/product2-green-frosted-transparent.png", price: "from $64.90", oldPrice: "$74.90" },
    ],
  },
  {
    id: "na-3",
    section: "new-arrivals",
    title: "VGN Dragonfly F2 Master Ultra-Lightweight Wireless Mouse",
    href: "#",
    badges: ["Sale 12%"],
    image: "/images/product3-racing-green.png",
    hoverImage: "/images/product3-black-pink.png",
    alt: "VGN Dragonfly F2",
    oldPrice: "$79.90",
    newPrice: "from $59.90",
    swatches: [
      { name: "Black Pink", image: "/images/product3-black-pink.png", price: "from $59.90", oldPrice: "$79.90" },
      { name: "White", image: "/images/product3-white.png", price: "from $59.90", oldPrice: "$79.90" },
      { name: "Green", image: "/images/product3-green.png", price: "from $59.90", oldPrice: "$79.90" },
      { name: "Rose Red", image: "/images/product3-rose-red.png", price: "from $59.90", oldPrice: "$79.90" },
      { name: "Supercar Red", image: "/images/product3-supercar-red.png", price: "from $59.90", oldPrice: "$79.90" },
      { name: "Racing Green", image: "/images/product3-racing-green.png", price: "from $59.90", oldPrice: "$79.90" },
    ],
  },
  {
    id: "na-4",
    section: "new-arrivals",
    title: "VGN FLASH 68HE Aluminum Magnetic Switch Keyboard",
    href: "#",
    badges: ["Sale 4%", "Free Shipping"],
    image: "/images/product4-purple-soul.png",
    hoverImage: "/images/product4-phantom-black.png",
    alt: "VGN Flash 68HE",
    oldPrice: "$209.00",
    newPrice: "from $199.90",
    swatches: [
      { name: "Purple Soul", image: "/images/product4-purple-soul.png", price: "from $199.90", oldPrice: "$209.00" },
      { name: "Pink Soul", image: "/images/product4-pink-soul.png", price: "from $199.90", oldPrice: "$209.00" },
      { name: "Phantom Black", image: "/images/product4-phantom-black.png", price: "from $199.90", oldPrice: "$209.00" },
      { name: "Phantom White", image: "/images/product4-phantom-white.png", price: "from $199.90", oldPrice: "$209.00" },
      { name: "Black Knight", image: "/images/product4-black-knight.png", price: "from $199.90", oldPrice: "$209.00" },
      { name: "Silver Knight", image: "/images/product4-silver-knight.png", price: "from $199.90", oldPrice: "$209.00" },
    ],
  },

  // ===== Best Sellers =====
  {
    id: "bs-1",
    section: "best-sellers",
    title: "VGN Dragonfly F2 Master..",
    href: "#",
    badges: ["Sale 12%"],
    image: "/images/product3-racing-green.png",
    hoverImage: "/images/product3-black-pink.png",
    alt: "VGN Dragonfly F2 Master",
    oldPrice: "$59.90",
    newPrice: "from $54.90",
    swatches: [
      { name: "Green", image: "/images/product3-green.png", price: "from $54.90", oldPrice: "$59.90" },
      { name: "Black Pink", image: "/images/product3-black-pink.png", price: "from $54.90", oldPrice: "$59.90" },
      { name: "White", image: "/images/product3-white.png", price: "from $54.90", oldPrice: "$59.90" },
    ],
  },
  {
    id: "bs-2",
    section: "best-sellers",
    title: "VGN Dragonfly Y2 Master Ultra-Lightweight Wireless Mouse",
    href: "#",
    badges: ["Sale 25%"],
    image: "/images/bestseller2-pink.png",
    hoverImage: "/images/bestseller2-blue.png",
    alt: "VGN Dragonfly Y2 Master",
    oldPrice: "$54.90",
    newPrice: "from $49.90",
    swatches: [
      { name: "Pink", image: "/images/bestseller2-pink.png", price: "from $49.90", oldPrice: "$54.90" },
      { name: "Blue", image: "/images/bestseller2-blue.png", price: "from $49.90", oldPrice: "$54.90" },
      { name: "White", image: "/images/bestseller2-white.png", price: "from $49.90", oldPrice: "$54.90" },
      { name: "orange", image: "/images/bestseller2-orange.png", price: "from $49.90", oldPrice: "$54.90" },
    ],
  },
  {
    id: "bs-3",
    section: "best-sellers",
    title: "VGN Neon Super Competitive..",
    href: "#",
    badges: ["Sale 10%"],
    image: "/images/product4-pink-soul.png",
    hoverImage: "/images/product4-phantom-white.png",
    alt: "VGN Neon Super Competitive",
    oldPrice: "$99.90",
    newPrice: "from $89.90",
    swatches: [
      { name: "Pink Soul", image: "/images/product4-pink-soul.png", price: "from $89.90", oldPrice: "$99.90" },
      { name: "Phantom White", image: "/images/product4-phantom-white.png", price: "from $89.90", oldPrice: "$99.90" },
      { name: "Phantom Black", image: "/images/product4-phantom-black.png", price: "from $89.90", oldPrice: "$99.90" },
    ],
  },
  {
    id: "bs-4",
    section: "best-sellers",
    title: "VGN N75 V2 Wireless RGB..",
    href: "#",
    badges: ["Sale 15%"],
    image: "/images/product4-silver-knight.png",
    hoverImage: "/images/product4-black-knight.png",
    alt: "VGN N75 V2 Wireless RGB",
    oldPrice: "$44.90",
    newPrice: "from $39.90",
    swatches: [
      { name: "Silver Knight", image: "/images/product4-silver-knight.png", price: "from $39.90", oldPrice: "$44.90" },
      { name: "Black Knight", image: "/images/product4-black-knight.png", price: "from $39.90", oldPrice: "$44.90" },
      { name: "Purple Soul", image: "/images/product4-purple-soul.png", price: "from $39.90", oldPrice: "$44.90" },
    ],
  },

  // ===== Special Offers =====
  {
    id: "so-1",
    section: "special-offers",
    title: "VGN Dragonfly 3 Series Ultr..",
    href: "#",
    badges: ["Sale 22%"],
    image: "/images/product1-supercar-red.png",
    hoverImage: "/images/product1-black-gold.png",
    alt: "VGN Dragonfly 3 Series Ultra",
    oldPrice: "$34.90",
    newPrice: "from $24.90",
    swatches: [
      { name: "Supercar Red", image: "/images/product1-supercar-red.png", price: "from $24.90", oldPrice: "$34.90" },
      { name: "Black Gold", image: "/images/product1-black-gold.png", price: "from $24.90", oldPrice: "$34.90" },
      { name: "White", image: "/images/product1-white.png", price: "from $24.90", oldPrice: "$34.90" },
    ],
  },
  {
    id: "so-2",
    section: "special-offers",
    title: "VGN Neon 68HE Super..",
    href: "#",
    badges: ["Sale 14%"],
    image: "/images/product2-white-frosted-transparent.png",
    hoverImage: "/images/product2-blue-frosted-transparent.png",
    alt: "VGN Neon 68HE Super",
    oldPrice: "$59.90",
    newPrice: "from $49.90",
    swatches: [
      { name: "White Frosted Transparent", image: "/images/product2-white-frosted-transparent.png", price: "from $49.90", oldPrice: "$59.90" },
      { name: "Blue Frosted Transparent", image: "/images/product2-blue-frosted-transparent.png", price: "from $49.90", oldPrice: "$59.90" },
      { name: "Green Frosted Transparent", image: "/images/product2-green-frosted-transparent.png", price: "from $49.90", oldPrice: "$59.90" },
    ],
  },
  {
    id: "so-3",
    section: "special-offers",
    title: "VGN Dragonfly F1 SE Wirele..",
    href: "#",
    badges: ["Sale 29%"],
    image: "/images/product3-rose-red.png",
    hoverImage: "/images/product3-white.png",
    alt: "VGN Dragonfly F1 SE Wireless",
    oldPrice: "$34.90",
    newPrice: "$24.90",
    swatches: [
      { name: "Rose Red", image: "/images/product3-rose-red.png", price: "$24.90", oldPrice: "$34.90" },
      { name: "White", image: "/images/product3-white.png", price: "$24.90", oldPrice: "$34.90" },
      { name: "Supercar Red", image: "/images/product3-supercar-red.png", price: "$24.90", oldPrice: "$34.90" },
    ],
  },
  {
    id: "so-4",
    section: "special-offers",
    title: "VGN N75 V2 Wireless RGB..",
    href: "#",
    badges: ["Sale 15%"],
    image: "/images/product4-silver-knight.png",
    hoverImage: "/images/product4-black-knight.png",
    alt: "VGN N75 V2 Wireless RGB",
    oldPrice: "$44.90",
    newPrice: "from $39.90",
    swatches: [
      { name: "Silver Knight", image: "/images/product4-silver-knight.png", price: "from $39.90", oldPrice: "$44.90" },
      { name: "Black Knight", image: "/images/product4-black-knight.png", price: "from $39.90", oldPrice: "$44.90" },
      { name: "Purple Soul", image: "/images/product4-purple-soul.png", price: "from $39.90", oldPrice: "$44.90" },
    ],
  },
  {
    id: "so-5",
    section: "special-offers",
    title: "VGN Dragonfly F1 V5 Series..",
    href: "#",
    badges: ["Sale 14%"],
    image: "/images/product3-supercar-red.png",
    hoverImage: "/images/product3-black-pink.png",
    alt: "VGN Dragonfly F1 V5 Series",
    oldPrice: "$69.99",
    newPrice: "from $59.99",
    swatches: [
      { name: "Supercar Red", image: "/images/product3-supercar-red.png", price: "from $59.99", oldPrice: "$69.99" },
      { name: "Black Pink", image: "/images/product3-black-pink.png", price: "from $59.99", oldPrice: "$69.99" },
      { name: "Rose Red", image: "/images/product3-rose-red.png", price: "from $59.99", oldPrice: "$69.99" },
    ],
  },
];

export const categories = [
  { name: "KEYBOARD", slug: "keyboards", image: "/images/category1.png" },
  { name: "MOUSE", slug: "mouse", image: "/images/category2.png" },
  { name: "HEADSETS", slug: "headsets", image: "/images/category3.png" },
  { name: "ACCESSORIES", slug: "accessories", image: "/images/category4.png" },
];

export const navLinks = [
  { label: "ALL PRODUCTS", href: "#", category: "" },
  { label: "KEYBOARDS", href: "#", category: "keyboards" },
  { label: "MOUSE", href: "#", category: "mouse" },
  { label: "HEADSETS", href: "#", category: "headsets" },
  { label: "DEALS", href: "#", category: "deals" },
  { label: "ACCESSORIES", href: "#", category: "accessories" },
  { label: "VGN HUB", href: "#", category: "" },
];

export type Slide = {
  image: string;
  theme?: string;
  title?: string;
  text?: string;
};

export const slides: Slide[] = [
  { image: "/images/slide1.png" },
  {
    image: "/images/slide2.png",
    theme: "slide-theme-red",
    title: "VGN F1 V5 Series",
    text: "VGN Dragonfly F1 V5 | 53g Lightweight | PAW3955 Extreme | 50-30000 DPI | Dual 8K Polling Rate | 0.1ms Low Latency | Tri-mode Connectivity | Dual Nordic 54LM20 Chips",
  },
  {
    image: "/images/slide3.png",
    theme: "slide-theme-silver",
    title: "VGN Flash 68HE Aluminum Magnetic",
    text: "68% Layout | Full Aluminum | 5 Pin Hall Sensor | Full-Key ADC | RT 0.001mm | 8K Polling Rate | 0.06ms Latency | Gasket | Web-Driver",
  },
  {
    image: "/images/slide4.png",
    theme: "slide-theme-cyan",
    title: "VGN Neon 75HE Air",
    text: "75% Layout | Wired /2.4GHz /Bluetooth | RT 0.005mm | 8K Polling Rate | 0.1ms Latency | Gasket | 8000mAh",
  },
  {
    image: "/images/slide5.png",
    theme: "slide-theme-orange",
    title: "VGN Neon 68HE Super Competitive",
    text: "68% Layout | 3rd-gen Magnetic Switch | Dual Carbon Fiber | RT 0.001mm | 8K Polling Rate | 0.1ms Latency | Gasket | Web-Driver",
  },
  {
    image: "/images/slide6.png",
    theme: "slide-theme-green",
    title: "Dragonfly F2 Master",
    text: "50g Ultra-Lightweight | TTC Gold Wheel Encoder | PAW3955 Extreme | 8K Polling Rate | 800mAh Large battery | Nordic 54L15 | Wired /2.4G/Bluetooth",
  },
  {
    image: "/images/slide7.png",
    theme: "slide-theme-blue",
    title: "VGN V98Pro V4",
    text: "Dual 8K | 98% Layout | Wired /2.4GHz/ Bluetooth | Gasket | V-Display Smart Display | 10000mAh | 0.08ms Low Latency | RGB",
  },
  {
    image: "/images/slide8.png",
    theme: "slide-theme-purple",
    title: "VGN Dragonfly King",
    text: "First Enclosed Magnesium Alloy Mouse | PAW3950 sensor | 8K Polling Rate | TTC Gold Wheel | Optical Micro Switch 160 Million Clicks | 0.125ms Low Latency | Wired/Wireless",
  },
];

export const reviews = [
  {
    image:
      "https://vgnlab.com/cdn/shop/files/VGNA75-review-image_46995c5c-2b6f-4531-8d4e-9b5398cd5848_1066x.jpg?v=1743132663",
    alt: "Keyboard Dark",
    title: "Perfect for the Price!",
    text: "The keyboard is very handsome, side engraved shimmering, simply unbeatable, coupled with the magnetic axis powerful performance and full check hot-swap function, this price is too much better than those 99 other keyboards, you can also.....",
    date: "November 22, 2024",
  },
  {
    image:
      "https://vgnlab.com/cdn/shop/files/VGNA75-review-image2_1066x.jpg?v=1743132728",
    alt: "Keyboard Light Blue",
    title: "Keyboard is very silent!",
    text: "Steel fixed plate sound thief, it is recommended to buy PC positioning plate, PC positioning plate mute effect is good batch, suitable for dormitory. Steel fixed sound is too loud. Recommended to buy, after all, this price, cost-effective pull full.....",
    date: "June 28, 2024",
  },
  {
    image:
      "https://vgnlab.com/cdn/shop/files/VGNAF1mice-review-image_b408db24-a5d3-499c-b350-c9418a54f5ba_1066x.jpg?v=1743132682",
    alt: "Mouse and Grip Tape",
    title: "Good experience!",
    text: "A veritable roll king mouse, configuration pull full, this price does not lose the well-known big flagship mouse, mold grip experience does not lose GPW, very close to the hand, the size of the moderate bar, big hand small hand should be able to use......",
    date: "November 20, 2023",
  },
  {
    image:
      "https://vgnlab.com/cdn/shop/files/VGNV1headsets-review-image_1066x.jpg?v=1743132703",
    alt: "Headset",
    title: "Excellent price-quality ratio",
    text: "High value, workmanship can be, did not encounter any quality control problems, very light, long time with no feeling uncomfortable, my head belongs to the big, range is very fierce, 2.4g delay is very low, cheap, the sound is a little stuffy, listen to music try .....",
    date: "December 19, 2023",
  },
];

export const blogPosts = [
  {
    image: "https://vgnlab.com/cdn/shop/articles/DSC00118_4ce31c8d-812a-4707-9482-cad0494a1473_720x.jpg?v=1787902509",
    title: "PAW3950 Vs PAW3955: Which VGN Gaming Mouse Sensor Should You Choose?",
    desc: "PAW3950 vs PAW3955: Which VGN Gaming Mouse Sensor Should You Choose? Int...",
  },
  {
    image: "https://vgnlab.com/cdn/shop/articles/DSC07252_2de8b18d-bd0d-4fc5-9d84-213493ffeb7e_720x.jpg?v=1787653993",
    title: "VGN Gaming Mouse Grip Guide: Find The Right Grip For FPS Gaming",
    desc: "VGN Gaming Mouse Grip Guide: Find the Right Grip for FPS Gaming Introduct...",
  },
  {
    image: "https://vgnlab.com/cdn/shop/articles/F2_banner_d2e24cec-c0a9-4e1b-9f49-27e873ad6ba5_720x.jpg?v=1786959463",
    title: "Best Gaming Mouse For Valorant In 2026",
    desc: "Best Gaming Mouse for Valorant in 2026 Valorant is a game where small aiming ...",
  },
  {
    image: "https://vgnlab.com/cdn/shop/articles/20251024104847_435_606_85892ab5-73dd-4a5a-9f76-e23a3949828d_720x.jpg?v=1786952869",
    title: "Best Gaming Mouse For FPS Games In 2026",
    desc: "Best Gaming Mouse for FPS Games in 2026 If you play competitive FPS games, yo...",
  },
  {
    image: "https://vgnlab.com/cdn/shop/articles/5_430x_4d24ea0c-06a6-4ca7-8a0b-450dbcd44c3f_720x.png?v=1786950603",
    title: "Mechanical Keyboard Features & Troubleshooting Guide",
    desc: "Introduction This article provides a general introduction to the features a...",
  },
  {
    image: "https://vgnlab.com/cdn/shop/articles/How_Multi-Monitor_Setups_Affect_Mouse_Muscle_Memory_in_Competitive_Gaming_afe0862a-b47d-499e-bb79-9087c7904fa8_720x.png?v=1783394261",
    title: "How Multi-Monitor Setups Affect Mouse Muscle Memory In Competitive Gaming",
    desc: "In competitive gaming, success often depends on consistency, precision, and f...",
  },
  {
    image: "https://vgnlab.com/cdn/shop/articles/Why_8000Hz_Isn_t_Always_Stable_in_Real_Gameplay_720x.png?v=1783319972",
    title: "Why 8000Hz Isn't Always Stable In Real Gameplay",
    desc: "8000Hz polling rate mice are often marketed as delivering the lowest possible...",
  },
  {
    image: "https://vgnlab.com/cdn/shop/articles/How_Switch_Actuation_Force_Affects_Your_Aim_in_FPS_Games_238b56ab-6e8d-4ce3-b983-6cba299c5a18_720x.png?v=1783048552",
    title: "How Switch Actuation Force Affects Your Aim In FPS Games",
    desc: "In FPS games, players often focus on mouse settings or DPI, but keyboard actu...",
  },
  {
    image: "https://vgnlab.com/cdn/shop/articles/Monitor_Refresh_Rate_Affects_Mouse_720x.png?v=1782113246",
    title: "How Monitor Refresh Rate Affects Mouse Aim Perception",
    desc: "For many gamers, upgrading to a higher refresh rate monitor can make mouse ai...",
  },
];

export const tiktokPosts = [
  {
    bg: "https://vgnlab.com/cdn/shop/articles/DSC00118_4ce31c8d-812a-4707-9482-cad0494a1473_720x.jpg?v=1787902509",
    likes: 54,
    comments: 1,
    shares: 8,
    desc: "Student Party Money Saving Strate...",
    sound: "original sound - VGN - VGN",
    duration: "00:28/00:28",
  },
  {
    bg: "https://vgnlab.com/cdn/shop/articles/DSC07252_2de8b18d-bd0d-4fc5-9d84-213493ffeb7e_720x.jpg?v=1787653993",
    likes: 68,
    comments: 2,
    shares: 28,
    desc: "VGN Neon: Lighting That Makes You...",
    sound: "原聲 - VGN - VGN",
    duration: "00:28/00:28",
  },
  {
    bg: "https://vgnlab.com/cdn/shop/articles/F2_banner_d2e24cec-c0a9-4e1b-9f49-27e873ad6ba5_720x.jpg?v=1786959463",
    likes: 210,
    comments: 15,
    shares: 5,
    desc: "VGN wish you a Happy Chinese Ne...",
    sound: "original sound - VGN",
    duration: "00:24/00:24",
  },
  {
    bg: "https://vgnlab.com/cdn/shop/articles/20251024104847_435_606_85892ab5-73dd-4a5a-9f76-e23a3949828d_720x.jpg?v=1786952869",
    likes: 145,
    comments: 4,
    shares: 20,
    desc: "Meet the VGN Dragonfly F2—where...",
    sound: "原聲 - VGN - VGN",
    duration: "00:48/00:48",
  },
];

export const videoPreview =
  "https://vgnlab.com/cdn/shop/articles/5_430x_4d24ea0c-06a6-4ca7-8a0b-450dbcd44c3f_720x.png?v=1786950603";
