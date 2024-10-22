const items = [
    {
        id: 1,
        img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFyZ3JpdGElMjBwaXp6YXxlbnwwfDF8MHx8fDA%3D",
        title: "Margarita pizza",
        description: "simply tomato sauce, fresh mozzarella, and fresh basil",
        qty: 1,
        price: 140,
        tag: "pizza",    
    },
    {
        id: 2,
        img: "https://images.unsplash.com/photo-1508736793122-f516e3ba5569?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U2V6d2FuJTIwQnVyZ2VyJTIwZm9yJTIwbWVudSUyMGltYWdlfGVufDB8MXwwfHx8MA%3D%3D",
        title: "Sezwan Burger(Veg)",
        description: "Spicy patty (think mushrooms, potato, or veggie crumbles) with schezwan sauce, on a bun",
        qty: 1,
        price: 80,
        tag: "burger",
    },
    {
        id: 3,
        img: "https://images.unsplash.com/photo-1530805948738-95aa20739233?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZyZW5jaCUyMGZyaWVzfGVufDB8MXwwfHx8MA%3D%3D",
        title: "French Fries",
        description: "Potatoes, oil for frying, maybe some salt",
        qty: 1,
        price: 65,
        tag: "fries",
    },
    {
        id: 4,
        img: "https://imgs.search.brave.com/-6T9HKVc2dgIlYu1uslRt1Y-tB4IcFFrtpiFicJ5SUI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8z/LzM5L0dvYmlfTWFu/Y2h1cmlhbi5qcGc",
        title: "Gobi Manchurian",
        description: " Crispy cauliflower in a sweet, spicy sauce",
        qty: 1,
        price: 200,
        tag: "manchurian",
    },
    {
        id: 5,
        img: "https://imgs.search.brave.com/Fad5oZJdnP75Bwkv1LPt3ri66Cf7Ckpx6HZMMRvJsyE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/ZW5uZS1wYXN0YV8x/MzM5LTkzMi5qcGc_/c2l6ZT02MjYmZXh0/PWpwZw",
        title: "Pasta",
        description: "Wheat flour, water, maybe some egg (for fresh versions)",
        qty: 1,
        price: 90,
        tag: "pasta",
    },
    {
        id: 6,
        img: "https://imgs.search.brave.com/WYO6mK9OM3l1Wjhib3rVBxMZxAN5wp4bEYiRxKCBLMA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/NzYyMjQyMDM0MjEt/OWFjMzliY2IzMzI3/P2ZtPWpwZyZ3PTMw/MDAmYXV0bz1mb3Jt/YXQmZml0PWNyb3Am/cT02MCZpeGxpYj1y/Yi00LjAuMyZpeGlk/PU0zd3hNakEzZkRC/OE1IeGxlSEJzYjNK/bExXWmxaV1I4TVRs/OGZIeGxibnd3Zkh4/OGZIdz0.jpeg",
        title: "Sushi",
        description: "Vinegared rice, seaweed wrapper (nori), with seafood or veggie fillings",
        qty: 1,
        price: 230,
        tag: "shushi",
    },
    {
        id: 7,
        img: "https://imgs.search.brave.com/45uxHe2T_4pQIBq_nts92-0cHznC58s-yweLarvRt7E/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/My8xMC8xMy80OS9m/YXN0LWZvb2QtMjEz/Mjg2M182NDAuanBn",
        title: "Hotdog",
        description: "Savory sausage in a bun, dressed to your liking",
        qty: 1,
        price: 100,
        tag: "hotdog",
    },
    {
        id: 8,
        img: "https://imgs.search.brave.com/1cvdJWBVkRDSnwJT6Dr2bt603EKOh__9niQ1G5Gn8cs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvODM0/NzM5NjkvcGhvdG8v/c2hpc2gta2Fib2Jz/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1qenlaeVpuNlNZ/VGpXZUdfLVMtcnNF/SVJ1WTRsX0tSZG9B/VFFoU3JHZldZPQ",
        title: "Kabab",
        description: "Marinated meat (or veggies for veg kabab) grilled on skewers or cooked in various ways",
        qty: 1,
        price: 160,
        tag: "kabab",
    },
    {
        id: 9,
        img: "https://imgs.search.brave.com/7scfAH4e1fZdpfcfD8Tacc3FJYbXETOilW50IV1eFRk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9k/ZWxpY2lvdXMtdGFj/by1zdHVkaW9fMjMt/MjE1MTA0Nzk2Ny5q/cGc_c2l6ZT02MjYm/ZXh0PWpwZw",
        title: "Taco",
        description: "Seasoned filling (meat, beans, veg) in a warm tortilla, with fresh toppings like salsa, cheese, and guac",
        qty: 1,
        price: 170,
        tag: "taco",
    },
    {
        id: 10,
        img: "https://imgs.search.brave.com/-KwTuw7AmJxw6Up2ElnqYdTKwt9hWEbT-eODhnb6oW0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjAw/NTAwOTk2LTAwMS9w/aG90by9ib3dsLW9m/LXBvcGNvcm4uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPUZz/SkpkZEZlTDlNNjMw/Z3dHNmwwenBRaG5T/MGtUVW0yLXFPcGgx/R0NTclk9",
        title: "Popcorn",
        description: "Just kernels, oil, and a sprinkle of magic (aka salt)",
        qty: 1,
        price: 80,
        tag: "popcorn",
    },
    {
        id: 11,
        img: "https://imgs.search.brave.com/QfbbJzva8F9h623Fn7o5ksbPUzxhBugIGdHXvU4OvQk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQw/MzYzNzA4NC9waG90/by9zcGFuaXNoLW9t/bGV0dGUuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPUVhVW53/Ul80VVBVcVNtazBN/NU9PejJHdzdLdmNt/MEI2X2NnakhaQVVL/ZlU9",
        title: "Spanish Omlet",
        description: "Eggs, potatoes, onions (optional), all fried together",
        qty: 1,
        price: 200,
        tag: "omlet",
    },
]

export default items;