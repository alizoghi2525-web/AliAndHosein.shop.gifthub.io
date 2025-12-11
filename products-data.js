// محصولات فروشگاه - ۳۵ محصول متنوع و منحصر به فرد
const products = [
    // دسته گیمینگ (۷ محصول)
    {
        id: 1,
        name: "کنسول PlayStation 5 Digital Edition",
        originalPrice: 24500000,
        finalPrice: 22900000,
        category: "gaming",
        image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&h=400&fit=crop",
        image2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThFggtdDm0vLT_P9rGjAr-aRhvhmFfThKh3Q&s",
        description: "کنسول نسل نهم سونی بدون درایو دیسک با پردازنده AMD Zen 2، کارت گرافیک RDNA 2 و ۸۲۵GB حافظه SSD",
        rating: 5
    },
    {
        id: 2,
        name: "کارت گرافیک NVIDIA GeForce RTX 4070 Ti",
        originalPrice: 52000000,
        finalPrice: 49900000,
        category: "gaming",
        image: "https://images.nvidia.com/geforce-com/international/geforce-garage/guides/gtx-1080-ti-ryzen-build/rgb-gpu.jpg",
        image2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNEVZ5VcBohI_X71GEMKyJBX9kYR1KJYiDc_KV7JcaaDPQNWmV",
        description: "کارت گرافیک قدرتمند با ۱۲GB حافظه GDDR6X، پشتیبانی از Ray Tracing و DLSS 3.0",
        rating: 5
    },
    {
        id: 3,
        name: "صندلی گیمینگ DXRacer Formula Series",
        originalPrice: 18500000,
        finalPrice: 16900000,
        category: "gaming",
        image: "https://geeroom.ir/wp-content/uploads/2023/10/Gaming-Chair.jpg",
        image2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNH2icPlLYl-0r72jtUqJ1I44_o2yFugWlK77ZJVvqY8QJYo_D",
        description: "صندلی ارگونومیک با قابلیت تنظیم ارتفاع، تکیه‌گاه کمر و گردن، جنس چرم مصنوعی",
        rating: 4
    },
    {
        id: 4,
        name: "هدفون گیمینگ SteelSeries Arctis Nova Pro",
        originalPrice: 9200000,
        finalPrice: 8500000,
        category: "gaming",
        image: "https://www.digikala.com/mag/wp-content/uploads/2024/02/Gaming-headset-cover.jpg",
        image2: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQIgdRZ5WW6gqr4Wk0HIQDRSbC3Wd9dTVTNCIrk9xkm8GCKLX9f",
        description: "هدفون بی‌سیم با نویزکنسلینگ فعال، کیفیت صدای 360 درجه و باتری 36 ساعته",
        rating: 5
    },
    {
        id: 5,
        name: "ماوس گیمینگ Razer DeathAdder V3 Pro",
        originalPrice: 4800000,
        finalPrice: 4390000,
        category: "gaming",
        image: "https://www.digikala.com/mag/wp-content/uploads/2022/12/Untitled-2-25.jpg",
        image2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcN63xYYp-hNkVIjXr6zlrwRebVjbmZFORn1sTNpTGS5mvBkyF",
        description: "ماوس بی‌سیم با سنسور نوری 30000 DPI، وزن 63 گرم و 5 دکمه قابل برنامه‌ریزی",
        rating: 4
    },
    {
        id: 6,
        name: "کیبورد مکانیکی Logitech G Pro X",
        originalPrice: 6800000,
        finalPrice: 6200000,
        category: "gaming",
        image: "https://cdnn.mobit.ir/mag/wp-content/uploads/2022/07/31145944/best-gaming-keyboard-1.jpg",
        image2: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQqUY_SdpqTXnwTfk1zUqg70Mo-rnbvY37mlhQ27eqMFIfttcBr",
        description: "کیبورد مکانیکی با سوئیچ‌های قابل تعویض، نورپردازی RGB و طراحی Tenkeyless",
        rating: 4
    },
    {
        id: 7,
        name: "مانیتور گیمینگ Samsung Odyssey G7 32 اینچ",
        originalPrice: 16800000,
        finalPrice: 15500000,
        category: "gaming",
        image: "https://www.technolife.com/image/color_image_TLP-259504_1a1a1a_44478444-bdc7-4a6c-85bd-cfa2ef414cd1.png",
        image2: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTQ4FUY2JTGnA2YEe-UlgEeSn9RgOMoUgCpt7oMukdjiWnraCu2",
        description: "مانیتور 32 اینچی با نرخ تازه‌سازی 240Hz، رزولوشن QHD و زمان پاسخ 1ms",
        rating: 5
    },

    // دسته موبایل (۷ محصول)
    {
        id: 8,
        name: "گوشی آیفون 14 پرو مکس 256GB",
        originalPrice: 64900000,
        finalPrice: 59900000,
        category: "mobile",
        image: "https://images.unsplash.com/photo-1664478546384-d57ffe74a78c?w=600&h=400&fit=crop",
        image2: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRcDpvXKLBGVjHYszSSQ062kMZkDy-RYL1Vr7uvOp2HdcKnxx3D",
        description: "پرچمدار اپل با پردازنده A16 Bionic، نمایشگر 6.7 اینچی و دوربین 48 مگاپیکسل",
        rating: 5
    },
    {
        id: 9,
        name: "گوشی سامسونگ گلکسی S23 اولترا 512GB",
        originalPrice: 58500000,
        finalPrice: 54900000,
        category: "mobile",
        image: "https://api2.zoomit.ir/media/652d0545eb21a6b54f5092ab?w=1920&q=80",
        image2: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRm4lRIT626AQAlIMA75w-7B4l2tp6HKO0smv2CUFNgsh_HfZEo",
        description: "گوشی پرچمدار سامسونگ با قلم S-Pen، دوربین 200 مگاپیکسلی و پردازنده اسنپدراگون 8 Gen 2",
        rating: 5
    },
    {
        id: 10,
        name: "شارژر سریع Anker 65W Nano II",
        originalPrice: 380000,
        finalPrice: 329000,
        category: "mobile",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXPLwkTH27H9t7UA1wPKCmzS09ZOc_7Pyoaw&s",
        image2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXPLwkTH27H9t7UA1wPKCmzS09ZOc_7Pyoaw&s",
        description: "شارژر فشرده 65 وات با دو پورت USB-C، قابلیت شارژ سریع لپ‌تاپ و موبایل",
        rating: 4
    },
    {
        id: 11,
        name: "پاوربانک Xiaomi 20000mAh",
        originalPrice: 450000,
        finalPrice: 399000,
        category: "mobile",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRst6q2E-Dr8zmjhnd8z-3OBKKAeFwDjnSAPg&s",
        image2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRst6q2E-Dr8zmjhnd8z-3OBKKAeFwDjnSAPg&s",
        description: "پاوربانک با ظرفیت بالا، دو پورت خروجی و قابلیت شارژ سریع ",
        rating: 4
    },
    {
        id: 12,
        name: "گوشی شیائومی ردمی نوت 12 پرو پلاس",
        originalPrice: 19500000,
        finalPrice: 17900000,
        category: "mobile",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=400&fit=crop",
        image2: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTB_zIkOqN-WpKu0gHFzLiVrJvXjjxWOv2skmmr72MU1Jptrqrc",
        description: "گوشی میان‌رده با دوربین 200 مگاپیکسلی، نمایشگر 120Hz و شارژ سریع 120W",
        rating: 4
    },
    {
        id: 13,
        name: "شارژر وایرلس Samsung 15W",
        originalPrice: 350000,
        finalPrice: 299000,
        category: "mobile",
        image: "https://espeero.com/wp-content/uploads/2020/06/dd823d0a8a2cb51021cc89d5a106d6e2.w2500.h2500.jpg",
        image2: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRi4ZyIjBidlytopslJzz4wH-GNN_X6Ih4yrUoobKpbH0j3WLaj",
        description: "شارژر وایرلس با قدرت 15 وات، طراحی جمع و جور و قابلیت شارژ سریع",
        rating: 4
    },

    // دسته گجت و صدا (۷ محصول)
     {
        id: 14,
        name: "هندزفری AirPods Pro 2",
        originalPrice: 9800000,
        finalPrice: 8990000,
        category: "gadgets",
        image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&h=400&fit=crop",
        image2: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTjcUUGhRDPKUoClWRcRvIXD4aNCtOLJknalWb33ZXoWurMPd3W",
        description: "هندزفری بی‌سیم با نویزکنسلینگ فعال، کیفیت صدای Spatial Audio و شارژ بی‌سیم",
        rating: 5
    },
    {
        id: 15,
        name: "هدفون Sony WH-1000XM5",
        originalPrice: 9800000,
        finalPrice: 8990000,
        category: "gadgets",
        image: "https://www.yasertebat.com/public/images/products/sony-wh-1000xm5-1.jpg",
        image2: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSZwesI2sTjM7yuOMsWH2c9MTAgjidmx5nTpJ7vf21SPI2Owwj-",
        description: "هدفون نویزکنسلینگ با پردازنده V1، باتری 30 ساعته و کیفیت صدای استثنایی",
        rating: 5
    },
    {
        id: 16,
        name: "ساعت هوشمند Apple Watch Series 8",
        originalPrice: 22800000,
        finalPrice: 20900000,
        category: "gadgets",
        image: "https://www.shahrsakhtafzar.com/fa/images/1401/09/06/apple-watch-8/watch8.jpg",
        image2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCxJ8WGkOhFL-bFGa_t4gu3Jbgwhx4whTnucWWo4b-SUTC56KU",
        description: "ساعت هوشمند با نمایشگر همیشه‌روشن، سنسورهای سلامت پیشرفته و مقاوم در برابر آب",
        rating: 5
    },
    {
        id: 17,
        name: "اسپیکر بلوتوث JBL Charge 5",
        originalPrice: 3500000,
        finalPrice: 3190000,
        category: "gadgets",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=400&fit=crop",
        image2: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTzMmODh0a_vB2BQ8YVUjY3kLzjvhRUb2OQC9QwpfuJf1ySmfbO",
        description: "اسپیکر پرتابل با باتری 20 ساعته، مقاوم در برابر آب و کیفیت صدای JBL Pro Sound",
        rating: 4
    },
    {
        id: 18,
        name: "دوربین GoPro HERO11 Black",
        originalPrice: 18500000,
        finalPrice: 16900000,
        category: "gadgets",
        image: "https://cdn.mos.cms.futurecdn.net/BZ6rcymKHTLhLYpWjnpc9U.jpg",
        image2: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQAmWfsELWEa22-uRLA6e-yRCWrGscOs8B51I2UB6vl7SKzHceX",
        description: "دوربین اکشن با قابلیت ضبط 5.3K، تثبیت‌کننده HyperSmooth 5.0 و مقاوم در برابر آب",
        rating: 5
    },
    {
        id: 19,
        name: "کتابخوان Kindle Paperwhite 11th Gen",
        originalPrice: 8900000,
        finalPrice: 8290000,
        category: "gadgets",
        image: "https://dkstatics-public.digikala.com/digikala-products/4761552.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
        image2: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSFyZKcnXnVRpyn932GniuDEiFfyjjpZalGSLrLCmZCl7vr2ZBG",
        description: "کتابخوان با نمایشگر 6.8 اینچی، نورپردازی تنظیم‌شونده و مقاوم در برابر آب",
        rating: 4
    },
    {
        id: 20,
        name: "دستیار صوتی Google Nest Hub 2nd Gen",
        originalPrice: 3800000,
        finalPrice: 3490000,
        category: "gadgets",
        image: "https://www.imarketor.com/wp-content/uploads/2023/08/Google-Nest-Hub-2nd-Gen.jpg",
        image2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1seKdMi0O_dOJT3sXn4CyhpRuQahcS8gqVItjNcKB1VjBcJBk",
        description: "دستیار هوشمند با نمایشگر 7 اینچی، کنترل خانه هوشمند و کیفیت صدای عالی",
        rating: 4
    },
    {
        id: 21,
        name: "پایه شارژ وایرلس ۳ در ۱ Belkin",
        originalPrice: 1650000,
        finalPrice: 1490000,
        category: "gadgets",
        image: "https://softpple.com/wp-content/uploads/2025/10/Belkin-WIZ013-Black-1.webp",
        image2: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSYSiF0m3lqpCUs_I8Asw2TrvfQ79E99WYQYS9dyDbNtV14F5HL",
        description: "پایه شارژ برای آیفون، اپل واچ و ایرپادز با طراحی ارگونومیک",
        rating: 4
    },

    // دسته کتاب دیجیتال (۷ محصول)
    {
        id: 22,
        name: "کتاب دیجیتال: برنامه‌نویسی وب پیشرفته",
        originalPrice: 265000,
        finalPrice: 229000,
        category: "ebooks",
        image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&h=400&fit=crop",
        image2: "",
        description: "آموزش جامع React، Node.js، MongoDB و Docker - پروژه‌محور و کاربردی",
        rating: 5
    },
    {
        id: 23,
        name: "کتاب دیجیتال: هوش مصنوعی در عمل",
        originalPrice: 335000,
        finalPrice: 299000,
        category: "ebooks",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
        image2: "",
        description: "آموزش پیاده‌سازی پروژه‌های هوش مصنوعی با پایتون و TensorFlow",
        rating: 4
    },
    {
        id: 24,
        name: "کتاب دیجیتال: تحلیل تکنیکال ارز دیجیتال",
        originalPrice: 295000,
        finalPrice: 259000,
        category: "ebooks",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
        image2: "",
        description: "راهنمای کامل تحلیل تکنیکال، تابلوخوانی و مدیریت ریسک در بازار کریپتو",
        rating: 4
    },
    {
        id: 25,
        name: "کتاب دیجیتال: طراحی UI/UX حرفه‌ای",
        originalPrice: 225000,
        finalPrice: 199000,
        category: "ebooks",
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=400&fit=crop",
        image2: "",
        description: "اصول طراحی رابط کاربری، تجربه کاربری و پروتوتایپ با Figma",
        rating: 5
    },
    {
        id: 26,
        name: "کتاب دیجیتال: امنیت سایبری پیشرفته",
        originalPrice: 395000,
        finalPrice: 349000,
        category: "ebooks",
        image: "https://images.unsplash.com/photo-1564865878688-9a244444042a?w=600&h=400&fit=crop",
        image2: "",
        description: "آموزش تست نفوذ، آنالیز بدافزار و امنیت شبکه‌های کامپیوتری",
        rating: 4
    },
    {
        id: 27,
        name: "کتاب دیجیتال: توسعه اپلیکیشن موبایل",
        originalPrice: 295000,
        finalPrice: 259000,
        category: "ebooks",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
        image2: "",
        description: "آموزش React Native و Flutter - ساخت اپلیکیشن‌های اندروید و iOS",
        rating: 5
    },
    {
        id: 28,
        name: "کتاب دیجیتال: سرمایه‌گذاری در بورس",
        originalPrice: 205000,
        finalPrice: 179000,
        category: "ebooks",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
        image2: "",
        description: "راهنمای مبتدی تا پیشرفته برای سرمایه‌گذاری موفق در بازار بورس ایران",
        rating: 4
    },

    // دسته کالای برقی (۷ محصول)
    {
        id: 29,
        name: "قهوه‌ساز اتوماتیک Delonghi ECAM 350.75",
        originalPrice: 8800000,
        finalPrice: 8190000,
        category: "electric",
        image: "https://delonghi-co.ir/wp-content/uploads/2021/11/d8a7d8b3d9bed8b1d8b3d988d8b3d8a7d8b2-d8a7d8aad988d985d8a7d8aadb8cdaa9-d8afd984d988d986daafdb8c-ecam-350-15-b_618f69d38f425.jpeg",
        image2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJTYdw-1J7W___1H4g8adevy-iLhL3LAoBvINR_Pf_eeDb8Pn4",
        description: "قهوه‌ساز تمام اتوماتیک با آسیاب سرامیکی، ۱۳ نوع نوشیدنی و نمایشگر لمسی",
        rating: 5
    },
    {
        id: 30,
        name: "جاروبرقی رباتیک Roborock S7 MaxV Ultra",
        originalPrice: 12800000,
        finalPrice: 11900000,
        category: "electric",
        image: "https://dkstatics-public.digikala.com/digikala-products/35ccffa45ee589f9f98b655dfbfbbd71f6faf6dc_1663231908.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90",
        image2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLAgNx2qDiv6-UyW54XTXovohgY6shpzSyi6F2KtbwaclW2AwL",
        description: "جاروبرقی هوشمند با دوربین، نقشه‌برداری 3D و ایستگاه شستشوی خودکار",
        rating: 5
    },
    {
        id: 31,
        name: "مایکروویو سامسونگ 32 لیتری Grill",
        originalPrice: 5750000,
        finalPrice: 5290000,
        category: "electric",
        image: "https://image.torob.com/base/images/Xy/PY/XyPYVXpYeAT8Upbb.jpg",
        image2: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSB2WXzOu6Qt_oJeuypv2mjACxGU0hbARKoQJub8HLDGwDnhi62",
        description: "مایکروویو با قابلیت گریل، ۱۰۰۰ وات قدرت و ۱۰ برنامه پخت خودکار",
        rating: 4
    },
    {
        id: 32,
        name: "هود آشپزخانه پاناسونیک 90cm",
        originalPrice: 4350000,
        finalPrice: 3990000,
        category: "electric",
        image: "https://dkstatics-public.digikala.com/digikala-products/31848b97d9a454c8686b604b5f1f03f1a43246ea_1610043196.jpg?x-oss-process=image/resize,h_1600/quality,q_80",
        image2: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRB1UftO4clIszYdlWjxpQxHWAqgJw-9TuwzZyE-ISkYJUwYC2d",
        description: "هود دکوراتیو با قدرت مکش 1000m³/h، نور LED و کنترل لمسی",
        rating: 4
    },
    {
        id: 33,
        name: "پنکه سقفی هیتاچی با چراغ LED",
        originalPrice: 3950000,
        finalPrice: 3590000,
        category: "electric",
        image: "https://oss.sazito.com/apiuploads/finykal/uploads/image/rootimage/10952/1c9cdcdb9e4a5478ca8495d11c52d1f1.jpg",
        image2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6zgStqkv3dXU6HkkeZqL3aQbosw8cDoWP6Mh9RqN04w7TiwB5",
        description: "پنکه ۵ پره با نورپردازی LED، کنترل از راه دور و موتور بی‌صدا",
        rating: 4
    },
    {
        id: 34,
        name: "ماشین لباسشویی LG Inverter 10kg",
        originalPrice: 35800000,
        finalPrice: 33500000,
        category: "electric",
        image: "https://afralland.com/wp-content/uploads/2024/08/lg-f4y3-washing-machine-main-image.jpg",
        image2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoDdH4hHFsdYA0SxOebCpv4Q3VN7Dc3JE5Fsl8ozIW1pG-aqDC",
        description: "لباسشویی ۱۰ کیلویی با موتور اینورتر، بخارشو و ۱۴ برنامه شستشو",
        rating: 5
    },
    {
        id: 35,
        name: "یخچال ساید بای ساید سامسونگ 635 لیتری",
        originalPrice: 86500000,
        finalPrice: 81900000,
        category: "electric",
        image: "https://banenovin.com/wp-content/uploads/2024/07/10.webp",
        image2: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSad7JYyRt7IwubH6Civ4BJeytKUVwy1YYZYC6dnm43kiGWCeH3",
        description: "یخچال بزرگ با فناوری Twin Cooling Plus، ساخت یخ اتوماتیک و نمایشگر لمسی",
        rating: 5
    }
];

// ذخیره محصولات در localStorage
if (typeof localStorage !== 'undefined') {
    localStorage.setItem('products', JSON.stringify(products));
}

// تابع کمکی برای قالب‌بندی قیمت
function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
}

// تابع کمکی برای ایجاد ستاره‌های امتیاز
function generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}