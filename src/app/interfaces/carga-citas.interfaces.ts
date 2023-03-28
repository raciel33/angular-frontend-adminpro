import { Usuario } from '../models/usuario.model';
import { Citas } from '../models/citas.model';



export interface CargaCita{
  total:number,
  usuarios:Usuario[],
  citas:Citas[]
}
