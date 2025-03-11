import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent {
  pokemonLista: any[] = [];
  seleccionarPokemon: any = null;

  //Valores para función modificarPokemon()
  id= 0;
  nombre= ''
  tipo= ''

  //Instancio al cargar el módulo el servicio que maneja express
  constructor(private pokemonService: PokemonService) {}

  //Ejecuta la función para recibir la petición de la API al iniciar el componente
  ngOnInit() {
    this.cargarPokemonLista();
  }

  cargarPokemonLista() {
    this.pokemonService.getPokemonLista(12, 0).subscribe(
      (data) => {
        this.pokemonLista = data.results;
      },
      (error) => {
        console.error('Error al obtener la lista de Pokémon:', error);
      }
    );
  };


  cargarPokemonDetalles(nombre: string) {
    // Buscar el Pokemon en el array de pokemonLista que ya tenemos
    this.seleccionarPokemon = this.pokemonLista.find(pokemon => pokemon.nombre.toLowerCase() === nombre.toLowerCase());
  }

  modificarPokemon(): void {
    this.pokemonService.putPokemon(this.id, this.nombre, this.tipo).subscribe(
      (response)=>{
        console.log('Pokemon modificado: ', response);

        //Si éxito al modificar, volvemos a mandar petición para monstrar los nuevos datos
        this.pokemonService.getPokemonLista(10, 0).subscribe(
          (data) => {
            this.pokemonLista = data.results;
          },
          (error) => {
            console.error('Error al obtener la lista de Pokémon:', error);
          }
        );
      },
      (error)=>{
        console.log('Error al modificar el Pokemon: ', error);
      }
    );

  }

}
