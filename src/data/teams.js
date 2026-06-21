export const teams = [
    { 
        id: 'redbull',
        name: 'Red Bull Racing', 
        primary: '#0600EF', 
        accent: '#CC0000', 
        dark: '#000814',
        imageUrl: '/assets/hero-car.png',
        filter: 'hue-rotate(60deg) saturate(1.2)' // Turns Cyan into Deep Blue
    },
    { 
        id: 'mercedes',
        name: 'Mercedes-AMG', 
        primary: '#C8CCCE', 
        accent: '#00A19B', 
        dark: '#000000',
        imageUrl: '/assets/hero-car.png',
        filter: 'hue-rotate(0deg) saturate(0.5)' // Keeps Teal/Cyan but makes it more silver/desaturated
    },
    { 
        id: 'ferrari',
        name: 'Scuderia Ferrari', 
        primary: '#EF1A2D', 
        accent: '#FF2800', 
        dark: '#110000',
        imageUrl: '/assets/hero-car.png',
        filter: 'hue-rotate(180deg) saturate(2)' // Turns Cyan into Red
    },
    { 
        id: 'mclaren',
        name: 'McLaren', 
        primary: '#FF8000', 
        accent: '#474747', 
        dark: '#0F0F0F',
        imageUrl: '/assets/hero-car.png',
        filter: 'hue-rotate(210deg) saturate(1.5)' // Turns Cyan into Papaya Orange
    },
    { 
        id: 'aston',
        name: 'Aston Martin', 
        primary: '#00665E', 
        accent: '#CEDC00', 
        dark: '#0A1A17',
        imageUrl: '/assets/hero-car.png',
        filter: 'hue-rotate(290deg) saturate(1.2)' // Turns Cyan into British Racing Green
    },
    { 
        id: 'alpine',
        name: 'Alpine', 
        primary: '#0090FF', 
        accent: '#FD4BC7', 
        dark: '#051220',
        imageUrl: '/assets/hero-car.png',
        filter: 'hue-rotate(130deg) saturate(1.5)' // Turns Cyan into Pink/Magenta
    },
    { 
        id: 'williams',
        name: 'Williams', 
        primary: '#005AFF', 
        accent: '#00A0FF', 
        dark: '#000B20',
        imageUrl: '/assets/hero-car.png',
        filter: 'hue-rotate(30deg) saturate(1)' // Turns Cyan into Light Blue
    },
    { 
        id: 'vcarb',
        name: 'VCARB / AlphaTauri', 
        primary: '#00293F', 
        accent: '#FFFFFF', 
        dark: '#00111A',
        imageUrl: '/assets/hero-car.png',
        filter: 'hue-rotate(50deg) saturate(0.8)' // Turns Cyan into deeper Blue/White
    },
    { 
        id: 'sauber',
        name: 'Alfa Romeo / Sauber', 
        primary: '#00E701', 
        accent: '#000000', 
        dark: '#050505',
        imageUrl: '/assets/hero-car.png',
        filter: 'hue-rotate(270deg) saturate(1.5)' // Turns Cyan into Neon Green
    },
    { 
        id: 'haas',
        name: 'Haas', 
        primary: '#FFFFFF', 
        accent: '#E6002B', 
        dark: '#111111',
        imageUrl: '/assets/hero-car.png',
        filter: 'hue-rotate(180deg) saturate(1.2)' // Turns Cyan into Red/Black
    }
];

export const defaultTeam = teams[3]; // McLaren default
