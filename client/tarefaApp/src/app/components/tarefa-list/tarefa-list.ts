import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TarefaItemComponent } from "../tarefa-item/tarefa-item";

/**
 * Componente TarefaListComponent
 * 
 * Responsável por renderizar a lista de tarefas.
 * Este é um componente container que gerencia a apresentação de múltiplos
 * TarefaItemComponent. Ele recebe os dados do componente pai (AppComponent)
 * e transmite os eventos dos itens filhos de volta para o pai.
 * 
 * Inputs:
 *  - tarefas: array de tarefas a serem exibidas
 *  - editando: objeto da tarefa que está sendo editada ou null
 * 
 * Outputs:
 *  - editar: emitido quando um item quer ser editado
 *  - salvar: emitido quando um item quer salvar alterações
 *  - cancelar: emitido quando um item cancela a edição
 *  - deletar: emitido quando um item quer ser deletado
 */
@Component({
  selector: "app-tarefa-list",
  standalone: true,
  imports: [CommonModule, TarefaItemComponent],
  templateUrl: "./tarefa-list.html",
  styleUrl: "./tarefa-list.less",
})
export class TarefaListComponent {
  // Recebe a lista de tarefas do componente pai
  @Input() tarefas: any[] = [];
  // Recebe qual tarefa está sendo editada
  @Input() editando: any = null;
  // Emite quando um item quer ser editado
  @Output() editar = new EventEmitter<any>();
  // Emite quando um item quer salvar alterações
  @Output() salvar = new EventEmitter<any>();
  // Emite quando um item cancela a edição
  @Output() cancelar = new EventEmitter<void>();
  // Emite quando um item quer ser deletado
  @Output() deletar = new EventEmitter<number>();

  // Handler que passa para o pai o item a ser editado
  onEditar(tarefa: any) {
    this.editar.emit(tarefa);
  }

  // Handler que passa para o pai o item editado para ser salvo
  onSalvar(editando: any) {
    this.salvar.emit(editando);
  }

  // Handler que passa para o pai o cancelamento da edição
  onCancelar() {
    this.cancelar.emit();
  }

  // Handler que passa para o pai o id do item a ser deletado
  onDeletar(id: number) {
    this.deletar.emit(id);
  }
}
