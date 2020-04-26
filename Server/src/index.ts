import { bcrypt } from 'bcrypt';

// import {app} from "./server/express";




import "reflect-metadata";
import * as bc from 'bcrypt';
import * as express from "express";
import {Request, Response} from "express";
import * as bodyParser from  "body-parser";
import {createConnection} from "typeorm";
import {getRepository} from "typeorm";
import {User} from "./entity/User";
import db from "./server/dbMethods";
import config from "./server/config";
import * as jwt from "jsonwebtoken";

createConnection().then(connection => {
  const userRepository = connection.getRepository(User);
  const app = express();
  const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  }
    
  app.use(allowCrossDomain)
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json());
  
  app.get("/users", async function(req: Request, res: Response) {
    const users = await userRepository.find();
    res.json(users);
  });

  app.post("/users", async function(req: Request, res: Response) {
    try {
      const results = await userRepository.find({ where: { email: req.body.email } });
      if (!results.length) {
        const user = await userRepository.create(req.body);
        await userRepository.save(user);
        res.send('Registration complete')
        console.log('Registration complete')
      } else {
        res.send('Registration fail, user already exist')
        console.log('Registration fail, user already exist')
      }
    } catch (error) {
      res.send(error);
      console.log('Registration error')
    }
  });
    // register routes

    // app.get("/users", async function(req: Request, res: Response) {
    //     const users = await userRepository.find();
    //     res.json(users);
    // });

    // app.get("/users/:id", async function(req: Request, res: Response) {
    //     const results = await userRepository.findOne(req.params.id);
    //     return res.send(results);
    // });

    // app.post('/register', function(req: Request, res: Response) {
    //   console.log(req.body)
      
      
    //   // const user = await userRepository.findOne(1);
    //   // user.name = "Umed";
    //   // await userRepository.save(user);

    //   db.createUser(userRepository, req.body)

    //   // if (true) {
    //   //   // console.log(userRepository.find({ where: { email: req.body.email } }))
    //   //   res.send({user: 'empty'})
    //   // } else {
    //   //   res.send({user: 'has'})
    //   // }
    // });

    app.post('/register', async function(req: Request, res: Response){
      try {
        const results = await userRepository.find({ where: { email: req.body.email } });
        if (!results.length) {
          const data = req.body;
          data.password = bc.hashSync(req.body.password, 8);
          const user = await userRepository.create(data);
          await userRepository.save(user);

          const token = jwt.sign(
            { id: data.id }, 
            config.secret, 
            { expiresIn: '1h' }
          ); 

          res.status(200).send({ 
            auth: true, 
            token: token, 
            user: user 
          });

          console.log('Registration complete')
        } else {
          res.status(500).send('Registration fail, user already exist')
          console.log('Registration fail, user already exist')
        }
      } catch (error) {
        res.send(error);
        console.log('Registration error')
      } 
    });

    app.post('/login', async function(req: Request, res: Response) {
      try {
        const results = await userRepository.find({ where: { email: req.body.email } });
        if (results.length) {
          let passwordIsValid = bc.compareSync(req.body.password, results[0].password);
          if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

          const token = jwt.sign(
            { id: results[0].id }, 
            config.secret, 
            { expiresIn: '7d' }
          ); 

          res.status(200).send({ 
            auth: true, 
            token: token, 
            user: results[0] 
          });

          console.log('login complete')
        } else {
          res.status(500).send('Login fail, user not found');
          console.log('Login fail, user not found');
        }
      } catch (error) {
        res.send(error);
        console.log('login error');
      }






      // db.selectByEmail(req.body.email, (err, user) => {
      //   if (err) return res.status(500).send('Error on the server.');
        
      //   if (!user) return res.status(404).send('No user found.');
        

        
      //   let token = jwt.sign(
      //     { id: user.id }, 
      //     config.secret, 
      //     { expiresIn: 86400 // expires in 24 hours
      //     });
        
      //   res.status(200).send({
      //     auth: true,
      //     token: token,
      //     user: user
      //   });
      // });
    })

    // app.post("/users", async function(req: Request, res: Response) {
    //     const user = await userRepository.create(req.body);
    //     const results = await userRepository.save(user);
    //     return res.send(results);
    // });

    // app.put("/users/:id", async function(req: Request, res: Response) {
    //     const user = await userRepository.findOne(req.params.id);
    //     userRepository.merge(user, req.body);
    //     const results = await userRepository.save(user);
    //     return res.send(results);
    // });

    // app.delete("/users/:id", async function(req: Request, res: Response) {
    //     const results = await userRepository.delete(req.params.id);
    //     return res.send(results);
    // });

    // start express server
    app.listen(3000, () => {
      console.log("Server started on port 3000!");
    });
})