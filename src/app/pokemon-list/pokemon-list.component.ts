import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent {
  pokemonLista: any[] = [];
  seleccionarPokemon: any = null;

  id= 1;
  name= 'Pikachu'
  type= 'Electrico'

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.cargarPokemonLista();
  }

  cargarPokemonLista() {
    this.pokemonService.getPokemonLista(10, 0).subscribe(
      (data) => {
        this.pokemonLista = data.results;
      },
      (error) => {
        console.error('Error al obtener la lista de Pokémon:', error);
      }
    );
  };


  cargarPokemonDetalles(name: string) {
    // Buscar el Pokémon en el array de pokemonLista que ya tenemos
    this.seleccionarPokemon = this.pokemonLista.find(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
    console.log('Pokemon seleccionado:', this.seleccionarPokemon);
  }

  modificarPokemon(): void {
    this.pokemonService.putPokemon(this.id, this.name, this.type);
  }

}
