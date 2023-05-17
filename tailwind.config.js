/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./layouts/**/*.html",
        "./assets/js/search.js",
        "./node_modules/flowbite/**/*.js",
    ],
    theme: {
        extend: {
            maxHeight: {
                "1/2": "30vh",
            },
            colors: {
                navbar: {
                    DEFAULT: "#222222",
                },
            },
            backgroundImage: {
                venue: "url('/calendar/events/2023-04-03/place_hudd8333d98c209bce05c730fa950d563e_1684543_500x0_resize_box_3.png')",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                bandSiteTheme: {
                    primary: "#079A82",
                    secondary: "#048271",
                    accent: "#F7C948",
                    neutral: "#222222",
                    "neutral-content": "#CFCFCF",
                    "base-100": "#E1E1E1",
                },
            },
        ],
    },
};
