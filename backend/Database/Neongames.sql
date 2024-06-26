CREATE DATABASE NeonGamesDB;
USE NeonGamesDB;

CREATE TABLE categories (
    id_category INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(32) NOT NULL UNIQUE
);

INSERT INTO categories (id_category, category_name)
VALUES
(1, 'Estrategia'),
(2, 'Battle Royale'),
(3, 'Shooter'),
(4, 'Supervivencia'),
(5, 'Deportes'),
(6, 'Carreras');

CREATE TABLE products (
    id_product INT PRIMARY KEY AUTO_INCREMENT,
    cover VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    discount_price DECIMAL(10, 2),
    id_category INT NOT NULL,
    game_description TEXT,
    developer VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_category) REFERENCES categories(id_category)
);

CREATE UNIQUE INDEX idx_title ON products (title);

INSERT INTO products (id_product, cover, title, price, discount_price, id_category, game_description, developer)
VALUES
(1, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066580/age-of-empires_II_DE_fr43vy.jpg', 'Age of Empires II Definitive Edition', 6.99, NULL, 1, 'Un clásico juego de estrategia en tiempo real que regresa con gráficos mejorados en 4K, nuevo contenido y algunas mejoras en la jugabilidad.', 'Ensemble Studios'), 
(2, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066580/age-of-mithology_extended-edition_p1gspz.jpg', 'Age of Mythology Extended Edition', 25.99, NULL, 1, 'Revive el clásico juego de estrategia con mitología antigua, ahora con gráficos mejorados y nuevas características como integración completa con Steamworks.', 'Ensemble Studios'), 
(3, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066579/apex-legends_z3dv2g.jpg', 'APEX Legends', 0.00, NULL, 2, 'Un shooter de Battle Royale con énfasis en personajes y trabajo en equipo, donde competidores luchan por la gloria y la fortuna.', 'Respawn Entertainment'),
(4, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066580/battlefield_2042_yla1no.jpg', 'Battlefield 2042', 50.00, NULL, 3, 'Battlefield 2042: Un shooter en primera persona que marca el regreso a la icónica guerra total de la franquicia, con batallas multijugador intensas y un arsenal de vanguardia.', 'DICE'), 
(5, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066581/battlefield_V_y1sckj.jpg', 'Battlefield V', 41.99, NULL, 3, 'Battlefield V: Regresa a los orígenes de la saga con una representación inédita de la 2ª Guerra Mundial, disfrutando de un multijugador sin cuartel y el cooperativo Armas Coordinadas.', 'DICE'), 
(6, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066580/call-of-duty_black-ops-II_if8obt.jpg', 'Call Of Duty Black Ops II', 51.99, NULL, 3, 'Call of Duty: Black Ops II: Un videojuego de disparos en primera persona que te lleva a un futuro cercano, donde la tecnología y las armas han creado una nueva generación bélica.', 'Treyarch'), 
(7, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066581/company-of-heroes_zp33o8.jpg', 'Company of Heroes', 2.99, NULL, 1, 'Company of Heroes: Un juego de estrategia en tiempo real ambientado en la Segunda Guerra Mundial, cubriendo el enfrentamiento entre las tropas alemanas y estadounidenses desde el Día D hasta el final de la guerra.', 'Relic Entertainment'),
(8, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066580/company-of-heroes_2_nglbfr.jpg', 'Company of Heroes 2', 2.99, NULL, 1, 'Company of Heroes 2: La secuela del aclamado juego de estrategia, ambientada en el frente oriental de la Segunda Guerra Mundial, con una campaña que va desde la Operación Barbarroja hasta la Batalla de Berlín.', 'Relic Entertainment'),
(9, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066581/company-of-heroes_3_g1u0wu.jpg', 'Company of Heroes 3', 21.99, NULL, 1, 'Company of Heroes 3: Estrategia de la 2ª Guerra Mundial en su máximo esplendor, con dos campañas en solitario, cinco ejércitos multijugador distintivos y una gran capacidad de rejugabilidad.', 'Relic Entertainment'),
(10, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066581/counter-strike_2_jvgxjy.jpg', 'Counter Strike 2', 0.00, NULL, 3, 'Counter-Strike 2: Una actualización gratuita de CS:GO que representa el avance técnico más importante en la historia de Counter‑Strike, desarrollado con el motor Source 2 y modernizado con representación basada en la física.', 'Valve'), 
(11, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066581/dead-space_remake_by9lqp.jpg', 'Dead Space REMAKE', 51.99, NULL, 4, 'Dead Space Remake: Un clásico del terror espacial que regresa con gráficos mejorados y una narrativa más envolvente. Sobrevive a los horrores de la USG Ishimura con Isaac Clarke.', 'Motive Studios'), 
(12, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066580/dead-space_2_v3hp5m.jpg', 'Dead Space 2', 13.99, NULL, 4, 'Dead Space 2: La secuela lleva a Isaac Clarke a enfrentar una nueva ola de necromorfos en la Estación Espacial Sprawl. Combina terror de supervivencia y acción en tercera persona.', 'Visceral Games'), 
(13, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066580/dead-space_3_o0fiqt.jpg', 'Dead Space 3', 13.99, NULL, 4, 'Dead Space 3: Isaac Clarke y John Carver buscan poner fin a la amenaza necromorfa en el planeta helado Tau Volantis. Introduce el modo cooperativo y se enfoca más en la acción.', 'Visceral Games'), 
(14, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066581/dota_2_nchicw.jpg', 'Dota 2', 0.00, NULL, 2, 'Dota 2: Un juego de estrategia en tiempo real multijugador con una profunda mecánica de juego y una amplia variedad de héroes. Dota 2 es conocido por su competitivo escenario de esports.', 'Valve'),
(15, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066582/ea-sports-fc_24_nxyhwk.jpg', 'EA SPORTS FC 24', 59.99, NULL, 5, 'EA SPORTS FC 24: La experiencia futbolística más fiel hasta la fecha, con tecnologías como HyperMotionV y el motor Frostbite™, que reinventan la forma en que los jugadores se mueven y juegan.', 'EA Sports'), 
(16, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066582/ea-sports_wrc_hg5hhc.jpg', 'EA SPORTS WRC', 39.99, NULL, 6, 'EA SPORTS WRC: Diseña y conduce tu propio coche en el nuevo Creador de vehículos. El modelo de conducción multisuperficie de Codemasters se ha mejorado para ofrecer una experiencia de rally única', 'Codemasters'), 
(17, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066582/f1_2024_d3eher.jpg', 'F1 2024', 59.99, NULL, 6, 'F1 2024: El videojuego oficial de la FIA Formula One World Championship™ de 2024. Experimenta la emoción de las carreras de Fórmula 1 con los últimos avances en simulación de conducción', 'Codemasters'), 
(18, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066582/flatout_2_lcdjqu.jpg', 'FlatOut 2', 4.99, NULL, 6, 'FlatOut 2: Un juego de carreras que se centra en la destrucción y las acrobacias. Conduce a toda velocidad y causa el mayor daño posible para ganar.', 'Bugbear Entertainment'), 
(19, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066582/forza-horizon_5_divxk6.jpg', 'Forza Horizon 5', 25.99, NULL, 6, 'Forza Horizon 5: Explora los paisajes dinámicos y en constante evolución de México. Conduce cientos de los mejores coches del mundo en un mundo abierto lleno de aventuras.', 'Playground Games'), 
(20, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066583/moto-gp_2024_ip3gas.jpg', 'MotoGP 2024', 40.99, NULL, 6, 'MotoGP 2024: Celebra el 75º aniversario de los Grandes Premios de motociclismo con una transición hacia el combustible 100% sostenible. Vive la emoción de las carreras de MotoGP con los mejores pilotos y equipos.', 'Milestone S.r.l.'), 
(21, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066582/nba_2k24_jdiugp.jpg', 'NBA 2K24', 49.99, NULL, 5, 'NBA 2K24: Un simulador de baloncesto con un alto grado de realismo y profundidad estratégica. A pesar de las críticas por sus microtransacciones, ofrece modos de juego en los que puedes vivir una carrera completa con tu personaje creado.', 'Visual Concepts'), 
(22, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066583/nfs_heat_yayh0k.jpg', 'Need for Speed Heat', 60.99, NULL, 6, 'Need for Speed Heat: Lleva a los jugadores a Palm City, donde pueden competir de día en eventos legales para ganar fondos y de noche arriesgarlo todo en carreras clandestinas, mientras evitan a la policía corrupta.', 'Ghost Games'), 
(23, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066583/pubg_fos9je.jpg', 'PUBG Battlegrounds', 0.00, NULL, 2, 'PUBG: BATTLEGROUNDS: Un shooter de estilo Battle Royale donde 100 jugadores se enfrentan entre sí. El juego ofrece modos de juego solo, dúo o equipo, y desafía a los jugadores a diseñar sus propias tácticas y estrategias.', 'PUBG Corporation'),
(24, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066583/raft_l4smet.jpg', 'Raft', 11.99, NULL, 4, 'Raft: Un juego de supervivencia en el que te encuentras en una pequeña balsa con un anzuelo de plástico viejo y debes sobrevivir en un vasto océano azul, recogiendo restos, construyendo y luchando contra el hambre, la sed y un tiburón devorador de hombres.', 'Redbeet Interactive'), 
(25, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066583/sons-of-the-forest_bjs6jz.jpg', 'Sons of the Forest', 11.99, NULL, 4, 'Sons of the Forest: La secuela de The Forest, donde juegas como un superviviente de un accidente de helicóptero atrapado en un vasto bosque, enfrentándote a peligros y construyendo para sobrevivir.', 'Endnight Games'), 
(26, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066584/subnautica_v7q2ak.jpg', 'Subnautica', 9.99, NULL, 4, 'Subnautica: Un juego de aventura submarina en un planeta oceánico alienígena, lleno de maravillas y peligros. Crea equipamiento, pilota submarinos y explora exuberantes arrecifes de coral, volcanes y sistemas de cuevas mientras intentas sobrevivir.', 'Unknown Worlds Entertainment'), 
(27, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066584/subnautica_below-zero_cydc7o.jpg', 'Subnautica Below Zero', 9.99, NULL, 4, 'Subnautica Below Zero: Ambientado un año después de Subnautica, te desafía a sobrevivir en biomas helados, tanto arriba como debajo de la superficie. Crea herramientas, busca suministros y desentraña el siguiente capítulo de la historia de Subnautica.', 'Unknown Worlds Entertainment'), 
(28, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066583/the-forest_vbn0aa.jpg', 'The Forest', 7.99, NULL, 4, 'The Forest: Como único superviviente de un accidente de avión, te encuentras en un misterioso bosque luchando por sobrevivir contra una sociedad de mutantes caníbales. Construye, explora y sobrevive en este simulador de horror de supervivencia en primera persona.', 'Endnight Games'), 
(29, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066584/valheim_v4fyzp.jpg', 'Valheim', 7.99, NULL, 4, 'Valheim: Un juego de exploración y supervivencia para 1 a 10 jugadores, ambientado en un mundo generado por procedimientos inspirado en la mitología nórdica. Fabrica armas, construye casas y enfrenta enemigos para demostrar tu valía a Odín.', 'Iron Gate AB'), 
(30, 'https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066584/warhammer_III_total-war_nfkkmx.jpg', 'Warhammer III Total War', 41.99, NULL, 1, 'Warhammer III Total War: Un juego de estrategia por turnos y tácticas en tiempo real, es el tercer juego de la serie Total War ambientado en la realidad alternativa Warhammer Fantasy. Ofrece combate multijugador en línea y batallas personalizadas en tiempo real.', 'Creative Assembly');

CREATE TABLE users (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE orders (
    id_order INT PRIMARY KEY AUTO_INCREMENT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

CREATE TABLE order_detail (
    id_orderDetail INT PRIMARY KEY AUTO_INCREMENT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_product INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    id_order INT,
    FOREIGN KEY (id_product) REFERENCES products(id_product),
    FOREIGN KEY (id_order) REFERENCES orders(id_order)
);