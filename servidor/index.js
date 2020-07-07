import express from 'express';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import cors from 'cors';

const app = express();

const port = process.env.PORT || 5000;

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-lsandoval.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://productos',
  issuer: 'https://dev-lsandoval.us.auth0.com/',
  algorithms: ['RS256']
});

app.use(cors());
app.use(jwtCheck);

const productos = 
    [
        {
            "id" : 0,
            "nombre" : "HTML5",
            "precio" : 25,
            "imagen" : "camisa_1",
            "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
        },
        {
            "id" : 1,
            "nombre" : "CSS3",
            "precio" : 25,
            "imagen" : "camisa_2",
            "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
        },
        {
            "id" : 2,
            "nombre" : "NodeJS",
            "precio" : 30,
            "imagen" : "camisa_3",
            "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
        },
        {
            "id" : 3,
            "nombre" : "JavaScript",
            "precio" : 25,
            "imagen" : "camisa_4",
            "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
        },
        {
            "id" : 4,
            "nombre" : "Angular",
            "precio" : 20,
            "imagen" : "camisa_5",
            "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
        },
        {
            "id" : 5,
            "nombre" : "Github",
            "precio" : 20,
            "imagen" : "camisa_6",
            "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
        },
        {
            "id" : 6,
            "nombre" : "WordPress",
            "precio" : 25,
            "imagen" : "camisa_7",
            "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
        },
        {
            "id" : 7,
            "nombre" : "React",
            "precio" : 20,
            "imagen" : "camisa_8",
            "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
        }
    ];

app.get('/productos', (req, res) => {
    res.json(productos);
});

app.get('/producto/:idProducto', (req, res) => {
    let idProducto = Number.parseInt(req.params.idProducto);
    let productosFilter = [...productos];
    let resultado = productosFilter.filter(producto => Number.parseInt(producto.id) === idProducto);
    res.json(resultado);
});

app.listen(port, () =>{
    console.log('Servidor funcionando');
});