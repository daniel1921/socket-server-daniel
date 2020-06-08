import {Router, Request, Response} from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/socket';


 const router = Router();

router.get('/mensajes', (req: Request, res: Response)=> {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const server = Server.instance;
    const payload = {cuerpo, de}
    server.io.emit('mensaje-nuevo', payload)


    res.json({
        ok: true,
        mensaje: 'Todo ok'
    });
});

router.post('/mensajes/:id', (req: Request, res: Response)=> {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo
    }
    const server = Server.instance;
    server.io.in(id).emit('mensaje-privado', payload)
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});


router.get('/mensajes/:id', (req: Request, res: Response)=> {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo
    }
    const server = Server.instance;
    server.io.in(id).emit('mensaje-privado', payload)
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});




router.get('/usuarios', (req: Request, res: Response)=> {
    const server = Server.instance;
    server.io.clients((err: any, clientes: string[]) => {
        if(err) {
            res.json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            clientes
        })
    })

});



router.get('/usuarios/detalle', (req: Request, res: Response)=> {

    

        res.json({
            ok: true,
            clientes: usuariosConectados.getLista()
        })


});




export default router;