export const teams = [
    { 
        id: 'redbull',
        name: 'Red Bull Racing', 
        primary: '#0600EF', 
        accent: '#CC0000', 
        dark: '#000814',
        imageUrl: '/assets/hero-car.png',
        logoUrl: '/logos/red-bull-racing.png',
        filter: 'hue-rotate(60deg) saturate(1.2)',
        country: 'Austria',
        principal: 'Laurent Mekies',
        established: 2005,
        stats: { wins: 120, points: 7600, podiums: 280 },
        drivers: [
            { name: 'Max Verstappen', code: 'VER', country: 'Netherlands' },
            { name: 'Isack Hadjar', code: 'HAD', country: 'France' }
        ]
    },
    { 
        id: 'mercedes',
        name: 'Mercedes-AMG', 
        primary: '#C8CCCE', 
        accent: '#00A19B', 
        dark: '#000000',
        imageUrl: '/assets/hero-car.png',
        logoUrl: '/logos/mercedes.png',
        filter: 'hue-rotate(0deg) saturate(0.5)',
        country: 'Germany',
        principal: 'Toto Wolff',
        established: 1954,
        stats: { wins: 125, points: 7200, podiums: 290 },
        drivers: [
            { name: 'George Russell', code: 'RUS', country: 'United Kingdom' },
            { name: 'Kimi Antonelli', code: 'ANT', country: 'Italy' }
        ]
    },
    { 
        id: 'ferrari',
        name: 'Scuderia Ferrari', 
        primary: '#EF1A2D', 
        accent: '#FF2800', 
        dark: '#110000',
        imageUrl: '/assets/hero-car.png',
        logoUrl: '/logos/ferrari.png',
        filter: 'hue-rotate(180deg) saturate(2)',
        country: 'Italy',
        principal: 'Frédéric Vasseur',
        established: 1950,
        stats: { wins: 245, points: 10000, podiums: 820 },
        drivers: [
            { name: 'Charles Leclerc', code: 'LEC', country: 'Monaco' },
            { name: 'Lewis Hamilton', code: 'HAM', country: 'United Kingdom' }
        ]
    },
    { 
        id: 'mclaren',
        name: 'McLaren', 
        primary: '#FF8000', 
        accent: '#474747', 
        dark: '#0F0F0F',
        imageUrl: '/assets/hero-car.png',
        logoUrl: '/logos/mclaren.png',
        filter: 'hue-rotate(210deg) saturate(1.5)',
        country: 'United Kingdom',
        principal: 'Andrea Stella',
        established: 1966,
        stats: { wins: 185, points: 6500, podiums: 510 },
        drivers: [
            { name: 'Lando Norris', code: 'NOR', country: 'United Kingdom' },
            { name: 'Oscar Piastri', code: 'PIA', country: 'Australia' }
        ]
    },
    { 
        id: 'aston',
        name: 'Aston Martin', 
        primary: '#00665E', 
        accent: '#CEDC00', 
        dark: '#0A1A17',
        imageUrl: '/assets/hero-car.png',
        logoUrl: '/logos/aston-martin.png',
        filter: 'hue-rotate(290deg) saturate(1.2)',
        country: 'United Kingdom',
        principal: 'Adrian Newey',
        established: 2021,
        stats: { wins: 1, points: 500, podiums: 15 },
        drivers: [
            { name: 'Fernando Alonso', code: 'ALO', country: 'Spain' },
            { name: 'Lance Stroll', code: 'STR', country: 'Canada' }
        ]
    },
    { 
        id: 'alpine',
        name: 'Alpine', 
        primary: '#0090FF', 
        accent: '#FD4BC7', 
        dark: '#051220',
        imageUrl: '/assets/hero-car.png',
        logoUrl: '/logos/alpine.png',
        filter: 'hue-rotate(130deg) saturate(1.5)',
        country: 'France',
        principal: 'Flavio Briatore',
        established: 2021,
        stats: { wins: 1, points: 450, podiums: 5 },
        drivers: [
            { name: 'Pierre Gasly', code: 'GAS', country: 'France' },
            { name: 'Franco Colapinto', code: 'COL', country: 'Argentina' }
        ]
    },
    { 
        id: 'williams',
        name: 'Williams', 
        primary: '#005AFF', 
        accent: '#00A0FF', 
        dark: '#000B20',
        imageUrl: '/assets/hero-car.png',
        logoUrl: '/logos/williams.png',
        filter: 'hue-rotate(30deg) saturate(1)',
        country: 'United Kingdom',
        principal: 'James Vowles',
        established: 1977,
        stats: { wins: 114, points: 3600, podiums: 313 },
        drivers: [
            { name: 'Carlos Sainz', code: 'SAI', country: 'Spain' },
            { name: 'Alexander Albon', code: 'ALB', country: 'Thailand' }
        ]
    },
    { 
        id: 'vcarb',
        name: 'Racing Bulls', 
        primary: '#00293F', 
        accent: '#FFFFFF', 
        dark: '#00111A',
        imageUrl: '/assets/hero-car.png',
        logoUrl: '/logos/racing-bulls.png',
        filter: 'hue-rotate(50deg) saturate(0.8)',
        country: 'Italy',
        principal: 'Alan Permane',
        established: 2024,
        stats: { wins: 0, points: 100, podiums: 0 },
        drivers: [
            { name: 'Arvid Lindblad', code: 'LIN', country: 'United Kingdom' },
            { name: 'Liam Lawson', code: 'LAW', country: 'New Zealand' }
        ]
    },
    { 
        id: 'audi',
        name: 'Audi', 
        primary: '#F50537', 
        accent: '#FFFFFF', 
        dark: '#0A0A0A',
        imageUrl: '/assets/hero-car.png',
        logoUrl: '/logos/audi.png',
        filter: 'hue-rotate(350deg) saturate(1.5)',
        country: 'Germany',
        principal: 'Jonathan Wheatley',
        established: 2026,
        stats: { wins: 0, points: 0, podiums: 0 },
        drivers: [
            { name: 'Nico Hulkenberg', code: 'HUL', country: 'Germany' },
            { name: 'Gabriel Bortoleto', code: 'BOR', country: 'Brazil' }
        ]
    },
    { 
        id: 'haas',
        name: 'Haas F1 Team', 
        primary: '#FFFFFF', 
        accent: '#E6002B', 
        dark: '#111111',
        imageUrl: '/assets/hero-car.png',
        logoUrl: '/logos/haas-f1-team.png',
        filter: 'hue-rotate(180deg) saturate(1.2)',
        country: 'United States',
        principal: 'Ayao Komatsu',
        established: 2016,
        stats: { wins: 0, points: 300, podiums: 0 },
        drivers: [
            { name: 'Esteban Ocon', code: 'OCO', country: 'France' },
            { name: 'Oliver Bearman', code: 'BEA', country: 'United Kingdom' }
        ]
    },
    { 
        id: 'cadillac',
        name: 'Cadillac Racing', 
        primary: '#C0C0C0', 
        accent: '#808080', 
        dark: '#000000',
        imageUrl: '/assets/hero-car.png',
        logoUrl: '/logos/cadillac.png',
        filter: 'hue-rotate(0deg) saturate(0) brightness(1.5)',
        country: 'United States',
        principal: 'Graeme Lowdon',
        established: 2026,
        stats: { wins: 0, points: 0, podiums: 0 },
        drivers: [
            { name: 'Sergio Perez', code: 'PER', country: 'Mexico' },
            { name: 'Valtteri Bottas', code: 'BOT', country: 'Finland' }
        ]
    }
];

export const defaultTeam = teams[3]; // McLaren default
