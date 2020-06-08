import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { Usuario } from "../classes/usuario";
import { UsuarioLista } from "../classes/usuario-lista";


export const usuariosConectados = new UsuarioLista();


export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
   
}

export const desconectar = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('disconnect', ( ) => {
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista())
    })
}

export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (   payload: {de: string, cuerpo: string}  ) => {
        console.log('Mensaje recibido', payload)

        io.emit('mensaje-nuevo', payload);
    })
}

export const login = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function) => {
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', usuariosConectados.getLista())
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado ez`
        })
       // io.emit('usuario-configurado', payload )
    })
}
 

export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista())
    })

}