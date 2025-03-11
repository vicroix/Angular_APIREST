import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'http://localhost:3000/api/pokemons';


  constructor(private http: HttpClient) {}

  // Obtener lista de Pokémon
  getPokemonLista(limit: number = 10, offset: number = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }

  // Obtener detalles de un Pokémon específico
  getPokemonDetalles(nombre: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${nombre}`);
  }

  //Modificar un Pokemon existente
  putPokemon(id: number = 0, nombre: string = '', tipo: string = ''): Observable<any> {
    const body = { id, nombre, tipo }; // Esto es lo que se enviará en el cuerpo de la solicitud.
    return this.http.put(`${this.apiUrl}/${id}`, body); // El id en la URL identifica el recurso específico.
  }

}

